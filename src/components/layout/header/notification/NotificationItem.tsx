
import React from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: {
    id: string;
    type: string;
    title: string;
    time: string;
    read: boolean;
  };
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

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

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete
}) => {
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
        onClick={() => onMarkAsRead(notification.id)}
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
              onDelete(notification.id);
            }}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationItem;
