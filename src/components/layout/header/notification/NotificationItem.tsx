
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
    category?: string;
    urgent?: boolean;
    actionUrl?: string;
    actionText?: string;
  };
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const getTypeConfig = (type: string, category?: string) => {
  const configs = {
    post: { bg: "bg-blue-100", text: "text-blue-700", label: "منشور" },
    content: { bg: "bg-purple-100", text: "text-purple-700", label: "محتوى" },
    analytics: { bg: "bg-green-100", text: "text-green-700", label: "تحليلات" },
    task: { bg: "bg-amber-100", text: "text-amber-700", label: "مهمة" },
    approval: { bg: "bg-indigo-100", text: "text-indigo-700", label: "موافقة" },
    alert: { bg: "bg-red-100", text: "text-red-700", label: "تنبيه" },
    system: { bg: "bg-slate-100", text: "text-slate-700", label: "النظام" },
  };

  // Use category badge if available and no specific type match
  if (category && !configs[type]) {
    switch (category) {
      case 'marketing':
        return { bg: "bg-pink-100", text: "text-pink-700", label: "تسويق" };
      case 'content':
        return { bg: "bg-violet-100", text: "text-violet-700", label: "محتوى" };
      case 'analytics':
        return { bg: "bg-emerald-100", text: "text-emerald-700", label: "تحليلات" };
      default:
        return configs.system;
    }
  }

  return configs[type] || configs.system;
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete
}) => {
  const typeConfig = getTypeConfig(notification.type, notification.category);
  
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
          !notification.read && "bg-muted/20",
          notification.urgent && "border-r-2 border-r-red-500"
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
            {notification.actionText && notification.actionUrl && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 h-7 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(notification.id);
                  window.location.href = notification.actionUrl!;
                }}
              >
                {notification.actionText}
              </Button>
            )}
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
