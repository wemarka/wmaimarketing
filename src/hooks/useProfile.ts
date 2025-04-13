
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ProfileData, ProfileFormValues, PasswordFormValues } from "@/types/profile";

export const useProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [updating, setUpdating] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // Fetch profile data
  useEffect(() => {
    const getProfile = async () => {
      if (!user) return;

      try {
        // Get profile data
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          // If the error is that no rows were returned, create a profile
          if (error.code === "PGRST116") {
            // Create a new profile
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert({
                id: user.id,
                first_name: "",
                last_name: "",
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
              })
              .select("*")
              .single();

            if (createError) {
              throw createError;
            }

            if (newProfile) {
              setProfileData(newProfile as ProfileData);
              console.log("Created new profile:", newProfile);
            }
          } else {
            throw error;
          }
        } else if (profile) {
          setProfileData(profile as ProfileData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء جلب بيانات الملف الشخصي",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user]);

  // Update profile handler
  const onUpdateProfile = async (data: ProfileFormValues) => {
    if (!user) return;

    setUpdating(true);
    try {
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

      // Update local state
      if (profileData) {
        setProfileData({
          ...profileData,
          first_name: data.first_name,
          last_name: data.last_name,
        });
      }
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

  // Change password handler
  const onChangePassword = async (data: PasswordFormValues) => {
    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;

      toast({
        title: "تم تغيير كلمة المرور",
        description: "تم تغيير كلمة المرور بنجاح",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تغيير كلمة المرور",
        variant: "destructive",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  // Update avatar URL
  const updateAvatarUrl = async (url: string) => {
    if (!profileData || !user) return;
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          avatar_url: url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      
      if (error) throw error;
      
      setProfileData({
        ...profileData,
        avatar_url: url,
      });
    } catch (error) {
      console.error("Error updating avatar URL:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الصورة الشخصية",
        variant: "destructive",
      });
    }
  };

  const getUserInitials = () => {
    if (!profileData) return "U";
    const firstName = profileData.first_name || "";
    const lastName = profileData.last_name || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || user?.email?.substring(0, 1).toUpperCase() || "U";
  };

  return {
    profileData,
    loading,
    updating,
    changingPassword,
    onUpdateProfile,
    onChangePassword,
    updateAvatarUrl,
    getUserInitials
  };
};
