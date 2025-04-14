
import { ReactNode } from "react";

// Types for the notifications widget
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "task" | "post" | "approval" | "system";
  read: boolean;
  urgent?: boolean;
  actionUrl?: string;
}

export interface NotificationIconProps {
  type: string;
  className?: string;
}

export interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export interface NotificationsListProps {
  notifications: Notification[];
  activeTab: string;
  onMarkAsRead: (id: string) => void;
}

export interface NotificationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  getUnreadCount: (type?: string) => number;
}
