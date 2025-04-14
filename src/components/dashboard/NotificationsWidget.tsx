
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";

import { 
  NotificationTabs, 
  NotificationsList,
  Notification
} from "./notifications";

const NotificationsWidget = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Sample notification data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "منشور جديد بانتظار الموافقة",
      message: "يوجد منشور جديد بعنوان 'أفضل منتجات العناية بالبشرة' بانتظار موافقتك",
      time: "قبل 10 دقائق",
      type: "approval",
      read: false,
      urgent: true,
      actionUrl: "/scheduler?tab=workflow"
    },
    {
      id: "2",
      title: "تم جدولة منشور للنشر غداً",
      message: "سيتم نشر المنشور 'نصائح للعناية بالبشرة' غداً الساعة 10:00 صباحاً",
      time: "قبل 2 ساعة",
      type: "post",
      read: false,
      actionUrl: "/scheduler"
    },
    {
      id: "3",
      title: "اكتمال مهمة 'تحديث صور المنتجات'",
      message: "تم الانتهاء من تحديث صور المنتجات بنجاح",
      time: "قبل 1 يوم",
      type: "task",
      read: true,
      actionUrl: "/content-tools"
    },
    {
      id: "4",
      title: "تحديث النظام",
      message: "تم تحديث النظام إلى الإصدار الجديد بنجاح",
      time: "قبل 2 يوم",
      type: "system",
      read: true
    },
    {
      id: "5",
      title: "تذكير: موعد نشر حملة إعلانية",
      message: "لديك حملة إعلانية مجدولة للنشر اليوم الساعة 3:00 عصراً",
      time: "قبل 5 ساعات",
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
      title: "تم تعليم جميع الإشعارات كمقروءة",
      description: "تم تحديث الإشعارات بنجاح"
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
          <CardTitle>{t("dashboard.notifications.title", "الإشعارات")}</CardTitle>
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
          {t("dashboard.notifications.markAllRead", "تعليم الكل كمقروء")}
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
