
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NotificationItemProps } from "./types";
import NotificationIcon from "./NotificationIcon";
import { useTranslation } from "react-i18next";

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "bg-background border rounded-md p-3 cursor-pointer transition-colors",
        notification.urgent ? "bg-destructive/5 border-destructive/10" : "hover:bg-muted/50",
        !notification.read ? "border-accent" : "border-border"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("mt-1", isRTL ? "order-last" : "")}>
          <NotificationIcon type={notification.type} urgent={notification.urgent} />
        </div>
        <div className="flex-1">
          <h4 className={cn("font-medium", !notification.read && "font-semibold")}>{notification.title}</h4>
          <p className="text-muted-foreground text-sm mt-0.5">{notification.message}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">{notification.time}</span>
            {notification.actionUrl && (
              <Link to={notification.actionUrl} className="no-underline">
                <Button size="sm" variant="secondary" className="h-7 text-xs">
                  {notification.actionText || (isRTL ? "عرض" : "View")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
