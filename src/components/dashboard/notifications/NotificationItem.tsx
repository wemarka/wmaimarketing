
import React from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotificationItemProps } from "./types";
import NotificationIcon from "./NotificationIcon";

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const isUnread = !notification.read;
  
  const handleClick = () => {
    if (isUnread) {
      onMarkAsRead(notification.id);
    }
  };
  
  return (
    <div 
      className={cn(
        "flex p-3 border-b last:border-0 gap-3 transition-colors",
        isUnread && "bg-muted/40",
        notification.urgent && "bg-red-50 dark:bg-red-950/20"
      )}
      onClick={handleClick}
    >
      <div className={cn("mt-1", isRTL && "order-last")}>
        <NotificationIcon 
          type={notification.type} 
          urgent={notification.urgent || false}
        />
      </div>
      
      <div className="flex-1">
        <h4 className={cn("font-medium text-sm", isUnread && "font-semibold")}>
          {notification.title}
        </h4>
        <p className="text-muted-foreground text-sm mt-1">{notification.message}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{notification.time}</span>
          
          {notification.actionUrl && notification.actionText && (
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
            >
              <a href={notification.actionUrl} className="flex items-center gap-1">
                {notification.actionText}
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
