
import React from "react";
import SearchBar from "../SearchBar";
import ThemeToggle from "../ThemeToggle";
import NotificationsPopover from "../NotificationsPopover";

interface CompactHeaderActionsProps {
  notificationCount: number;
  onNotificationClick: () => void;
}

const CompactHeaderActions: React.FC<CompactHeaderActionsProps> = ({
  notificationCount,
  onNotificationClick
}) => {
  return (
    <div className="flex items-center gap-2">
      <SearchBar />
      <ThemeToggle />
      <NotificationsPopover
        notificationCount={notificationCount}
        onNotificationClick={onNotificationClick}
      />
    </div>
  );
};

export default CompactHeaderActions;
