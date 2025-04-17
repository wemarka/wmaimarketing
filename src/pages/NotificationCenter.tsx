
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Check, Trash2, Bell, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNotificationsStore } from "@/stores/notificationsStore";

import {
  NotificationTabs,
  NotificationsList
} from "@/components/dashboard/notifications";

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
    deleteAllNotifications
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
    deleteAllNotifications();
    
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
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-beauty-purple" />
              <h1 className="text-2xl font-bold">{t("notificationCenter.title", "Notification Center")}</h1>
              {unreadCount > 0 && (
                <motion.span 
                  className="bg-beauty-pink text-white text-sm px-2 py-0.5 rounded-full"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {unreadCount} {t("notificationCenter.unread", "unread")}
                </motion.span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                <Check className="h-4 w-4" />
                <span>{t("notificationCenter.markAllRead", "Mark all read")}</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-destructive hover:bg-destructive/10"
                onClick={handleDeleteAllNotifications}
                disabled={notifications.length === 0}
              >
                <Trash2 className="h-4 w-4" />
                <span>{t("notificationCenter.clearAll", "Clear all")}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                title={t("notificationCenter.settings", "Notification Settings")}
                onClick={() => {
                  toast({
                    title: t("notificationCenter.settingsToast", "Notification Settings"),
                    description: t("notificationCenter.settingsComingSoon", "Settings panel coming soon")
                  });
                }}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{t("notificationCenter.allNotifications", "All Notifications")}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
                <NotificationTabs 
                  activeTab={activeTab} 
                  onTabChange={handleTabChange} 
                  getUnreadCount={getUnreadCount} 
                />
                
                <TabsContent value={activeTab} className="mt-6">
                  {notifications.length === 0 ? (
                    <div className="py-12 text-center">
                      <Bell className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-muted-foreground">
                        {t("notificationCenter.noNotifications", "No notifications to display")}
                      </p>
                    </div>
                  ) : (
                    <NotificationsList 
                      notifications={notifications.filter(n => 
                        activeTab === "all" || 
                        (activeTab === "unread" && !n.read) ||
                        n.type === activeTab
                      )}
                      activeTab={activeTab}
                      onMarkAsRead={handleMarkAsRead}
                      onDelete={handleDeleteNotification}
                    />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotificationCenter;
