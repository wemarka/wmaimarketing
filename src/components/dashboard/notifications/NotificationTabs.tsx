
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { NotificationTabsProps } from "./types";
import { Bell, CheckCircle, MessageSquare, AlertCircle, Mail, Settings } from "lucide-react";
import { motion } from "framer-motion";

const NotificationTabs: React.FC<NotificationTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  getUnreadCount 
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  const tabItems = [
    {
      id: "all",
      label: t("dashboard.notifications.tabs.all"),
      icon: <Bell className="h-3.5 w-3.5" />,
      badgeColor: "bg-beauty-pink"
    },
    {
      id: "approval",
      label: t("dashboard.notifications.tabs.approval"),
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      badgeColor: "bg-amber-500"
    },
    {
      id: "post",
      label: t("dashboard.notifications.tabs.post"),
      icon: <MessageSquare className="h-3.5 w-3.5" />,
      badgeColor: "bg-blue-500"
    },
    {
      id: "task",
      label: t("dashboard.notifications.tabs.task"),
      icon: <AlertCircle className="h-3.5 w-3.5" />,
      badgeColor: "bg-green-500"
    },
    {
      id: "message",
      label: t("dashboard.notifications.tabs.message", "رسائل"),
      icon: <Mail className="h-3.5 w-3.5" />,
      badgeColor: "bg-purple-500"
    },
    {
      id: "system",
      label: t("dashboard.notifications.tabs.system"),
      icon: <Settings className="h-3.5 w-3.5" />,
      badgeColor: "bg-slate-500"
    }
  ];
  
  return (
    <TabsList className="grid grid-cols-6 mb-3 bg-background border border-muted rounded-lg p-1">
      {tabItems.map((tab) => (
        <TabsTrigger 
          key={tab.id}
          value={tab.id} 
          className="rounded-md data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple relative"
        >
          <div className="flex items-center gap-1">
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </div>
          {getUnreadCount(tab.id === "all" ? undefined : tab.id) > 0 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <Badge 
                variant="secondary" 
                className={`absolute top-0 right-0 translate-x-1 -translate-y-1 ${tab.badgeColor} text-white text-[10px] min-w-4 h-4 flex items-center justify-center p-0 rounded-full`}
              >
                {getUnreadCount(tab.id === "all" ? undefined : tab.id)}
              </Badge>
            </motion.div>
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default NotificationTabs;
