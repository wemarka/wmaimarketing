
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Invitation, InvitationFormData } from "@/types/invitation";
import { useCreateActivity } from "@/hooks/useCreateActivity";
import { nanoid } from 'nanoid';
import { AppRole } from "@/types/profile";

export const useInvitations = () => {
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const { logActivity } = useCreateActivity();

  const fetchInvitations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvitations(data as Invitation[]);
    } catch (error: any) {
      console.error("Error fetching invitations:", error);
      toast({
        title: "خطأ",
        description: "فشل في جلب قائمة الدعوات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createInvitation = async (invitationData: InvitationFormData) => {
    setLoading(true);
    try {
      // إنشاء رمز فريد للدعوة
      const token = nanoid(32);
      
      // حساب تاريخ انتهاء صلاحية الدعوة
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + invitationData.expiresInDays);
      
      // الحصول على معلومات المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      
      const newInvitation = {
        email: invitationData.email,
        role: invitationData.role as AppRole, // تحديد النوع بوضوح
        invited_by: user?.id,
        token: token,
        expires_at: expiresAt.toISOString(),
        status: 'pending'
      };

      // تصحيح طريقة إدراج البيانات (استخدام كائن واحد وليس مصفوفة)
      const { data, error } = await supabase
        .from('user_invitations')
        .insert(newInvitation)
        .select()
        .single();

      if (error) throw error;
      
      // تسجيل النشاط
      await logActivity('invitation_created', `تم إنشاء دعوة جديدة للبريد ${invitationData.email} بدور ${invitationData.role}`);
      
      // إعادة تحميل الدعوات
      await fetchInvitations();
      
      toast({
        title: "تم إنشاء الدعوة بنجاح",
        description: `تم إنشاء دعوة للبريد ${invitationData.email}`,
      });

      return data;
    } catch (error: any) {
      console.error("Error creating invitation:", error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إنشاء الدعوة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resendInvitation = async (invitationId: string) => {
    setLoading(true);
    try {
      // تحديث تاريخ انتهاء الصلاحية
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // تجديد لمدة 7 أيام
      
      const { error } = await supabase
        .from('user_invitations')
        .update({ 
          expires_at: expiresAt.toISOString(),
          status: 'pending'
        })
        .eq('id', invitationId);

      if (error) throw error;
      
      // تسجيل النشاط
      await logActivity('invitation_resent', `تم إعادة إرسال دعوة`);
      
      // إعادة تحميل الدعوات
      await fetchInvitations();
      
      toast({
        title: "تم تجديد الدعوة بنجاح",
        description: "تم تمديد صلاحية الدعوة وإعادة إرسالها",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error resending invitation:", error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إعادة إرسال الدعوة",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const revokeInvitation = async (invitationId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_invitations')
        .update({ status: 'revoked' })
        .eq('id', invitationId);

      if (error) throw error;
      
      // تسجيل النشاط
      await logActivity('invitation_revoked', `تم إلغاء دعوة`);
      
      // إعادة تحميل الدعوات
      await fetchInvitations();
      
      toast({
        title: "تم إلغاء الدعوة بنجاح",
        description: "تم إلغاء الدعوة وإبطال صلاحيتها",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error revoking invitation:", error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إلغاء الدعوة",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // تحديد نوع البيانات الدقيق للتحقق من صلاحية الدعوة
  type ValidationResult = {
    valid: boolean;
    email?: string;
    role?: string;
    message?: string;
  };

  const validateInvitationToken = async (token: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .rpc('validate_invitation', { invitation_token: token });

      if (error) throw error;
      
      return data as ValidationResult;
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

  const registerFromInvitation = async (token: string, password: string, firstName: string, lastName: string) => {
    setLoading(true);
    try {
      // أولاً نتحقق من صلاحية الدعوة
      const validationResult = await validateInvitationToken(token);
      
      if (!validationResult.valid) {
        throw new Error(validationResult.message || "الدعوة غير صالحة");
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
      const result = data as unknown as { success: boolean; message?: string; email?: string; role?: string };
      
      // إذا تم التسجيل بنجاح، قم بتسجيل الدخول
      if (result.success && validationResult.valid && validationResult.email) {
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
    invitations,
    fetchInvitations,
    createInvitation,
    resendInvitation,
    revokeInvitation,
    validateInvitationToken,
    registerFromInvitation
  };
};
