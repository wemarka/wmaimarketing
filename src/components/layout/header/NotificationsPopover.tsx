
import React, { useState } from "react";
import { Bell, Check, Settings, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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

const getTypeConfig = (type: string) => {
  switch(type) {
    case 'marketing':
      return { bg: "bg-purple-100", text: "text-purple-700", label: "تسويق" };
    case 'comment':
      return { bg: "bg-blue-100", text: "text-blue-700", label: "تعليق" };
    case 'post':
      return { bg: "bg-green-100", text: "text-green-700", label: "نشر" };
    case 'alert':
      return { bg: "bg-amber-100", text: "text-amber-700", label: "تنبيه" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", label: "إشعار" };
  }
};

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
        <div className="p-3 border-b flex items-center justify-between">
          <h3 className="font-medium text-lg flex items-center gap-2">
            الإشعارات
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-slate-100">
                {unreadCount} جديد
              </Badge>
            )}
          </h3>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={markAllAsRead}
              title="تحديد الكل كمقروء"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              title="إعدادات الإشعارات"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b">
            <TabsList className="w-full grid grid-cols-4 h-11 bg-transparent">
              <TabsTrigger value="all" className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none">الكل</TabsTrigger>
              <TabsTrigger value="unread" className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none">غير مقروء</TabsTrigger>
              <TabsTrigger value="marketing" className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none">تسويق</TabsTrigger>
              <TabsTrigger value="comment" className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none">تعليقات</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="m-0">
            <div className="max-h-[280px] overflow-y-auto scrollbar-thin">
              {filteredNotifications.length > 0 ? (
                <AnimatePresence initial={false}>
                  {filteredNotifications.map((notification) => {
                    const typeConfig = getTypeConfig(notification.type);
                    return (
                      <motion.div 
                        key={notification.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div 
                          className={cn(
                            "p-3 border-b hover:bg-muted/40 cursor-pointer relative group",
                            !notification.read && "bg-muted/20"
                          )}
                          onClick={() => {
                            markAsRead(notification.id);
                            onNotificationClick();
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <Badge variant="secondary" className={cn("mt-1 border-0", typeConfig.bg, typeConfig.text)}>
                              {typeConfig.label}
                            </Badge>
                            <div className="flex-1">
                              <p className={cn("text-sm", !notification.read && "font-medium")}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <div className="py-12 px-4 text-center text-muted-foreground">
                  <div className="flex justify-center mb-3">
                    <Bell className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                  <p className="mb-1">لا توجد إشعارات {activeTab !== "all" ? "في هذا القسم" : ""}</p>
                  <p className="text-sm">ستظهر الإشعارات الجديدة هنا</p>
                </div>
              )}
            </div>
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
