
import React from "react";
import NotificationsPopover from "../NotificationsPopover";
import MobileSearchButton from "../search/MobileSearchButton";

interface CompactHeaderActionsProps {
  notificationCount: number;
  onNotificationClick: () => void;
}

const CompactHeaderActions: React.FC<CompactHeaderActionsProps> = ({
  notificationCount,
  onNotificationClick
}) => {
  return (
    <div className="flex items-center gap-3">
      <MobileSearchButton />
      <NotificationsPopover
        notificationCount={notificationCount}
        onNotificationClick={onNotificationClick}
      />
    </div>
  );
};

export default CompactHeaderActions;
