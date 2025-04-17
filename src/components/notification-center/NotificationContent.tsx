
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { arSA } from "date-fns/locale";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "system" | "campaign" | "competitor" | "ai" | "email";
  priority?: "high" | "normal" | "low";
}

interface NotificationContentProps {
  notifications: Notification[];
  onNotificationClick: (id: string) => void;
}

const getNotificationTypeStyles = (type: string) => {
  switch (type) {
    case "competitor":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
    case "ai":
      return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300";
    case "campaign":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "email":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
};

const getNotificationTypeLabel = (type: string, t: any) => {
  switch (type) {
    case "competitor":
      return t("notificationCenter.types.competitor", "تحليل المنافسين");
    case "ai":
      return t("notificationCenter.types.ai", "الذكاء الاصطناعي");
    case "campaign":
      return t("notificationCenter.types.campaign", "الحملات");
    case "email":
      return t("notificationCenter.types.email", "البريد الإلكتروني");
    default:
      return t("notificationCenter.types.system", "النظام");
  }
};

const NotificationContent: React.FC<NotificationContentProps> = ({ 
  notifications,
  onNotificationClick
}) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "ar" ? arSA : undefined;
  
  if (notifications.length === 0) {
    return null;
  }
  
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-2 p-2">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-4 rounded-lg border transition-all hover:bg-accent/50 cursor-pointer relative ${
              !notification.read ? "border-l-4 border-l-beauty-purple" : "border-transparent"
            }`}
            onClick={() => onNotificationClick(notification.id)}
          >
            <div className="flex items-start justify-between gap-2">
              <Avatar className={`h-8 w-8 ${getNotificationTypeStyles(notification.type)}`}>
                <span className="text-xs">{notification.type.charAt(0).toUpperCase()}</span>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{notification.title}</h4>
                  <Badge variant="outline" className={`${getNotificationTypeStyles(notification.type)} ml-2`}>
                    {getNotificationTypeLabel(notification.type, t)}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(notification.timestamp, { 
                      addSuffix: true,
                      locale 
                    })}
                  </span>
                  
                  {notification.priority === "high" && (
                    <Badge variant="destructive" className="text-xs">
                      {t("notificationCenter.highPriority", "أولوية عالية")}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationContent;
