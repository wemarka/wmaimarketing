
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ProfileData } from "@/types/profile";
import { useQueryConfig } from "@/hooks/useQueryConfig";

export const useProfileData = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryConfig = useQueryConfig("userProfile");
  
  // استخدام React Query لجلب بيانات الملف الشخصي
  const { data: profileData, isLoading: loading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async (): Promise<ProfileData | null> => {
      if (!user) return null;
      
      console.log("Fetching profile for user:", user.id);
      
      // الحصول على الملف الشخصي باستخدام select
      const { data: profile, error: selectError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (selectError) {
        console.error("Error fetching profile:", selectError);
        
        // إذا لم يكن الملف الشخصي موجودًا، قم بإنشائه
        if (selectError.code === 'PGRST116') {
          console.log("Profile not found, attempting to create one");
          const newProfile = await createProfileFn();
          return newProfile;
        }
        
        throw selectError;
      }

      console.log("Fetched profile:", profile);
      return profile as ProfileData;
    },
    ...queryConfig,
    enabled: !!user, // تمكين الاستعلام فقط إذا كان المستخدم متاحًا
    meta: {
      onError: (error: any) => {
        console.error("Error in profile operation:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء جلب بيانات الملف الشخصي",
          variant: "destructive",
        });
      }
    }
  });

  // إنشاء دالة لإنشاء الملف الشخصي
  const createProfileFn = async (): Promise<ProfileData | null> => {
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
      return data as ProfileData;
    } catch (error) {
      console.error("Error creating profile:", error);
      // حتى في حالة حدوث خطأ، حاول مرة أخرى لجلب الملف الشخصي في حالة إنشائه بواسطة المحفز
      try {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (data) {
          console.log("Found profile on retry:", data);
          return data as ProfileData;
        }
      } catch (retryError) {
        console.error("Error on retry fetch:", retryError);
      }
      return null;
    }
  };

  // استخدام React Query Mutation لإنشاء الملف الشخصي
  const createProfileMutation = useMutation({
    mutationFn: createProfileFn,
    onSuccess: (data) => {
      // تحديث التخزين المؤقت بعد إنشاء الملف الشخصي بنجاح
      queryClient.setQueryData(["profile", user?.id], data);
    }
  });

  // الحصول على الأحرف الأولى من اسم المستخدم
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
    createProfile: () => createProfileMutation.mutate(),
    setProfileData: (data: ProfileData) => {
      queryClient.setQueryData(["profile", user?.id], data);
    }
  };
};
