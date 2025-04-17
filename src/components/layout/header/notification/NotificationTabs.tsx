
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface NotificationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  getUnreadCount: (type: string | undefined) => number;
}

const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onTabChange,
  getUnreadCount
}) => {
  return (
    <TabsList className="grid grid-cols-4 p-1 bg-transparent">
      <TabsTrigger 
        value="all" 
        className="flex items-center justify-center relative"
        data-state={activeTab === "all" ? "active" : ""}
      >
        <Bell className="h-4 w-4" />
        <span className="sr-only">الكل</span>
        {getUnreadCount("all") > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]" 
            variant="destructive"
          >
            {getUnreadCount("all")}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="alerts" 
        className="flex items-center justify-center relative"
        data-state={activeTab === "alerts" ? "active" : ""}
      >
        <AlertTriangle className="h-4 w-4" />
        <span className="sr-only">تنبيهات</span>
        {getUnreadCount("alerts") > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]" 
            variant="destructive"
          >
            {getUnreadCount("alerts")}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="updates" 
        className="flex items-center justify-center relative"
        data-state={activeTab === "updates" ? "active" : ""}
      >
        <Info className="h-4 w-4" />
        <span className="sr-only">تحديثات</span>
        {getUnreadCount("updates") > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]" 
            variant="destructive"
          >
            {getUnreadCount("updates")}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="unread" 
        className="flex items-center justify-center relative"
        data-state={activeTab === "unread" ? "active" : ""}
      >
        <CheckCircle className="h-4 w-4" />
        <span className="sr-only">غير مقروءة</span>
        {getUnreadCount("unread") > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]" 
            variant="destructive"
          >
            {getUnreadCount("unread")}
          </Badge>
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default NotificationTabs;
