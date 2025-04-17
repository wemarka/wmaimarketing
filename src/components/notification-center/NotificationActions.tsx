
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface NotificationActionsProps {
  onMarkAllRead: () => void;
  onClearAll: () => void;
  hasUnread: boolean;
  hasNotifications: boolean;
}

const NotificationActions: React.FC<NotificationActionsProps> = ({
  onMarkAllRead,
  onClearAll,
  hasUnread,
  hasNotifications
}) => {
  const { t } = useTranslation();
  
  if (!hasNotifications) {
    return null;
  }
  
  return (
    <div className="flex justify-between items-center p-2 border-t">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-xs"
        disabled={!hasUnread}
        onClick={onMarkAllRead}
      >
        <CheckCircle className="h-3.5 w-3.5 mr-1" />
        {t("notificationCenter.markAllRead", "تحديد الكل كمقروء")}
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-xs text-destructive hover:text-destructive/90"
        onClick={onClearAll}
      >
        <Trash2 className="h-3.5 w-3.5 mr-1" />
        {t("notificationCenter.clearAll", "مسح الكل")}
      </Button>
    </div>
  );
};

export default NotificationActions;
