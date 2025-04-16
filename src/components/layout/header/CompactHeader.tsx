
import React from "react";
import { CompactMenuButton } from "./compact";
import { PageTitleDisplay } from "./compact";
import { CompactHeaderActions } from "./compact";

interface CompactHeaderProps {
  showSidebarTrigger?: boolean;
  pathname?: string;
  pageTitle?: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
}

const CompactHeader: React.FC<CompactHeaderProps> = ({
  showSidebarTrigger = false,
  pathname = "/dashboard",
  pageTitle = "لوحة التحكم",
  notificationCount = 0,
  onNotificationClick = () => {}
}) => {
  return (
    <div className="flex items-center justify-between py-2 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
        <CompactMenuButton show={showSidebarTrigger} />
        <PageTitleDisplay pathname={pathname} pageTitle={pageTitle} />
      </div>
      
      <CompactHeaderActions 
        notificationCount={notificationCount} 
        onNotificationClick={onNotificationClick} 
      />
    </div>
  );
};

export default CompactHeader;
