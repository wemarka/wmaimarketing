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
  return;
};
export default CompactHeader;