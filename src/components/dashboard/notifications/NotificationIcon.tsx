
import React from "react";
import { Bell, CheckCircle, Calendar, AlertTriangle, Info } from "lucide-react";
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
      "text-slate-500"
  );

  const bgClass = cn(
    "h-8 w-8 rounded-full flex items-center justify-center",
    urgent ? "bg-red-100" : 
      type === "approval" ? "bg-amber-100" :
      type === "post" ? "bg-blue-100" :
      type === "task" ? "bg-green-100" :
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
      ) : (
        <Info className={iconClass} />
      )}
    </div>
  );
};

export default NotificationIcon;
