
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
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching profile for user:", user.id);
        
        // Get profile using select
        const { data: profile, error: selectError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (selectError) {
          console.error("Error fetching profile:", selectError);
          
          // If profile doesn't exist, create it
          if (selectError.code === 'PGRST116') {
            console.log("Profile not found, attempting to create one");
            await createProfile();
            return;
          }
          
          throw selectError;
        }

        console.log("Fetched profile:", profile);
        setProfileData(profile as ProfileData);
      } catch (error) {
        console.error("Error in profile operation:", error);
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

  // Create profile function
  const createProfile = async () => {
    if (!user) return null;
    
    try {
      const newProfile = {
        id: user.id,
        first_name: "",
        last_name: "",
        avatar_url: null,
        role: "user",
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      };
      
      console.log("Creating new profile:", newProfile);
      
      const { data, error } = await supabase
        .from("profiles")
        .insert(newProfile)
        .select()
        .single();
        
      if (error) {
        console.error("Error creating profile:", error);
        throw error;
      }
      
      console.log("Created profile:", data);
      setProfileData(data as ProfileData);
      return data;
    } catch (error) {
      console.error("Error creating profile:", error);
      // Even on error, try one more time to fetch profile in case it was created by trigger
      try {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (data) {
          console.log("Found profile on retry:", data);
          setProfileData(data as ProfileData);
          return data;
        }
      } catch (retryError) {
        console.error("Error on retry fetch:", retryError);
      }
      return null;
    }
  };

  // Update profile handler
  const onUpdateProfile = async (data: ProfileFormValues) => {
    if (!user) return;

    setUpdating(true);
    try {
      // If no profile exists yet, create one first
      if (!profileData) {
        await createProfile();
      }
      
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
    if (!user) return;
    
    try {
      // If no profile exists yet, create one first
      if (!profileData) {
        await createProfile();
      }
      
      const { error } = await supabase
        .from("profiles")
        .update({
          avatar_url: url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      
      if (error) throw error;
      
      setProfileData(prev => prev ? {
        ...prev,
        avatar_url: url,
      } : null);
      
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

  const getUserInitials = () => {
    if (!profileData) return user?.email?.substring(0, 1).toUpperCase() || "U";
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
    getUserInitials,
    createProfile
  };
};
