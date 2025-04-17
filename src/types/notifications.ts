
/**
 * أنواع الإشعارات المختلفة في النظام
 */
export type NotificationType = 'post' | 'message' | 'approval' | 'task' | 'system' | 'alert' | 'content' | 'analytics';

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
  relatedIds?: {
    postId?: string;
    campaignId?: string;
    taskId?: string;
  };
  category?: 'marketing' | 'content' | 'analytics' | 'system';
  metadata?: Record<string, any>;
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
  clearAllNotifications: () => void;
  getNotificationsByType: (type: NotificationType) => Notification[];
  getNotificationsByCategory: (category: string) => Notification[];
}
