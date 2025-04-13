
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Activity {
  id: string;
  type: "login" | "logout" | "profile_update" | "password_change" | "role_change" | "content_create" | "content_edit";
  description: string;
  timestamp: string;
}

export const useActivityLog = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch real activity logs from Supabase
        const { data, error } = await supabase
          .from("user_activity_log")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;

        const formattedActivities: Activity[] = data ? data.map((item: any) => ({
          id: item.id,
          type: item.activity_type as Activity["type"],
          description: item.description,
          timestamp: item.created_at,
        })) : [];

        setActivities(formattedActivities);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء جلب سجل النشاط",
          variant: "destructive",
        });
        // Set empty activities to prevent UI issues
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  const logActivity = async (
    type: Activity["type"], 
    description: string
  ) => {
    if (!user) return;

    try {
      // Create new activity entry in Supabase
      const { data, error } = await supabase
        .from("user_activity_log")
        .insert({
          user_id: user.id,
          activity_type: type,
          description: description,
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state with the new activity
      const newActivity: Activity = {
        id: data.id,
        type: data.activity_type as Activity["type"],
        description: data.description,
        timestamp: data.created_at,
      };

      setActivities([newActivity, ...activities]);
      
      return newActivity;
    } catch (error) {
      console.error("Error logging activity:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل النشاط",
        variant: "destructive",
      });
    }
  };

  return {
    activities,
    loading,
    logActivity,
  };
};
