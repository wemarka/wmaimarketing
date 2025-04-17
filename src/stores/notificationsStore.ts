
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification, NotificationsState } from '@/types/notifications';

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      
      addNotification: (notification: Notification) => set((state) => {
        // تجنب تكرار الإشعارات بنفس المعرف
        if (state.notifications.some(n => n.id === notification.id)) {
          return state;
        }
        
        const newNotifications = [notification, ...state.notifications].slice(0, 100); // الاحتفاظ بآخر 100 إشعار
        const newUnreadCount = newNotifications.filter(n => !n.read).length;
        
        return {
          notifications: newNotifications,
          unreadCount: newUnreadCount
        };
      }),
      
      markAsRead: (id: string) => set((state) => {
        const newNotifications = state.notifications.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        );
        
        const newUnreadCount = newNotifications.filter(n => !n.read).length;
        
        return {
          notifications: newNotifications,
          unreadCount: newUnreadCount
        };
      }),
      
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(notification => ({ ...notification, read: true })),
        unreadCount: 0
      })),
      
      deleteNotification: (id: string) => set((state) => {
        const newNotifications = state.notifications.filter(notification => notification.id !== id);
        const newUnreadCount = newNotifications.filter(n => !n.read).length;
        
        return {
          notifications: newNotifications,
          unreadCount: newUnreadCount
        };
      }),
      
      deleteAllNotifications: () => set({ notifications: [], unreadCount: 0 })
    }),
    {
      name: 'notifications-storage',
      partialize: (state) => ({
        notifications: state.notifications
      })
    }
  )
);
