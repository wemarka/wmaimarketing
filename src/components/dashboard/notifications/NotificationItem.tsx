
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NotificationItemProps } from "./types";
import NotificationIcon from "./NotificationIcon";

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const navigate = useNavigate();
  
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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className={`p-3 border-b last:border-b-0 cursor-pointer flex gap-3 ${
        !notification.read ? "bg-slate-50 dark:bg-slate-800/50" : ""
      }`}
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
          </h4>
          <span className="text-xs text-muted-foreground">{notification.time}</span>
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
        <div className="h-2 w-2 rounded-full bg-beauty-purple mt-1 flex-shrink-0"></div>
      )}
    </motion.div>
  );
};

export default NotificationItem;
