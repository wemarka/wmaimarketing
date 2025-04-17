
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { useNotificationsStore } from "@/stores/notificationsStore";
import { 
  NotificationHeader, 
  NotificationActions,
  NotificationContent
} from "@/components/notification-center";

const NotificationCenter = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // استخدام متجر الإشعارات
  const { 
    notifications, 
    unreadCount,
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    clearAllNotifications
  } = useNotificationsStore();

  // عد الإشعارات غير المقروءة حسب النوع
  const getUnreadCount = (type?: string) => {
    if (!type || type === "all") {
      return unreadCount;
    }
    return notifications.filter(n => !n.read && n.type === type).length;
  };
  
  // وضع علامة "مقروء" على إشعار
  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    
    // عرض toast للإشعار المقروء حديثًا
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      toast({
        title: t("dashboard.notifications.markedAsRead", "Notification marked as read"),
        description: notification.title
      });
    }
  };
  
  // وضع علامة "مقروء" على جميع الإشعارات
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    
    toast({
      title: t("dashboard.notifications.markAllReadSuccess", "All notifications marked as read"),
      description: t("dashboard.notifications.updated", "Notifications have been updated")
    });
  };

  // حذف إشعار
  const handleDeleteNotification = (id: string) => {
    deleteNotification(id);
    
    toast({
      title: t("dashboard.notifications.deleted", "Notification deleted"),
      description: t("dashboard.notifications.deleteSuccess", "The notification has been removed")
    });
  };

  // حذف جميع الإشعارات
  const handleDeleteAllNotifications = () => {
    clearAllNotifications();
    
    toast({
      title: t("dashboard.notifications.deletedAll", "All notifications deleted"),
      description: t("dashboard.notifications.deleteAllSuccess", "All notifications have been removed")
    });
  };

  // معالجة تغيير التبويب
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Layout>
      <Helmet>
        <title>{t("notificationCenter.pageTitle", "Notification Center")} - سيركل</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <NotificationHeader 
              unreadCount={unreadCount} 
              title={t("notificationCenter.title", "Notification Center")} 
            />
            
            <NotificationActions 
              onMarkAllAsRead={handleMarkAllAsRead}
              onDeleteAllNotifications={handleDeleteAllNotifications}
              unreadCount={unreadCount}
              notificationsCount={notifications.length}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NotificationContent 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            notifications={notifications}
            getUnreadCount={getUnreadCount}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDeleteNotification}
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotificationCenter;
