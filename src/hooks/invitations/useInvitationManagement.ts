
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Invitation } from "@/types/invitation";
import { useCreateActivity } from "@/hooks/useCreateActivity";

export const useInvitationManagement = () => {
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

  return {
    loading,
    invitations,
    fetchInvitations,
    resendInvitation,
    revokeInvitation
  };
};
