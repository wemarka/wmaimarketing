
import React from "react";
import { CheckCircle, Calendar, AlertCircle, Bell } from "lucide-react";
import { NotificationIconProps } from "./types";

const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
  switch (type) {
    case "task":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "post":
      return <Calendar className="h-5 w-5 text-beauty-purple" />;
    case "approval":
      return <AlertCircle className="h-5 w-5 text-amber-500" />;
    default:
      return <Bell className="h-5 w-5 text-blue-500" />;
  }
};

export default NotificationIcon;
