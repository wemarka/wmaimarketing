
/**
 * أنواع الإشعارات المختلفة في النظام
 */
export type NotificationType = 'post' | 'message' | 'approval' | 'task' | 'system' | 'alert';

/**
 * واجهة الإشعار
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
  urgent?: boolean;
  actionUrl?: string;
  actionText?: string;
}

/**
 * واجهة حالة إدارة الإشعارات
 */
export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  deleteAllNotifications: () => void;
}
