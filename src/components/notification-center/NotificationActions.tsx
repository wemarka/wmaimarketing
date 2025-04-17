
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Trash2, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";

interface NotificationActionsProps {
  onMarkAllAsRead: () => void;
  onDeleteAllNotifications: () => void;
  unreadCount: number;
  notificationsCount: number;
}

const NotificationActions: React.FC<NotificationActionsProps> = ({
  onMarkAllAsRead,
  onDeleteAllNotifications,
  unreadCount,
  notificationsCount
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={onMarkAllAsRead}
        disabled={unreadCount === 0}
      >
        <Check className="h-4 w-4" />
        <span>{t("notificationCenter.markAllRead", "Mark all read")}</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 text-destructive hover:bg-destructive/10"
        onClick={onDeleteAllNotifications}
        disabled={notificationsCount === 0}
      >
        <Trash2 className="h-4 w-4" />
        <span>{t("notificationCenter.clearAll", "Clear all")}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        title={t("notificationCenter.settings", "Notification Settings")}
        onClick={() => {
          toast({
            title: t("notificationCenter.settingsToast", "Notification Settings"),
            description: t("notificationCenter.settingsComingSoon", "Settings panel coming soon")
          });
        }}
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NotificationActions;
