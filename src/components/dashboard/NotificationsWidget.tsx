
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

import { 
  NotificationTabs, 
  NotificationsList,
  Notification
} from "./notifications";

const NotificationsWidget = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  const isRTL = i18n.language === "ar";
  
  // Sample notification data with a new message notification
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: t("notifications.new.approval", "New post awaiting approval"),
      message: t("notifications.new.approvalDesc", "There's a new post titled 'Best Skincare Products' awaiting your approval"),
      time: t("notifications.time.minutes", "10 minutes ago"),
      type: "approval",
      read: false,
      urgent: true,
      actionUrl: "/scheduler?tab=workflow",
      actionText: isRTL ? "اتخاذ إجراء فوري" : "Take Action"
    },
    {
      id: "2",
      title: t("notifications.scheduled.post", "Post scheduled for tomorrow"),
      message: t("notifications.scheduled.postDesc", "The post 'Skincare Tips' will be published tomorrow at 10:00 AM"),
      time: t("notifications.time.hours", "2 hours ago"),
      type: "post",
      read: false,
      actionUrl: "/scheduler",
      actionText: isRTL ? "عرض التفاصيل" : "View Details"
    },
    {
      id: "6",
      title: t("notifications.new.message", "New message from Marketing team"),
      message: t("notifications.new.messageDesc", "The marketing team sent you a message about the upcoming campaign"),
      time: t("notifications.time.minutes", "30 minutes ago"),
      type: "message",
      read: false,
      actionUrl: "/messages",
      actionText: isRTL ? "قراءة الرسالة" : "Read Message"
    },
    {
      id: "3",
      title: t("notifications.completed.task", "Task 'Update Product Images' completed"),
      message: t("notifications.completed.taskDesc", "Product images have been successfully updated"),
      time: t("notifications.time.day", "1 day ago"),
      type: "task",
      read: true,
      actionUrl: "/content-tools"
    },
    {
      id: "4",
      title: t("notifications.system.update", "System Update"),
      message: t("notifications.system.updateDesc", "The system has been successfully updated to the latest version"),
      time: t("notifications.time.days", "2 days ago"),
      type: "system",
      read: true
    },
    {
      id: "5",
      title: t("notifications.reminder.campaign", "Reminder: Ad campaign scheduled"),
      message: t("notifications.reminder.campaignDesc", "You have an ad campaign scheduled for today at 3:00 PM"),
      time: t("notifications.time.hours", "5 hours ago"),
      type: "post",
      read: false,
      urgent: true,
      actionUrl: "/scheduler"
    }
  ]);

  // Count unread notifications by type
  const getUnreadCount = (type?: string) => {
    if (!type || type === "all") {
      return notifications.filter(n => !n.read).length;
    }
    return notifications.filter(n => !n.read && n.type === type).length;
  };
  
  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    // Show toast for newly read notification
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      toast({
        title: t("dashboard.notifications.markedAsRead", "Notification marked as read"),
        description: notification.title
      });
    }
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: t("dashboard.notifications.markAllReadSuccess", "All notifications marked as read"),
      description: t("dashboard.notifications.updated", "Notifications have been updated")
    });
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Simulate a new notification every 30 seconds (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      const hasUnread = notifications.some(n => !n.read);
      if (!hasUnread) {
        const newNotification: Notification = {
          id: `new-${Date.now()}`,
          title: t("notifications.new.insight", "New engagement insight available"),
          message: t("notifications.new.insightDesc", "Your latest post is performing 20% better than average"),
          time: t("notifications.time.now", "Just now"),
          type: "post",
          read: false,
          actionUrl: "/analytics"
        };
        
        setNotifications(prev => [newNotification, ...prev].slice(0, 10));
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [notifications, t]);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <CardTitle>{t("dashboard.notifications.title", "Notifications")}</CardTitle>
          {getUnreadCount() > 0 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <Badge className={`${isRTL ? "mr-2" : "ml-2"} bg-beauty-pink text-white`} variant="secondary">
                {getUnreadCount()}
              </Badge>
            </motion.div>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={markAllAsRead}
          disabled={getUnreadCount() === 0}
          className="text-sm"
        >
          {t("dashboard.notifications.markAllRead", "Mark all as read")}
        </Button>
      </CardHeader>
      
      <CardContent className="p-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
          <NotificationTabs 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
            getUnreadCount={getUnreadCount} 
          />
          
          <TabsContent value={activeTab} className="mt-0">
            <NotificationsList 
              notifications={notifications} 
              activeTab={activeTab}
              onMarkAsRead={markAsRead}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationsWidget;
