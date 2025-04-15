
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { PasswordFormValues } from "@/types/profile";
import { toast } from "@/hooks/use-toast";

export const usePasswordManagement = () => {
  const { supabase } = useAuth();
  const [changingPassword, setChangingPassword] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  
  const changePassword = async (data: PasswordFormValues) => {
    setChangingPassword(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.new_password
      });
      
      if (error) throw error;
      
      toast({
        title: "تم تغيير كلمة المرور",
        description: "تم تغيير كلمة المرور بنجاح",
        variant: "success",
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
      const { error } = await supabase.auth.refreshSession({
        refreshOptions: {
          onlyCurrentSession: true,
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج من الجلسات الأخرى بنجاح",
        variant: "success",
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
