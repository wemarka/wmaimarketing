
import React from "react";
import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import NotificationItem from "./NotificationItem";
import { NotificationsListProps } from "./types";

const NotificationsList: React.FC<NotificationsListProps> = ({ 
  notifications, 
  activeTab,
  onMarkAsRead 
}) => {
  const { t } = useTranslation();
  
  // Filter notifications based on active tab
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  if (filteredNotifications.length === 0) {
    return (
      <div className="text-center py-8">
        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-25" />
        <p className="text-muted-foreground">
          {t("dashboard.notifications.empty", "لا توجد إشعارات")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
      {filteredNotifications.map((notification) => (
        <NotificationItem 
          key={notification.id} 
          notification={notification} 
          onMarkAsRead={onMarkAsRead} 
        />
      ))}
    </div>
  );
};

export default NotificationsList;
