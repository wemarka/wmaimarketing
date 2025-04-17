
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Notification } from "./types";
import { Bell, MessageSquare, Calendar, CheckCircle, AlertTriangle, Info, FileText, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationsListProps {
  notifications: Notification[];
  activeTab: string;
  onMarkAsRead: (id: string) => void;
  onDelete?: (id: string) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  activeTab,
  onMarkAsRead,
  onDelete
}) => {
  // تحديد أيقونة الإشعار حسب نوعه
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "post":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "approval":
        return <CheckCircle className="h-5 w-5 text-amber-500" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "task":
        return <CheckCircle className="h-5 w-5 text-purple-500" />;
      case "content":
        return <FileText className="h-5 w-5 text-violet-500" />;
      case "analytics":
        return <BarChart3 className="h-5 w-5 text-emerald-500" />;
      case "system":
      default:
        return <Info className="h-5 w-5 text-slate-500" />;
    }
  };

  // حاوية للتحريك مع التأثير التدريجي للعناصر
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  };

  // تأثير عنصر الإشعار
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (notifications.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 text-center"
      >
        <Bell className="h-10 w-10 mx-auto text-muted-foreground/30 mb-2" />
        <p className="text-sm text-muted-foreground">
          {activeTab === "unread"
            ? "ليس لديك إشعارات غير مقروءة"
            : activeTab === "all"
            ? "ليس لديك إشعارات"
            : `ليس لديك إشعارات من نوع ${activeTab}`}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="divide-y"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          className={cn(
            "p-3 flex gap-3 transition-colors",
            !notification.read ? "bg-muted/40" : "",
            notification.urgent ? "border-r-4 border-r-red-500 dark:border-r-red-400" : ""
          )}
          variants={itemVariants}
        >
          <div className="shrink-0 pt-1">
            {getNotificationIcon(notification.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className={cn(
                "font-medium text-sm",
                !notification.read ? "text-foreground" : "text-muted-foreground"
              )}>
                {notification.title}
              </h4>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {notification.time.includes("T") 
                  ? new Date(notification.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                  : notification.time
                }
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground mt-1 break-words">
              {notification.message}
            </p>
            
            {notification.actionUrl && (
              <div className="mt-2 flex items-center justify-between">
                <Link to={notification.actionUrl} onClick={() => onMarkAsRead(notification.id)}>
                  <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                    {notification.actionText || "عرض التفاصيل"}
                  </Button>
                </Link>
                
                <div className="flex gap-1">
                  {!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0" 
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span className="sr-only">وضع علامة مقروء</span>
                    </Button>
                  )}
                  
                  {onDelete && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive" 
                      onClick={() => onDelete(notification.id)}
                    >
                      <span className="sr-only">حذف</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default NotificationsList;
