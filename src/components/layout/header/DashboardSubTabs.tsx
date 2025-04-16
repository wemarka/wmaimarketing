
import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

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
        <TabsList className="bg-[#2c6c7a]/5 dark:bg-[#2c6c7a]/20 rounded-xl p-1 h-10 w-full justify-start border-none overflow-x-auto">
          {tabItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <TabsTrigger 
                key={item.id}
                value={item.id}
                className={cn(
                  "px-4 relative group transition-all duration-300 min-w-max",
                  "data-[state=active]:text-[#3a7a89] dark:data-[state=active]:text-white",
                  "data-[state=active]:font-medium",
                  "text-gray-500 dark:text-gray-400",
                  "hover:text-[#3a7a89] dark:hover:text-white/90"
                )}
              >
                <div className="flex items-center z-10 relative">
                  <motion.span 
                    whileHover={{ rotate: isActive ? 0 : 10, scale: 1.1 }} 
                    initial={false}
                    className={cn(
                      "mr-2",
                      isActive ? "text-[#3a7a89] dark:text-white" : "text-gray-500"
                    )}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.label}</span>
                </div>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeSubTab"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DashboardSubTabs;
