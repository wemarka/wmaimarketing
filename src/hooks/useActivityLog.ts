
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

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("user_activity_log")
          .select("id, activity_type, description, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;

        // Map to Activity interface
        const mappedActivities: Activity[] = data.map((item) => ({
          id: item.id,
          type: item.activity_type,
          description: item.description,
          timestamp: item.created_at,
        }));

        setActivities(mappedActivities);
      } catch (error) {
        console.error("Error fetching activity log:", error);
        // Use default activities if error occurs (they will be handled in the component)
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  return {
    activities,
    loading,
  };
};
