
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NotificationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="border-b">
      <TabsList className="w-full grid grid-cols-4 h-11 bg-transparent">
        <TabsTrigger 
          value="all" 
          className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none"
        >
          الكل
        </TabsTrigger>
        <TabsTrigger 
          value="unread" 
          className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none"
        >
          غير مقروء
        </TabsTrigger>
        <TabsTrigger 
          value="marketing" 
          className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none"
        >
          تسويق
        </TabsTrigger>
        <TabsTrigger 
          value="comment" 
          className="text-xs py-1.5 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-beauty-purple rounded-none"
        >
          تعليقات
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default NotificationTabs;
