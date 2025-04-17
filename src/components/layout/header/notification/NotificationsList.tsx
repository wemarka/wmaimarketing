
import React from "react";
import { NotificationsListProps } from "@/components/dashboard/notifications/types";
import NotificationItem from "./NotificationItem";
import EmptyNotifications from "./EmptyNotifications";

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  activeTab,
  onMarkAsRead,
  onDelete
}) => {
  if (!notifications || notifications.length === 0) {
    return <EmptyNotifications type={activeTab} />;
  }

  return (
    <div className="max-h-[300px] overflow-y-auto">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotificationsList;
