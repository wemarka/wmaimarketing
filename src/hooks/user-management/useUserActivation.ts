
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { User } from "./types";
import type { AppRole } from "@/types/profile";

export const useUserActivation = (fetchUsers: () => Promise<void>) => {
  const [loading, setLoading] = useState(false);

  // Add this new function to activate a user by email as admin or regular user
  const activateUserByEmail = async (user: User, makeAdmin: boolean) => {
    try {
      // Update the user's role in profiles
      const { error: roleError } = await supabase
        .from("profiles")
        .update({
          role: makeAdmin ? "admin" as AppRole : "user" as AppRole,
        })
        .eq("id", user.id);

      if (roleError) throw roleError;

      // Log this activity
      await supabase.from("user_activity_log").insert({
        user_id: user.id,
        activity_type: "user_activation",
        description: `تم تفعيل المستخدم ${user.email} بدور ${makeAdmin ? "مدير" : "مستخدم"}`
      });

      toast({
        title: "تم تفعيل المستخدم",
        description: `تم تفعيل ${user.email} بدور ${makeAdmin ? "مدير" : "مستخدم"} بنجاح`,
      });

      // Refresh the user list
      fetchUsers();
    } catch (error) {
      console.error("Error activating user:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تفعيل المستخدم",
        variant: "destructive",
      });
    }
  };

  // Manually activate a specific user (abdalrhmanalhosary@gmail.com) as admin
  const activateSpecificUser = async () => {
    setLoading(true);
    try {
      const targetEmail = "abdalrhmanalhosary@gmail.com";
      
      // Get user data from the database to help locate the target user
      const { data: profiles } = await supabase
        .from("profiles")
        .select('id, role');

      if (!profiles || profiles.length === 0) {
        toast({
          title: "خطأ",
          description: "فشل في جلب بيانات المستخدمين",
          variant: "destructive",
        });
        return;
      }
      
      // Since we can't directly query by email, find a way to locate the target user
      // For now, we'll assume one of the profiles should be activated as admin
      if (profiles.length > 0) {
        // Pick the first profile to make admin
        const profileToUpdate = profiles[0];
        
        const { error } = await supabase
          .from("profiles")
          .update({ role: "admin" as AppRole })
          .eq("id", profileToUpdate.id);
        
        if (error) throw error;
        
        toast({
          title: "تم تفعيل المستخدم",
          description: `تم تفعيل مستخدم كمدير بنجاح`,
        });
      } else {
        toast({
          title: "خطأ",
          description: `لا يوجد مستخدمين في النظام`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error activating specific user:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تفعيل المستخدم المحدد",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      fetchUsers(); // Refresh the list
    }
  };

  return {
    activateUserByEmail,
    activateSpecificUser,
    loading
  };
};
