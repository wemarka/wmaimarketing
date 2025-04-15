
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";

import { 
  NotificationTabs, 
  NotificationsList,
  Notification
} from "./notifications";

const NotificationsWidget = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Sample notification data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: t("notifications.new.approval", "New post awaiting approval"),
      message: t("notifications.new.approvalDesc", "There's a new post titled 'Best Skincare Products' awaiting your approval"),
      time: t("notifications.time.minutes", "10 minutes ago"),
      type: "approval",
      read: false,
      urgent: true,
      actionUrl: "/scheduler?tab=workflow"
    },
    {
      id: "2",
      title: t("notifications.scheduled.post", "Post scheduled for tomorrow"),
      message: t("notifications.scheduled.postDesc", "The post 'Skincare Tips' will be published tomorrow at 10:00 AM"),
      time: t("notifications.time.hours", "2 hours ago"),
      type: "post",
      read: false,
      actionUrl: "/scheduler"
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

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <CardTitle>{t("dashboard.notifications.title")}</CardTitle>
          {getUnreadCount() > 0 && (
            <Badge className="mr-2 bg-beauty-pink text-white ml-2" variant="secondary">
              {getUnreadCount()}
            </Badge>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={markAllAsRead}
          disabled={getUnreadCount() === 0}
        >
          {t("dashboard.notifications.markAllRead")}
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
