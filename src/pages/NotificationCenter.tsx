
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Check, Trash2, Bell, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import {
  NotificationTabs,
  NotificationsList,
  Notification
} from "@/components/dashboard/notifications";

const NotificationCenter = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Sample notification data - in a real app, this would come from an API
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
      actionText: t("notifications.action.review", "Review Now")
    },
    {
      id: "2",
      title: t("notifications.scheduled.post", "Post scheduled for tomorrow"),
      message: t("notifications.scheduled.postDesc", "The post 'Skincare Tips' will be published tomorrow at 10:00 AM"),
      time: t("notifications.time.hours", "2 hours ago"),
      type: "post",
      read: false,
      actionUrl: "/scheduler",
      actionText: t("notifications.action.view", "View Post")
    },
    {
      id: "6",
      title: t("notifications.new.message", "New message from Marketing team"),
      message: t("notifications.new.messageDesc", "The marketing team sent you a message about the upcoming campaign"),
      time: t("notifications.time.minutes", "30 minutes ago"),
      type: "message",
      read: false,
      actionUrl: "/messages",
      actionText: t("notifications.action.read", "Read Message")
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
    },
    {
      id: "7",
      title: t("notifications.analytics.report", "Weekly analytics report available"),
      message: t("notifications.analytics.reportDesc", "Your weekly analytics report is now available for review"),
      time: t("notifications.time.day", "1 day ago"),
      type: "system",
      read: false,
      actionUrl: "/analytics",
      actionText: t("notifications.action.view", "View Report")
    },
    {
      id: "8", 
      title: t("notifications.product.update", "New product added to catalog"),
      message: t("notifications.product.updateDesc", "A new product has been added to your catalog"),
      time: t("notifications.time.hours", "3 hours ago"),
      type: "task",
      read: false,
      actionUrl: "/product/list",
      actionText: t("notifications.action.view", "View Product")
    },
    {
      id: "9",
      title: t("notifications.comment.new", "New comment on your post"),
      message: t("notifications.comment.newDesc", "A user left a comment on your post about skincare routines"),
      time: t("notifications.time.minutes", "45 minutes ago"),
      type: "message",
      read: true,
      actionUrl: "/content-tools"
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

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    
    toast({
      title: t("dashboard.notifications.deleted", "Notification deleted"),
      description: t("dashboard.notifications.deleteSuccess", "The notification has been removed")
    });
  };

  // Delete all notifications
  const deleteAllNotifications = () => {
    setNotifications([]);
    
    toast({
      title: t("dashboard.notifications.deletedAll", "All notifications deleted"),
      description: t("dashboard.notifications.deleteAllSuccess", "All notifications have been removed")
    });
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Layout>
      <Helmet>
        <title>{t("notificationCenter.pageTitle", "Notification Center")} - بيوتي</title>
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
              {getUnreadCount() > 0 && (
                <motion.span 
                  className="bg-beauty-pink text-white text-sm px-2 py-0.5 rounded-full"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {getUnreadCount()} {t("notificationCenter.unread", "unread")}
                </motion.span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={markAllAsRead}
                disabled={getUnreadCount() === 0}
              >
                <Check className="h-4 w-4" />
                <span>{t("notificationCenter.markAllRead", "Mark all read")}</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-destructive hover:bg-destructive/10"
                onClick={deleteAllNotifications}
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
                      notifications={notifications} 
                      activeTab={activeTab}
                      onMarkAsRead={markAsRead}
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
