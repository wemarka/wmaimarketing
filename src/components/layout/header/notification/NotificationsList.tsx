
import React from "react";
import { AnimatePresence } from "framer-motion";
import NotificationItem from "./NotificationItem";
import EmptyNotifications from "./EmptyNotifications";

interface NotificationsListProps {
  filteredNotifications: Array<{
    id: string;
    type: string;
    title: string;
    time: string;
    read: boolean;
  }>;
  activeTab: string;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  filteredNotifications,
  activeTab,
  onMarkAsRead,
  onDelete
}) => {
  if (filteredNotifications.length === 0) {
    return <EmptyNotifications activeTab={activeTab} />;
  }

  return (
    <div className="max-h-[280px] overflow-y-auto scrollbar-thin">
      <AnimatePresence initial={false}>
        {filteredNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsList;
