
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Interface for validation result
export interface ValidationResult {
  valid: boolean;
  email?: string;
  role?: string;
  message?: string;
}

// Interface for registration result
export interface RegistrationResult {
  success: boolean;
  message?: string;
  email?: string;
  role?: string;
}

export const useInvitationValidation = () => {
  const [loading, setLoading] = useState(false);

  const validateInvitationToken = async (token: string): Promise<ValidationResult> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .rpc('validate_invitation', { invitation_token: token });

      if (error) throw error;
      
      // Make sure to cast to ValidationResult properly
      const result = data as unknown;
      // Validate the structure before returning
      if (typeof result === 'object' && result !== null && 'valid' in result) {
        return result as ValidationResult;
      }
      
      throw new Error("Invalid response format from server");
    } catch (error: any) {
      console.error("Error validating invitation:", error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء التحقق من صلاحية الدعوة",
        variant: "destructive",
      });
      return { valid: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const registerFromInvitation = async (token: string, password: string, firstName: string, lastName: string): Promise<RegistrationResult> => {
    setLoading(true);
    try {
      // أولاً نتحقق من صلاحية الدعوة
      const validationResult = await validateInvitationToken(token);
      
      if (!validationResult.valid) {
        throw new Error(validationResult.message || "الدعوة غير صالحة");
      }
      
      // تأكد من وجود البريد الإلكتروني قبل المتابعة
      if (!validationResult.email) {
        throw new Error("بيانات الدعوة غير مكتملة");
      }
      
      // التسجيل باستخدام الدالة المخصصة
      const { data, error } = await supabase
        .rpc('register_from_invitation', { 
          invitation_token: token,
          new_password: password,
          first_name: firstName,
          last_name: lastName
        });

      if (error) throw error;
      
      // تحويل البيانات المرجعة إلى الصيغة المتوقعة
      const result = data as unknown as RegistrationResult;
      
      // إذا تم التسجيل بنجاح، قم بتسجيل الدخول
      if (result.success && validationResult.email) {
        await supabase.auth.signInWithPassword({
          email: validationResult.email,
          password: password
        });
        
        toast({
          title: "تم التسجيل بنجاح",
          description: "تم تسجيل حسابك بنجاح وتسجيل الدخول",
        });
      }
      
      return result;
    } catch (error: any) {
      console.error("Error registering from invitation:", error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء التسجيل",
        variant: "destructive",
      });
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    validateInvitationToken,
    registerFromInvitation
  };
};
