
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export const useCreateActivity = () => {
  const { user } = useAuth();

  const logActivity = async (
    activityType: string,
    description: string
  ) => {
    if (!user) {
      console.warn("Cannot log activity: User not authenticated");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("user_activity_log")
        .insert({
          user_id: user.id,
          activity_type: activityType,
          description: description
        })
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error logging activity:", error);
      return null;
    }
  };

  return { logActivity };
};
