
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare, 
  Clock, 
  X 
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";

// أنواع البيانات للإشعارات
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "task" | "post" | "approval" | "system";
  read: boolean;
  urgent?: boolean;
  actionUrl?: string;
}

const NotificationsWidget = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // بيانات تجريبية للإشعارات
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

  // حساب عدد الإشعارات غير المقروءة لكل تصنيف
  const getUnreadCount = (type?: string) => {
    if (!type || type === "all") {
      return notifications.filter(n => !n.read).length;
    }
    return notifications.filter(n => !n.read && n.type === type).length;
  };
  
  // تعليم الإشعار كمقروء
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // تعليم جميع الإشعارات كمقروءة
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "تم تعليم جميع الإشعارات كمقروءة",
      description: "تم تحديث الإشعارات بنجاح"
    });
  };

  // الحصول على أيقونة نوع الإشعار
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "post":
        return <Calendar className="h-5 w-5 text-beauty-purple" />;
      case "approval":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  // تصفية الإشعارات حسب النوع النشط
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

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
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all" className="relative">
              {t("dashboard.notifications.filters.all", "الكل")}
              {getUnreadCount() > 0 && (
                <span className="absolute top-0.5 left-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </TabsTrigger>
            <TabsTrigger value="post" className="relative">
              {t("dashboard.notifications.filters.posts", "المنشورات")}
              {getUnreadCount("post") > 0 && (
                <span className="absolute top-0.5 left-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </TabsTrigger>
            <TabsTrigger value="task" className="relative">
              {t("dashboard.notifications.filters.tasks", "المهام")}
              {getUnreadCount("task") > 0 && (
                <span className="absolute top-0.5 left-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approval" className="relative">
              {t("dashboard.notifications.filters.approvals", "الموافقات")}
              {getUnreadCount("approval") > 0 && (
                <span className="absolute top-0.5 left-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-25" />
                <p className="text-muted-foreground">
                  {t("dashboard.notifications.empty", "لا توجد إشعارات")}
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`border rounded-lg p-3 relative ${
                      notification.read ? 'bg-white' : 'bg-slate-50'
                    } ${notification.urgent ? 'border-amber-200' : 'border'}`}
                  >
                    <div className="flex">
                      <div className={`rounded-full p-2 mr-3 ${
                        notification.type === 'post' ? 'bg-beauty-purple/10' :
                        notification.type === 'task' ? 'bg-green-100' :
                        notification.type === 'approval' ? 'bg-amber-100' :
                        'bg-blue-100'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={`font-medium ${notification.read ? '' : 'font-semibold'}`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="inline-block w-2 h-2 bg-beauty-pink rounded-full mr-2"></span>
                            )}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {notification.time}
                            </span>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsRead(notification.id)}
                              className="h-5 w-5 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <div className="flex justify-between items-center mt-2">
                          {notification.urgent && (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              <Clock className="h-3 w-3 mr-1" /> هام
                            </Badge>
                          )}
                          {notification.actionUrl && (
                            <Button
                              variant="link"
                              className="h-auto p-0 text-beauty-purple"
                              size="sm"
                              asChild
                            >
                              <a href={notification.actionUrl}>
                                {t("dashboard.notifications.view", "عرض التفاصيل")}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationsWidget;
