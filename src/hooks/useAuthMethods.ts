
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ProfileData, AppRole } from '@/types/profile';

export const useAuthMethods = (profile: ProfileData | null, setProfile: (profile: ProfileData | null) => void) => {
  const [authLoading, setAuthLoading] = useState(false);

  // تسجيل الدخول
  const signIn = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // إنشاء حساب جديد
  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      setAuthLoading(true);
      
      // إنشاء المستخدم في Auth
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      if (error) throw error;
      
      // نجاح تسجيل المستخدم
      console.log("User signed up successfully:", data?.user?.id);
      
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // تسجيل الخروج
  const signOut = async () => {
    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // تحديث البيانات الشخصية
  const refreshProfile = async (): Promise<void> => {
    try {
      setAuthLoading(true);
      
      // الحصول على المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log("No user found during profile refresh");
        setProfile(null);
        return;
      }
      
      console.log("Refreshing profile for user:", user.id);
      
      // جلب البيانات الشخصية المحدثة
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error refreshing profile:', error);
        throw error;
      }
      
      console.log("Profile refreshed successfully:", data);
      setProfile(data);
      
      // Changed to explicitly return void by removing the return statement
    } catch (error: any) {
      console.error('Error refreshing profile:', error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  return {
    authLoading,
    signIn,
    signUp,
    signOut,
    refreshProfile
  };
};
