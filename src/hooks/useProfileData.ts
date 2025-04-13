
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ProfileData } from "@/types/profile";

export const useProfileData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

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

  const getUserInitials = () => {
    if (!profileData) return user?.email?.substring(0, 1).toUpperCase() || "U";
    const firstName = profileData.first_name || "";
    const lastName = profileData.last_name || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || user?.email?.substring(0, 1).toUpperCase() || "U";
  };

  return {
    profileData,
    loading,
    getUserInitials,
    createProfile,
    setProfileData
  };
};
