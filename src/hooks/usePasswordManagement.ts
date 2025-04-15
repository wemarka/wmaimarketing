
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { PasswordFormValues } from "@/types/profile";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const usePasswordManagement = () => {
  // Remove dependency on supabase from AuthContext as it doesn't exist there
  const { user } = useAuth();
  const [changingPassword, setChangingPassword] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  
  const changePassword = async (data: PasswordFormValues) => {
    setChangingPassword(true);
    
    try {
      // Use the imported supabase client directly instead
      const { error } = await supabase.auth.updateUser({
        password: data.new_password
      });
      
      if (error) throw error;
      
      toast({
        title: "تم تغيير كلمة المرور",
        description: "تم تغيير كلمة المرور بنجاح",
        variant: "default", // Change from 'success' to 'default'
      });
      
    } catch (error: any) {
      toast({
        title: "خطأ في تغيير كلمة المرور",
        description: error.message || "حدث خطأ أثناء تغيير كلمة المرور",
        variant: "destructive",
      });
    } finally {
      setChangingPassword(false);
    }
  };
  
  const logoutOtherSessions = async () => {
    setLoggingOut(true);
    
    try {
      // Fix: Use signOut with the scope parameter instead of refreshSession with refreshOptions
      const { error } = await supabase.auth.signOut({ 
        scope: 'others' 
      });
      
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج من الجلسات الأخرى بنجاح",
        variant: "default", // Change from 'success' to 'default'
      });
      
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error.message || "حدث خطأ أثناء تسجيل الخروج من الجلسات الأخرى",
        variant: "destructive",
      });
    } finally {
      setLoggingOut(false);
    }
  };
  
  return {
    changingPassword,
    loggingOut,
    changePassword,
    logoutOtherSessions,
  };
};
