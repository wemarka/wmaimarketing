import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Notification, NotificationType } from "@/types/notifications";

/**
 * الاشتراك في إشعارات قاعدة البيانات في الوقت الحقيقي
 * @param userId معرف المستخدم
 * @param onNotification دالة تُستدعى عند استلام إشعار جديد
 */
export const subscribeToNotifications = (
  userId: string,
  onNotification: (notification: Notification) => void
) => {
  // الاشتراك في تغييرات الجدول
  const postsChannel = supabase
    .channel('posts-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'posts',
        filter: `user_id=eq.${userId}`
      },
      (payload: any) => {
        const newPost = payload.new;
        const notification: Notification = {
          id: `post-${newPost.id}`,
          title: 'تمت إضافة منشور جديد',
          message: `تم إضافة منشور جديد: ${newPost.title}`,
          time: new Date().toISOString(),
          type: 'post' as NotificationType,
          read: false,
          actionUrl: '/scheduler'
        };
        onNotification(notification);
        
        // عرض إشعار Toast
        toast({
          title: notification.title,
          description: notification.message
        });
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'posts',
        filter: `user_id=eq.${userId} AND status=eq.published`
      },
      (payload: any) => {
        const updatedPost = payload.new;
        if (updatedPost.status === 'published' && payload.old.status !== 'published') {
          const notification: Notification = {
            id: `published-${updatedPost.id}`,
            title: 'تم نشر المحتوى بنجاح',
            message: `تم نشر المحتوى: ${updatedPost.title}`,
            time: new Date().toISOString(),
            type: 'post' as NotificationType,
            read: false,
            urgent: true,
            actionUrl: '/analytics'
          };
          onNotification(notification);
          
          toast({
            title: notification.title,
            description: notification.message,
            variant: 'default'
          });
        }
      }
    )
    .subscribe();
    
  // الاشتراك في إشعارات سير العمل
  const workflowChannel = supabase
    .channel('workflow-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'posts',
        filter: `user_id=eq.${userId} AND status=eq.pending`
      },
      (payload: any) => {
        const pendingPost = payload.new;
        const notification: Notification = {
          id: `pending-${pendingPost.id}`,
          title: 'منشور بانتظار الموافقة',
          message: `المنشور "${pendingPost.title}" ينتظر الموافقة`,
          time: new Date().toISOString(),
          type: 'approval' as NotificationType,
          read: false,
          urgent: true,
          actionUrl: '/scheduler?tab=workflow',
          actionText: 'مراجعة الآن'
        };
        onNotification(notification);
        
        toast({
          title: notification.title,
          description: notification.message,
          variant: 'warning'
        });
      }
    )
    .subscribe();
    
  // الاشتراك في تحديثات الحسابات الاجتماعية
  const accountsChannel = supabase
    .channel('accounts-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // جميع ��لأحداث (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'social_accounts',
        filter: `user_id=eq.${userId}`
      },
      (payload: any) => {
        const account = payload.new || payload.old;
        const isNew = payload.eventType === 'INSERT';
        const isDeleted = payload.eventType === 'DELETE';
        
        let notificationTitle = '';
        let notificationMessage = '';
        
        if (isNew) {
          notificationTitle = 'تم ربط حساب جديد';
          notificationMessage = `تم ربط حساب ${account.platform} بنجاح: ${account.account_name}`;
        } else if (isDeleted) {
          notificationTitle = 'تم فصل الحساب';
          notificationMessage = `تم فصل حساب ${account.platform}: ${account.account_name}`;
        } else { // UPDATE
          notificationTitle = 'تم تحديث الحساب';
          notificationMessage = `تم تحديث معلومات حساب ${account.platform}: ${account.account_name}`;
        }
        
        const notification: Notification = {
          id: `account-${account.id}-${Date.now()}`,
          title: notificationTitle,
          message: notificationMessage,
          time: new Date().toISOString(),
          type: 'system' as NotificationType,
          read: false,
          actionUrl: '/social-integration'
        };
        
        onNotification(notification);
        
        toast({
          title: notification.title,
          description: notification.message
        });
      }
    )
    .subscribe();
  
  // الاشتراك في تحديثات التحليلات
  const analyticsChannel = supabase
    .channel('analytics-updates')
    .on(
      'broadcast',
      { event: 'analytics-report-ready' },
      (payload) => {
        const notification: Notification = {
          id: `analytics-${Date.now()}`,
          title: 'تقرير تحليلي جديد',
          message: 'تم إنشاء تقرير تحليلي جديد لأداء المحتوى الخاص بك',
          time: new Date().toISOString(),
          type: 'system' as NotificationType,
          read: false,
          actionUrl: '/analytics',
          actionText: 'عرض التقرير'
        };
        
        onNotification(notification);
        
        toast({
          title: notification.title,
          description: notification.message
        });
      }
    )
    .subscribe();
    
  // إرجاع دالة إلغاء الاشتراك
  return () => {
    supabase.removeChannel(postsChannel);
    supabase.removeChannel(workflowChannel);
    supabase.removeChannel(accountsChannel);
    supabase.removeChannel(analyticsChannel);
  };
};

/**
 * وضع علامة "مقروء" على إشعار
 * @param notificationId معرف الإشعار
 * @param read حالة القراءة (true = مقروء)
 */
export const markNotificationAsRead = async (notificationId: string, read: boolean = true) => {
  try {
    // في هذا التنفيذ، نحن نتعامل مع الإشعارات في الذاكرة فقط
    // لا حاجة لتنفيذ استعلام Supabase لأننا لا نملك جدول الإشعارات بعد
    console.log("Marking notification as read (in-memory only):", notificationId);
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
};

/**
 * إرسال إشعار إلى المستخدم
 * @param userId معرف المستخدم
 * @param notification الإشعار
 */
export const sendNotification = async (userId: string, notification: Omit<Notification, 'id' | 'time'>) => {
  try {
    const fullNotification = {
      ...notification,
      id: `manual-${Date.now()}`,
      time: new Date().toISOString()
    };
    
    // في هذا التنفيذ، نحن نتعامل مع الإشعارات في الذاكرة فقط
    // عند إنشاء جدول الإشعارات، سنحتاج إلى تحديث هذا
    console.log("Sending notification (in-memory only):", fullNotification);
    
    return fullNotification.id;
  } catch (error) {
    console.error("Error sending notification:", error);
    return null;
  }
};
