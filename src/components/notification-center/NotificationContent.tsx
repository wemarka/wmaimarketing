
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { NotificationTabs, NotificationsList } from "@/components/dashboard/notifications";
import { Notification } from "@/types/notifications";
import { EmptyNotifications } from "@/components/notification-center";

interface NotificationContentProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  notifications: Notification[];
  getUnreadCount: (type?: string) => number;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationContent: React.FC<NotificationContentProps> = ({
  activeTab,
  onTabChange,
  notifications,
  getUnreadCount,
  onMarkAsRead,
  onDelete
}) => {
  const { t } = useTranslation();

  const filteredNotifications = notifications.filter(n => 
    activeTab === "all" || 
    (activeTab === "unread" && !n.read) ||
    n.type === activeTab
  );
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("notificationCenter.allNotifications", "All Notifications")}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
          <NotificationTabs 
            activeTab={activeTab} 
            onTabChange={onTabChange} 
            getUnreadCount={getUnreadCount} 
          />
          
          <TabsContent value={activeTab} className="mt-6">
            {notifications.length === 0 ? (
              <EmptyNotifications />
            ) : (
              <NotificationsList 
                notifications={filteredNotifications}
                activeTab={activeTab}
                onMarkAsRead={onMarkAsRead}
                onDelete={onDelete}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationContent;
