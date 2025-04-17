
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationTabsProps } from "@/components/dashboard/notifications/types";

const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onTabChange,
  getUnreadCount
}) => {
  return (
    <div className="border-b">
      <TabsList className="w-full grid grid-cols-4 h-11 bg-transparent">
        <TabsTrigger 
          value="all" 
          className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none"
          onClick={() => onTabChange("all")}
        >
          الكل
        </TabsTrigger>
        <TabsTrigger 
          value="unread" 
          className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none"
          onClick={() => onTabChange("unread")}
        >
          غير مقروء
        </TabsTrigger>
        <TabsTrigger 
          value="marketing" 
          className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none"
          onClick={() => onTabChange("marketing")}
        >
          تسويق
        </TabsTrigger>
        <TabsTrigger 
          value="comment" 
          className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none"
          onClick={() => onTabChange("comment")}
        >
          تعليقات
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default NotificationTabs;
