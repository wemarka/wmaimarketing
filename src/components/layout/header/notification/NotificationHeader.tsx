
import React from "react";
import { Check, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  onMarkAllAsRead
}) => {
  return (
    <div className="p-3 border-b flex items-center justify-between">
      <h3 className="font-medium text-lg flex items-center gap-2">
        الإشعارات
        {unreadCount > 0 && (
          <Badge variant="secondary" className="bg-slate-100">
            {unreadCount} جديد
          </Badge>
        )}
      </h3>
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={onMarkAllAsRead}
          title="تحديد الكل كمقروء"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          title="إعدادات الإشعارات"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NotificationHeader;
