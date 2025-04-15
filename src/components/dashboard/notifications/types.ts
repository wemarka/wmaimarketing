
import { ReactNode } from "react";

// Types for the notifications widget
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "task" | "post" | "approval" | "system" | "message" | "urgent";
  read: boolean;
  urgent?: boolean;
  actionUrl?: string;
  dueDate?: string; // add due date for task-related notifications
  assignee?: string; // add assignee for task-related notifications
  relatedItemId?: string; // ID of related item (post, approval, etc.)
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

// Task reminder related types
export interface TaskReminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  relatedPostId?: string;
  assignee?: string;
}

export interface TaskReminderProps {
  task: TaskReminder;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TaskListProps {
  tasks: TaskReminder[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}
