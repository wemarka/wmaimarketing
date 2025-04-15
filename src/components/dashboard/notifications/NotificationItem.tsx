
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NotificationItemProps } from "./types";
import NotificationIcon from "./NotificationIcon";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import { useTranslation } from "react-i18next";

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };
  
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkAsRead(notification.id);
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  // Format the time string to be more human readable if it's a Date
  const formattedTime = notification.time.includes("ago") 
    ? notification.time 
    : formatTimeAgo(notification.time);
  
  function formatTimeAgo(timeString: string) {
    try {
      // Try to parse the time string as a date
      const date = parseISO(timeString);
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: isRTL ? ar : undefined 
      });
    } catch (e) {
      // If parsing fails, return the original time string
      return timeString;
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className={`p-3 border-b last:border-b-0 cursor-pointer flex gap-3 transition-colors ${
        !notification.read ? "bg-slate-50 dark:bg-slate-800/50" : ""
      } hover:bg-slate-100 dark:hover:bg-slate-800/70`}
      onClick={handleClick}
    >
      <NotificationIcon 
        type={notification.type} 
        urgent={notification.urgent || false}
      />
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className={`text-sm font-medium ${!notification.read ? "font-semibold" : ""}`}>
            {notification.title}
            {notification.read && (
              <span className="inline-flex items-center text-xs text-green-500 ml-2">
                <CheckCircle size={12} className="mr-1" /> Read
              </span>
            )}
          </h4>
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
        
        {notification.actionUrl && notification.actionText && (
          <div className="mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs flex gap-1 items-center text-beauty-purple hover:bg-beauty-purple/10 hover:text-beauty-purple"
              onClick={handleActionClick}
            >
              {notification.actionText}
              <ExternalLink size={12} />
            </Button>
          </div>
        )}
      </div>
      
      {!notification.read && (
        <motion.div 
          className="h-2 w-2 rounded-full bg-beauty-purple mt-1 flex-shrink-0"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default NotificationItem;
