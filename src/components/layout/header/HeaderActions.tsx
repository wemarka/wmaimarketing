
import React from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import NotificationsPopover from "./NotificationsPopover";
import UserMenu from "./UserMenu";

interface HeaderActionsProps {
  notificationCount: number;
  onNotificationClick: () => void;
  userEmail?: string;
  onSignOut: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  notificationCount,
  onNotificationClick,
  userEmail,
  onSignOut
}) => {
  return (
    <motion.div 
      className="flex items-center gap-2 sm:gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <SearchBar />
      <ThemeToggle />
      <NotificationsPopover
        notificationCount={notificationCount}
        onNotificationClick={onNotificationClick}
      />
      <UserMenu
        userEmail={userEmail}
        onSignOut={onSignOut}
      />
    </motion.div>
  );
};

export default HeaderActions;
