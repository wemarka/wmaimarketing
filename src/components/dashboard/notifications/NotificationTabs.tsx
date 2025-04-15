
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { NotificationTabsProps } from "./types";

const NotificationTabs: React.FC<NotificationTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  getUnreadCount 
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  return (
    <TabsList className="grid grid-cols-6 mb-3">
      <TabsTrigger value="all" className="relative">
        {t("dashboard.notifications.tabs.all")}
        {getUnreadCount() > 0 && (
          <Badge variant="secondary" className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-beauty-pink text-white text-[10px] min-w-4 h-4 flex items-center justify-center p-0 rounded-full">
            {getUnreadCount()}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger value="approval" className="relative">
        {t("dashboard.notifications.tabs.approval")}
        {getUnreadCount("approval") > 0 && (
          <Badge variant="secondary" className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-amber-500 text-white text-[10px] min-w-4 h-4 flex items-center justify-center p-0 rounded-full">
            {getUnreadCount("approval")}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger value="post" className="relative">
        {t("dashboard.notifications.tabs.post")}
        {getUnreadCount("post") > 0 && (
          <Badge variant="secondary" className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-blue-500 text-white text-[10px] min-w-4 h-4 flex items-center justify-center p-0 rounded-full">
            {getUnreadCount("post")}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger value="task" className="relative">
        {t("dashboard.notifications.tabs.task")}
        {getUnreadCount("task") > 0 && (
          <Badge variant="secondary" className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-green-500 text-white text-[10px] min-w-4 h-4 flex items-center justify-center p-0 rounded-full">
            {getUnreadCount("task")}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger value="message" className="relative">
        {t("dashboard.notifications.tabs.message", "رسائل")}
        {getUnreadCount("message") > 0 && (
          <Badge variant="secondary" className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-purple-500 text-white text-[10px] min-w-4 h-4 flex items-center justify-center p-0 rounded-full">
            {getUnreadCount("message")}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger value="system" className="relative">
        {t("dashboard.notifications.tabs.system")}
        {getUnreadCount("system") > 0 && (
          <Badge variant="secondary" className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-slate-500 text-white text-[10px] min-w-4 h-4 flex items-center justify-center p-0 rounded-full">
            {getUnreadCount("system")}
          </Badge>
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default NotificationTabs;
