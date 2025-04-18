
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserCheck, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AppRole } from '@/types/profile';

interface ActivateAdminButtonProps {
  className?: string;
}

const ActivateAdminButton: React.FC<ActivateAdminButtonProps> = ({ className }) => {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const activateAdminUser = async () => {
    setLoading(true);
    try {
      // If this is the current user, use their ID
      const userId = user?.id;
      
      if (userId) {
        console.log("Activating admin for user:", userId);
        
        // Update role to admin with direct SQL execution for more logging
        const { error, data } = await supabase
          .from('profiles')
          .update({ role: 'admin' as AppRole }) // Cast to AppRole type
          .eq('id', userId)
          .select();
          
        if (error) {
          console.error("Error updating role:", error);
          throw error;
        }
        
        console.log("Admin role updated successfully:", data);
        
        // Log this action
        await supabase.from("user_activity_log").insert({
          user_id: userId,
          activity_type: "admin_activation",
          description: `تم تفعيل المستخدم كمدير للتطوير`
        });
        
        // Refresh the profile to get updated role
        await refreshProfile();
        
        // Force refresh the page to update navigation items
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
        toast({
          title: "تم التفعيل بنجاح",
          description: "تم تفعيل الحساب كمدير بنجاح. سيتم تحديث الصفحة تلقائيًا.",
        });
      } else {
        toast({
          title: "غير مسموح",
          description: "يجب تسجيل الدخول أولاً",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("خطأ في تفعيل الحساب كمدير:", error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من تفعيل الحساب كمدير، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={activateAdminUser} 
      className={className || "w-full"} 
      variant="outline"
      disabled={loading}
    >
      {loading ? (
        <>
          <UserCheck className="mr-2 h-4 w-4 animate-spin" />
          جاري التفعيل...
        </>
      ) : (
        <>
          <ShieldAlert className="mr-2 h-4 w-4" />
          تفعيل كمدير للتطوير
        </>
      )}
    </Button>
  );
};

export default ActivateAdminButton;
