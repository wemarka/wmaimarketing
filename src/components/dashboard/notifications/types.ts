
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'approval' | 'post' | 'task' | 'system';
  read: boolean;
  urgent?: boolean;
  actionUrl?: string;
  actionText?: string;
}

export interface NotificationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  getUnreadCount: (type?: string) => number;
}

export interface NotificationsListProps {
  notifications: Notification[];
  activeTab: string;
  onMarkAsRead: (id: string) => void;
}

export interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}
