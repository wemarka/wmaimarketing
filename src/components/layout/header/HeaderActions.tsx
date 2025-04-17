
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import ThemeToggle from "./ThemeToggle";
import NotificationsPopover from "./NotificationsPopover";
import UserPreferencesButton from "./UserPreferencesButton";
import SearchBar from "./SearchBar";
import { useNotificationsStore } from "@/stores/notificationsStore";

const HeaderActions: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { unreadCount } = useNotificationsStore();
  
  return (
    <div className="flex items-center gap-1 md:gap-2">
      {!isMobile && <SearchBar />}
      
      <UserPreferencesButton />
      
      <ThemeToggle />
      
      <NotificationsPopover />
    </div>
  );
};

export default HeaderActions;
