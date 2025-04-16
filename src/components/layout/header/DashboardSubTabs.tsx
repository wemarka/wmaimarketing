
import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardSubTabsProps {
  tabItems: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const DashboardSubTabs: React.FC<DashboardSubTabsProps> = ({ 
  tabItems, 
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex justify-center md:justify-start mt-2">
      <Tabs 
        defaultValue={activeTab}
        dir="rtl"
        className="w-full"
        onValueChange={onTabChange}
      >
        <TabsList className="bg-[#2c6c7a]/10 rounded-xl p-1 h-10 w-full justify-start border-none overflow-x-auto">
          {tabItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <TabsTrigger 
                key={item.id}
                value={item.id}
                className={cn(
                  "px-4 relative group transition-all duration-300 min-w-max",
                  "data-[state=active]:text-[#3a7a89] data-[state=active]:font-medium",
                  "text-gray-500 dark:text-gray-400",
                  "data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800",
                  "rounded-lg"
                )}
              >
                <div className="flex items-center z-10 relative">
                  {item.icon}
                  {item.label}
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DashboardSubTabs;
