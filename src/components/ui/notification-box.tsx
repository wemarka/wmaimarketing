
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";

type NotificationType = "success" | "warning" | "error" | "info";

interface NotificationBoxProps {
  type: NotificationType;
  title: string;
  message: string;
  onClose?: () => void;
  showIcon?: boolean;
  className?: string;
  showCloseButton?: boolean;
  isAnimated?: boolean;
}

const getNotificationConfig = (type: NotificationType) => {
  switch (type) {
    case "success":
      return {
        icon: CheckCircle,
        bgColor: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        borderColor: "border-green-200 dark:border-green-800",
        iconColor: "text-green-500 dark:text-green-400",
        title: "text-green-800 dark:text-green-300"
      };
    case "warning":
      return {
        icon: AlertTriangle,
        bgColor: "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
        borderColor: "border-amber-200 dark:border-amber-800",
        iconColor: "text-amber-500 dark:text-amber-400",
        title: "text-amber-800 dark:text-amber-300"
      };
    case "error":
      return {
        icon: AlertCircle,
        bgColor: "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20",
        borderColor: "border-red-200 dark:border-red-800",
        iconColor: "text-red-500 dark:text-red-400",
        title: "text-red-800 dark:text-red-300"
      };
    case "info":
    default:
      return {
        icon: Info,
        bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        iconColor: "text-blue-500 dark:text-blue-400",
        title: "text-blue-800 dark:text-blue-300"
      };
  }
};

export const NotificationBox = ({
  type,
  title,
  message,
  onClose,
  showIcon = true,
  className,
  showCloseButton = true,
  isAnimated = true
}: NotificationBoxProps) => {
  const config = getNotificationConfig(type);
  const IconComponent = config.icon;

  const notificationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const NotificationContent = (
    <div 
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 shadow-sm transition-all duration-200",
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      {showIcon && (
        <div className={cn("shrink-0 mt-0.5", config.iconColor)}>
          <IconComponent className="h-5 w-5" />
        </div>
      )}
      
      <div className="flex-1">
        <h4 className={cn("text-sm font-medium", config.title)}>
          {title}
        </h4>
        <div className="mt-1 text-xs text-muted-foreground">{message}</div>
      </div>
      
      {showCloseButton && onClose && (
        <button 
          onClick={onClose} 
          className="shrink-0 rounded-md p-1 text-muted-foreground/70 opacity-70 hover:bg-accent hover:opacity-100 hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  if (isAnimated) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={notificationVariants}
        transition={{ duration: 0.2 }}
      >
        {NotificationContent}
      </motion.div>
    );
  }

  return NotificationContent;
};
