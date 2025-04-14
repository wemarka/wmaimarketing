
import React from "react";
import { motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import NotificationIcon from "./NotificationIcon";
import { NotificationItemProps } from "./types";

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      key={notification.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`border rounded-lg p-3 relative ${
        notification.read ? 'bg-white' : 'bg-slate-50'
      } ${notification.urgent ? 'border-amber-200' : 'border'}`}
    >
      <div className="flex">
        <div className={`rounded-full p-2 mr-3 ${
          notification.type === 'post' ? 'bg-beauty-purple/10' :
          notification.type === 'task' ? 'bg-green-100' :
          notification.type === 'approval' ? 'bg-amber-100' :
          'bg-blue-100'
        }`}>
          <NotificationIcon type={notification.type} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`font-medium ${notification.read ? '' : 'font-semibold'}`}>
              {notification.title}
              {!notification.read && (
                <span className="inline-block w-2 h-2 bg-beauty-pink rounded-full mr-2"></span>
              )}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {notification.time}
              </span>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onMarkAsRead(notification.id)}
                className="h-5 w-5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
          <div className="flex justify-between items-center mt-2">
            {notification.urgent && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <Clock className="h-3 w-3 mr-1" /> هام
              </Badge>
            )}
            {notification.actionUrl && (
              <Button
                variant="link"
                className="h-auto p-0 text-beauty-purple"
                size="sm"
                asChild
              >
                <a href={notification.actionUrl}>
                  {t("dashboard.notifications.view", "عرض التفاصيل")}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationItem;
