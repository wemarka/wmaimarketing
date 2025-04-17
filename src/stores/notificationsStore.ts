
import { create } from "zustand";
import { Notification } from "@/types/notifications";
import { persist, createJSONStorage } from "zustand/middleware";

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

// استخدام الحفظ المحلي للإشعارات مع تقنية persist من zustand
export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,
      
      addNotification: (notification) => set((state) => {
        // تجنب تكرار الإشعارات
        if (state.notifications.some(n => n.id === notification.id)) {
          return state;
        }
        
        const newNotifications = [notification, ...state.notifications];
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
