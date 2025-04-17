
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNotificationsStore } from "@/stores/notificationsStore";
import { subscribeToNotifications } from "@/services/notificationService";

import NotificationHeader from "./notification/NotificationHeader";
import NotificationTabs from "./notification/NotificationTabs";
import NotificationsList from "./notification/NotificationsList";

interface NotificationsPopoverProps {
  onNotificationClick?: () => void;
}

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  onNotificationClick = () => {}
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();
  
  // استخدام متجر الإشعارات
  const { 
    notifications, 
    unreadCount,
    addNotification, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotificationsStore();

  // الاشتراك في الإشعارات في الوقت الحقيقي
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    if (user?.id) {
      unsubscribe = subscribeToNotifications(user.id, (notification) => {
        addNotification(notification);
      });
    }
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user?.id, addNotification]);

  const handleViewAllClick = () => {
    onNotificationClick();
    setOpen(false);
  };
  
  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };
  
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    
    toast({
      title: "تم تحديد جميع الإشعارات كمقروءة",
      description: "تم تحديث حالة الإشعارات",
    });
  };
  
  const handleDeleteNotification = (id: string) => {
    deleteNotification(id);
    
    toast({
      title: "تم حذف الإشعار",
      description: "تم حذف الإشعار بنجاح",
    });
  };
  
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : activeTab === "unread"
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === activeTab);

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
          onMarkAllAsRead={handleMarkAllAsRead}
        />
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <NotificationTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            getUnreadCount={(type) => {
              if (!type || type === "all") {
                return unreadCount;
              }
              return notifications.filter(n => !n.read && n.type === type).length;
            }} 
          />
          
          <TabsContent value={activeTab} className="m-0">
            <NotificationsList
              filteredNotifications={filteredNotifications}
              activeTab={activeTab}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDeleteNotification}
            />
          </TabsContent>
        </Tabs>
        
        <div className="p-2 flex justify-center border-t">
          <Link to="/notifications">
            <Button variant="link" size="sm" className="text-xs" onClick={handleViewAllClick}>
              عرض كل الإشعارات
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
