
import React from "react";
import { Bell, CheckCircle, Calendar, AlertTriangle, Info, MessageSquare, BarChart3, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationIconProps } from "./types";

export const NotificationIcon: React.FC<NotificationIconProps> = ({ 
  type, 
  className,
  urgent = false
}) => {
  const iconClass = cn(
    "h-4 w-4",
    className,
    urgent ? "text-red-500" : 
      type === "approval" ? "text-amber-500" :
      type === "post" ? "text-blue-500" :
      type === "task" ? "text-green-500" :
      type === "message" ? "text-purple-500" :
      type === "content" ? "text-violet-500" :
      type === "analytics" ? "text-emerald-500" :
      "text-slate-500"
  );

  const bgClass = cn(
    "h-8 w-8 rounded-full flex items-center justify-center",
    urgent ? "bg-red-100" : 
      type === "approval" ? "bg-amber-100" :
      type === "post" ? "bg-blue-100" :
      type === "task" ? "bg-green-100" :
      type === "message" ? "bg-purple-100" :
      type === "content" ? "bg-violet-100" :
      type === "analytics" ? "bg-emerald-100" :
      "bg-slate-100"
  );

  return (
    <div className={bgClass}>
      {urgent ? (
        <AlertTriangle className={iconClass} />
      ) : type === "approval" ? (
        <Bell className={iconClass} />
      ) : type === "post" ? (
        <Calendar className={iconClass} />
      ) : type === "task" ? (
        <CheckCircle className={iconClass} />
      ) : type === "message" ? (
        <MessageSquare className={iconClass} />
      ) : type === "content" ? (
        <FileText className={iconClass} />
      ) : type === "analytics" ? (
        <BarChart3 className={iconClass} />
      ) : (
        <Info className={iconClass} />
      )}
    </div>
  );
};

export default NotificationIcon;
