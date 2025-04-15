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
  return;
};
export default CompactHeader;