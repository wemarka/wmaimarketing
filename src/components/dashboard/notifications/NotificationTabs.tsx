
import React from "react";
import { useTranslation } from "react-i18next";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { NotificationTabsProps } from "./types";
import { cn } from "@/lib/utils";

const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onTabChange,
  getUnreadCount
}) => {
  const { t } = useTranslation();
  
  const tabs = [
    { id: "all", label: t("dashboard.notifications.tabs.all"), type: "all" },
    { id: "approval", label: t("dashboard.notifications.tabs.approval"), type: "approval" },
    { id: "post", label: t("dashboard.notifications.tabs.post"), type: "post" },
    { id: "task", label: t("dashboard.notifications.tabs.task"), type: "task" },
    { id: "system", label: t("dashboard.notifications.tabs.system"), type: "system" }
  ];

  return (
    <TabsList className="grid grid-cols-5 mb-4">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.id}
          value={tab.id}
          className={cn("flex items-center justify-center gap-1.5 relative")}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          {getUnreadCount(tab.type) > 0 && (
            <Badge
              variant="secondary"
              className={cn(
                "absolute -top-2 -right-1 h-4 min-w-4 p-0 flex items-center justify-center text-[10px] rtl:-left-1 rtl:-right-auto",
                tab.id === "all" ? "bg-beauty-pink text-white" : "bg-muted-foreground/20"
              )}
            >
              {getUnreadCount(tab.type)}
            </Badge>
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default NotificationTabs;
