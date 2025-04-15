
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NotificationItemProps } from "./types";
import NotificationIcon from "./NotificationIcon";
import { cn } from "@/lib/utils";

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const handleAction = () => {
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
    onMarkAsRead(notification.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-start p-3 rounded-md border transition-colors",
        notification.read
          ? "bg-background"
          : "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30",
        notification.urgent && !notification.read && "border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10"
      )}
    >
      <div className="mt-1 mr-3">
        <NotificationIcon type={notification.type} />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h4 className={cn("text-sm font-medium", !notification.read && "font-bold")}>
            {notification.title}
          </h4>
          <span className="text-xs text-muted-foreground mr-1">{notification.time}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5 mb-1.5">{notification.message}</p>
        {notification.actionUrl && (
          <div className="flex justify-end">
            <Button
              size="sm"
              variant={notification.urgent ? "destructive" : "outline"}
              className="text-xs h-7 mt-1"
              onClick={handleAction}
            >
              {notification.urgent ? "اتخاذ إجراء فوري" : "عرض التفاصيل"}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationItem;
