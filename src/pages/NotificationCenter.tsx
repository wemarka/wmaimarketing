
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { 
  NotificationHeader, 
  NotificationActions,
  NotificationContent,
  EmptyNotifications
} from "@/components/notification-center";
import { toast } from "@/components/ui/use-toast";

// Types for our notifications
interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "system" | "campaign" | "competitor" | "ai" | "email";
  priority?: "high" | "normal" | "low";
}

// Sample data for demonstrations
const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "تحليل جديد للمنافسين",
    message: "تم اكتشاف استراتيجية تسويقية جديدة من المنافس الرئيسي",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    type: "competitor",
    priority: "high"
  },
  {
    id: "2",
    title: "إنشاء محتوى جديد",
    message: "قام الذكاء الاصطناعي بإنشاء 5 منشورات جديدة للمراجعة",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    read: false,
    type: "ai"
  },
  {
    id: "3",
    title: "تقرير أداء الحملة",
    message: "حققت حملة 'مجموعة الصيف' معدل تحويل بنسبة 15%",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    type: "campaign"
  },
  {
    id: "4",
    title: "تقرير حملة البريد الإلكتروني",
    message: "تم فتح 65% من رسائل البريد الإلكتروني في الحملة الأخيرة",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: "email"
  },
  {
    id: "5",
    title: "تحديث النظام",
    message: "تم تحديث النظام إلى الإصدار الجديد بنجاح",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    type: "system"
  }
];

const NotificationCenter: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  
  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Handle marking a notification as read
  const handleNotificationClick = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    toast({
      title: t("notificationCenter.notificationRead", "تم تحديد الإشعار كمقروء"),
      duration: 2000
    });
  };
  
  // Mark all notifications as read
  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: t("notificationCenter.allMarkedRead", "تم تحديد جميع الإشعارات كمقروءة"),
      duration: 2000
    });
  };
  
  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
    toast({
      title: t("notificationCenter.allCleared", "تم مسح جميع الإشعارات"),
      duration: 2000
    });
  };
  
  return (
    <Layout>
      <Helmet>
        <title>{t("notificationCenter.pageTitle", "مركز الإشعارات - سيركل")}</title>
      </Helmet>
      
      <div className="p-6">
        <NotificationHeader 
          title={t("notificationCenter.title", "مركز الإشعارات")}
          unreadCount={unreadCount}
        />
        
        <Card className="mt-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="p-0 h-12 w-full rounded-none bg-transparent border-b border-transparent flex items-center justify-start gap-2 px-4">
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none h-12 px-4"
                >
                  {t("notificationCenter.tabs.all", "الكل")}
                  <span className="ml-2 text-xs bg-muted rounded-full h-5 min-w-5 inline-flex items-center justify-center px-1">
                    {notifications.length}
                  </span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="unread"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none h-12 px-4"
                >
                  {t("notificationCenter.tabs.unread", "غير مقروء")}
                  {unreadCount > 0 && (
                    <span className="ml-2 text-xs bg-beauty-pink text-white rounded-full h-5 min-w-5 inline-flex items-center justify-center px-1">
                      {unreadCount}
                    </span>
                  )}
                </TabsTrigger>
                
                <TabsTrigger 
                  value="competitor"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none h-12 px-4"
                >
                  {t("notificationCenter.tabs.competitor", "المنافسين")}
                </TabsTrigger>
                
                <TabsTrigger 
                  value="ai"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none h-12 px-4"
                >
                  {t("notificationCenter.tabs.ai", "الذكاء الاصطناعي")}
                </TabsTrigger>
                
                <TabsTrigger 
                  value="campaign"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none h-12 px-4"
                >
                  {t("notificationCenter.tabs.campaign", "الحملات")}
                </TabsTrigger>
                
                <TabsTrigger 
                  value="email"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none h-12 px-4"
                >
                  {t("notificationCenter.tabs.email", "البريد الإلكتروني")}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-0">
              {/* The content will be the same for all tabs, just filtered differently */}
              <TabsContent value={activeTab} className="m-0">
                {filteredNotifications.length > 0 ? (
                  <NotificationContent 
                    notifications={filteredNotifications}
                    onNotificationClick={handleNotificationClick}
                  />
                ) : (
                  <EmptyNotifications />
                )}
              </TabsContent>
            </div>
          </Tabs>
          
          <NotificationActions 
            onMarkAllRead={handleMarkAllRead}
            onClearAll={handleClearAll}
            hasUnread={unreadCount > 0}
            hasNotifications={notifications.length > 0}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default NotificationCenter;
