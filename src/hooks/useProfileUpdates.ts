
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ProfileData, ProfileFormValues } from "@/types/profile";

export const useProfileUpdates = (profileData: ProfileData | null) => {
  const { user } = useAuth();
  const [updating, setUpdating] = useState(false);

  // Update profile handler
  const onUpdateProfile = async (data: ProfileFormValues) => {
    if (!user) return;

    setUpdating(true);
    try {
      console.log("Updating profile with data:", data);
      
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "تم التحديث",
        description: "تم تحديث الملف الشخصي بنجاح",
      });

      // We don't update local state here, as that would cause a re-render
      // Profile data is refreshed on next page visit
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الملف الشخصي",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  // Update avatar URL
  const updateAvatarUrl = async (url: string) => {
    if (!user) return;
    
    try {      
      const { error } = await supabase
        .from("profiles")
        .update({
          avatar_url: url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      
      if (error) throw error;
      
      console.log("Avatar URL updated successfully");
    } catch (error) {
      console.error("Error updating avatar URL:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الصورة الشخصية",
        variant: "destructive",
      });
    }
  };

  return {
    updating,
    onUpdateProfile,
    updateAvatarUrl
  };
};
