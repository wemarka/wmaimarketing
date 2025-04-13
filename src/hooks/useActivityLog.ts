
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  type: "login" | "logout" | "profile_update" | "password_change" | "role_change";
  description: string;
  timestamp: string;
}

export const useActivityLog = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // In a real application, we would fetch this from the database
        // For now, we'll use mock data
        const mockActivities: Activity[] = [
          {
            id: "1",
            type: "login",
            description: "تم تسجيل الدخول من متصفح Chrome على نظام Windows",
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
          },
          {
            id: "2",
            type: "profile_update",
            description: "تم تحديث معلومات الملف الشخصي",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          },
          {
            id: "3",
            type: "password_change",
            description: "تم تغيير كلمة المرور",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          },
          {
            id: "4",
            type: "login",
            description: "تم تسجيل الدخول من متصفح Safari على نظام iOS",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
          },
          {
            id: "5",
            type: "logout",
            description: "تم تسجيل الخروج",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
          },
        ];

        setActivities(mockActivities);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء جلب سجل النشاط",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  const logActivity = async (type: Activity["type"], description: string) => {
    if (!user) return;

    const newActivity = {
      id: Date.now().toString(),
      type,
      description,
      timestamp: new Date().toISOString(),
    };

    // In a real application, we would save this to the database
    // For now, we'll just update the local state
    setActivities([newActivity, ...activities]);

    // Example of how we would save this to the database in a real app:
    /*
    try {
      const { error } = await supabase
        .from("user_activity_log")
        .insert({
          user_id: user.id,
          activity_type: type,
          description: description,
        });

      if (error) throw error;
    } catch (error) {
      console.error("Error logging activity:", error);
    }
    */
  };

  return {
    activities,
    loading,
    logActivity,
  };
};
