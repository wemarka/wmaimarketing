
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export const useActivityLog = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const logActivity = async (type: string, description: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_activity_log')
        .insert({
          user_id: user.id,
          activity_type: type,
          description: description
        });

      if (error) throw error;
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_activity_log')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) throw error;

        setActivities(data.map(item => ({
          id: item.id,
          type: item.activity_type,
          description: item.description,
          timestamp: item.created_at
        })));
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  return { activities, loading, logActivity };
};
