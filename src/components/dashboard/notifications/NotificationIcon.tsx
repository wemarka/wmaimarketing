
import React from "react";
import { CheckCircle, Calendar, AlertCircle, Bell, MessageCircle, Zap, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationIconProps {
  type: string;
  className?: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type, className }) => {
  switch (type) {
    case "task":
      return <ClipboardList className={cn("h-5 w-5 text-indigo-500", className)} />;
    case "post":
      return <Calendar className={cn("h-5 w-5 text-beauty-purple", className)} />;
    case "approval":
      return <AlertCircle className={cn("h-5 w-5 text-amber-500", className)} />;
    case "message":
      return <MessageCircle className={cn("h-5 w-5 text-blue-500", className)} />;
    case "urgent":
      return <Zap className={cn("h-5 w-5 text-red-500", className)} />;
    default:
      return <Bell className={cn("h-5 w-5 text-blue-500", className)} />;
  }
};

export default NotificationIcon;
