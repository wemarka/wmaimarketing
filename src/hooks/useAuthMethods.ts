
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ProfileData } from '@/types/profile';
import { useNavigate } from 'react-router-dom';

// Hook منفصل للعمليات المتعلقة بالمصادقة
export const useAuthMethods = (
  profile: ProfileData | null,
  setProfile: (profile: ProfileData | null) => void
) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // تحديث بيانات الملف الشخصي
  const refreshProfile = async (userId: string) => {
    if (!userId) return;
    
    try {
      console.log("Refreshing profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error refreshing profile:', error);
        return;
      }
      
      setProfile(data as ProfileData);
      console.log("Profile refreshed successfully:", data);
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  // تسجيل الدخول
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Signing in user:", email);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error: any) {
      const language = profile?.app_metadata?.language || 'en';
      toast({
        title: language === 'ar' ? "فشل تسجيل الدخول" : "Failed to sign in",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      throw error;
    }
  };

  // تسجيل حساب جديد
  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setLoading(true);
    try {
      console.log("Signing up user:", email);
      const { error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName || '',
            last_name: lastName || '',
          },
        },
      });
      
      if (signUpError) throw signUpError;
      
      const language = profile?.app_metadata?.language || 'en';
      toast({
        title: language === 'ar' ? "تم إنشاء الحساب بنجاح" : "Account created successfully",
        description: language === 'ar' ? "تم إرسال رابط التأكيد إلى بريدك الإلكتروني" : "A confirmation link has been sent to your email",
      });
      setLoading(false);
    } catch (error: any) {
      const language = profile?.app_metadata?.language || 'en';
      toast({
        title: language === 'ar' ? "فشل إنشاء الحساب" : "Failed to create account",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      throw error;
    }
  };

  // تسجيل الخروج
  const signOut = async () => {
    setLoading(true);
    try {
      console.log("Signing out user");
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error: any) {
      const language = profile?.app_metadata?.language || 'en';
      toast({
        title: language === 'ar' ? "فشل تسجيل الخروج" : "Failed to sign out",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return {
    authLoading: loading,
    refreshProfile: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) await refreshProfile(user.id);
    },
    signIn,
    signUp,
    signOut,
  };
};
