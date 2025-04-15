
import React from "react";
import { NotificationsListProps } from "./types";
import NotificationItem from "./NotificationItem";
import { useTranslation } from "react-i18next";

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  activeTab,
  onMarkAsRead
}) => {
  const { t } = useTranslation();
  
  // Filter notifications based on active tab
  const filteredNotifications = activeTab === "all"
    ? notifications
    : notifications.filter(notification => notification.type === activeTab);

  if (filteredNotifications.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">
          {t("dashboard.notifications.noNotifications", "No notifications to display")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredNotifications.map(notification => (
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
