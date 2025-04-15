
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ProfileData, AppRole } from "@/types/profile";
import { useQueryConfig } from "@/hooks/useQueryConfig";

export const useProfileData = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryConfig = useQueryConfig("userProfile");
  
  // تحسين الأداء: زيادة وقت التخزين المؤقت وتقليل عمليات إعادة التحميل
  const staleTime = 5 * 60 * 1000; // 5 دقائق
  const gcTime = 30 * 60 * 1000; // 30 دقيقة
  
  // استخدام React Query لجلب بيانات الملف الشخصي بأداء محسن
  const { data: profileData, isLoading: loading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async (): Promise<ProfileData | null> => {
      if (!user) return null;
      
      try {
        // الحصول على الملف الشخصي باستخدام select
        const { data: profile, error: selectError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
  
        if (selectError) {
          // إذا لم يكن الملف الشخصي موجودًا، قم بإنشائه
          if (selectError.code === 'PGRST116') {
            const newProfile = await createProfileFn();
            return newProfile;
          }
          
          throw selectError;
        }
  
        return profile as ProfileData;
      } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
    },
    ...queryConfig,
    enabled: !!user, // تمكين الاستعلام فقط إذا كان المستخدم متاحًا
    staleTime: staleTime, // تقليل عدد مرات إعادة التحميل
    gcTime: gcTime, // زيادة وقت التخزين المؤقت
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
        role: "user" as AppRole,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from("profiles")
        .insert(newProfile)
        .select()
        .single();
        
      if (error) throw error;
      
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
          return data as ProfileData;
        }
      } catch (retryError) {
        console.error("Error on retry fetch:", retryError);
      }
      return null;
    }
  };

  // تحسين استخدام React Query Mutation للأداء الأفضل
  const createProfileMutation = useMutation({
    mutationFn: createProfileFn,
    onSuccess: (data) => {
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
