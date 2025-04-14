
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { NotificationTabsProps } from "./types";

const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onTabChange,
  getUnreadCount
}) => {
  const { t } = useTranslation();

  return (
    <TabsList className="grid grid-cols-4 mb-4">
      <TabsTrigger 
        value="all" 
        className="relative"
        onClick={() => onTabChange("all")}
      >
        {t("dashboard.notifications.filters.all", "الكل")}
        {getUnreadCount() > 0 && (
          <span className="absolute top-0.5 left-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </TabsTrigger>
      <TabsTrigger 
        value="post" 
        className="relative"
        onClick={() => onTabChange("post")}
      >
        {t("dashboard.notifications.filters.posts", "المنشورات")}
        {getUnreadCount("post") > 0 && (
          <span className="absolute top-0.5 left-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </TabsTrigger>
      <TabsTrigger 
        value="task" 
        className="relative"
        onClick={() => onTabChange("task")}
      >
        {t("dashboard.notifications.filters.tasks", "المهام")}
        {getUnreadCount("task") > 0 && (
          <span className="absolute top-0.5 left-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </TabsTrigger>
      <TabsTrigger 
        value="approval" 
        className="relative"
        onClick={() => onTabChange("approval")}
      >
        {t("dashboard.notifications.filters.approvals", "الموافقات")}
        {getUnreadCount("approval") > 0 && (
          <span className="absolute top-0.5 left-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default NotificationTabs;
