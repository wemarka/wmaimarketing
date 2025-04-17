
export interface NotificationIconProps {
  type: "approval" | "post" | "task" | "system" | "message" | "alert";
  className?: string;
  urgent?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "approval" | "post" | "task" | "system" | "message" | "alert";
  read: boolean;
  urgent?: boolean;
  actionUrl?: string;
  actionText?: string;
}

export interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface TaskReminder {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  assignedTo?: string;
  relatedPostId?: string;
  tags?: string[];
}

export interface NotificationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  getUnreadCount: (type?: string) => number;
}

export interface NotificationsListProps {
  notifications: Notification[];
  activeTab: string;
  onMarkAsRead: (id: string) => void;
  onDelete?: (id: string) => void;
}
