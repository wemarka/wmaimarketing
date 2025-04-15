
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

import NotificationHeader from "./notification/NotificationHeader";
import NotificationTabs from "./notification/NotificationTabs";
import NotificationsList from "./notification/NotificationsList";

interface NotificationsPopoverProps {
  notificationCount: number;
  onNotificationClick: () => void;
}

// Sample notifications data
const notifications = [
  {
    id: "1",
    type: "marketing",
    title: "إحصائيات الحملة الأخيرة جاهزة",
    time: "منذ ٢٠ دقيقة",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    title: "علق شخص ما على منشورك \"أفضل منتجات العناية للبشرة\"",
    time: "منذ ساعتين",
    read: false,
  },
  {
    id: "3",
    type: "post",
    title: "تم نشر المحتوى المجدول بنجاح",
    time: "منذ ٥ ساعات",
    read: false,
  },
  {
    id: "4", 
    type: "alert",
    title: "تنبيه: انخفض معدل التفاعل بنسبة 15%",
    time: "منذ يوم واحد",
    read: true,
  }
];

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  notificationCount,
  onNotificationClick,
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [notificationsData, setNotificationsData] = useState(notifications);

  const handleViewAllClick = () => {
    toast({
      title: "عرض كل الإشعارات",
      description: "سيتم توجيهك إلى صفحة الإشعارات",
    });
    onNotificationClick();
    setOpen(false);
  };
  
  const markAllAsRead = () => {
    setNotificationsData(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "تم تحديد جميع الإشعارات كمقروءة",
      description: "تم تحديث حالة الإشعارات",
    });
    onNotificationClick();
  };
  
  const markAsRead = (id: string) => {
    setNotificationsData(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotificationsData(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "تم حذف الإشعار",
      description: "تم حذف الإشعار بنجاح",
    });
  };
  
  const filteredNotifications = activeTab === "all" 
    ? notificationsData 
    : activeTab === "unread"
      ? notificationsData.filter(n => !n.read)
      : notificationsData.filter(n => n.type === activeTab);
      
  const unreadCount = notificationsData.filter(n => !n.read).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 relative">
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute -top-1 -right-1"
              >
                <Badge 
                  className="h-5 w-5 flex items-center justify-center text-[10px] bg-red-500"
                  variant="destructive"
                >
                  {unreadCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-0" align="end">
        <NotificationHeader 
          unreadCount={unreadCount} 
          onMarkAllAsRead={markAllAsRead}
        />
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <TabsContent value={activeTab} className="m-0">
            <NotificationsList
              filteredNotifications={filteredNotifications}
              activeTab={activeTab}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>
        </Tabs>
        
        <div className="p-2 flex justify-center border-t">
          <Button variant="link" size="sm" className="text-xs" onClick={handleViewAllClick}>
            عرض كل الإشعارات
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
