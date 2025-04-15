
import React from "react";
import { CompactMenuButton, PageTitleDisplay, CompactHeaderActions } from "./compact";

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
