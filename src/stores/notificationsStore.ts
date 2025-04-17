
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Notification, NotificationsState } from "@/types/notifications";

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      
      addNotification: (notification) => set((state) => {
        // تجنب تكرار الإشعارات
        if (state.notifications.some(n => n.id === notification.id)) {
          return state;
        }
        
        // تصنيف الإشعار تلقائياً إذا لم يكن مصنفاً
        const enhancedNotification = {
          ...notification,
          category: notification.category || categorizeNotification(notification.type)
        };
        
        const newNotifications = [enhancedNotification, ...state.notifications];
        const newUnreadCount = newNotifications.filter(n => !n.read).length;
        
        return {
          notifications: newNotifications,
          unreadCount: newUnreadCount,
        };
      }),
      
      markAsRead: (id) => set((state) => {
        const updatedNotifications = state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        );
        const newUnreadCount = updatedNotifications.filter(n => !n.read).length;
        
        return {
          notifications: updatedNotifications,
          unreadCount: newUnreadCount,
        };
      }),
      
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0,
      })),
      
      deleteNotification: (id) => set((state) => {
        const filteredNotifications = state.notifications.filter(n => n.id !== id);
        const newUnreadCount = filteredNotifications.filter(n => !n.read).length;
        
        return {
          notifications: filteredNotifications,
          unreadCount: newUnreadCount,
        };
      }),
      
      clearAllNotifications: () => set({
        notifications: [],
        unreadCount: 0,
      }),

      getNotificationsByType: (type) => {
        const state = get();
        return state.notifications.filter(n => n.type === type);
      },

      getNotificationsByCategory: (category) => {
        const state = get();
        return state.notifications.filter(n => n.category === category);
      }
    }),
    {
      name: "notifications-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        notifications: state.notifications,
        unreadCount: state.unreadCount,
      }),
    }
  )
);

// Helper function to categorize notifications
function categorizeNotification(type: string): 'marketing' | 'content' | 'analytics' | 'system' {
  switch (type) {
    case 'post':
    case 'campaign':
      return 'marketing';
    case 'content':
    case 'task':
      return 'content';
    case 'analytics':
      return 'analytics';
    default:
      return 'system';
  }
}
