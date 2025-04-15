
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { InvitationFormData } from "@/types/invitation";
import { useCreateActivity } from "@/hooks/useCreateActivity";
import { nanoid } from 'nanoid';
import { AppRole } from "@/types/profile";

export const useInvitationCreation = (onInvitationCreated: () => Promise<void>) => {
  const [loading, setLoading] = useState(false);
  const { logActivity } = useCreateActivity();

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
      await onInvitationCreated();
      
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

  return {
    loading,
    createInvitation
  };
};
