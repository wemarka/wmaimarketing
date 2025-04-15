
import React from "react";
import { LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import NotificationsPopover from "./NotificationsPopover";

interface CompactHeaderProps {
  showSidebarTrigger: boolean;
  pathname: string;
  pageTitle: string;
  notificationCount: number;
  onNotificationClick: () => void;
}

const CompactHeader: React.FC<CompactHeaderProps> = ({
  showSidebarTrigger,
  pathname,
  pageTitle,
  notificationCount,
  onNotificationClick
}) => {
  return (
    <div className="flex items-center gap-2 w-full justify-between">
      <div className="flex items-center gap-2">
        {showSidebarTrigger && (
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-beauty-purple/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
        )}
        <div className="flex items-center gap-2">
          {pathname === "/dashboard" && <LayoutDashboard className="h-5 w-5 text-beauty-purple" />}
          <h2 className="text-lg font-semibold">{pageTitle}</h2>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <SearchBar />
        <ThemeToggle />
        <NotificationsPopover
          notificationCount={notificationCount}
          onNotificationClick={onNotificationClick}
        />
      </div>
    </div>
  );
};

export default CompactHeader;
