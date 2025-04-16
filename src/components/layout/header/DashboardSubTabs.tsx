
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
    <div className="flex justify-center md:justify-start mt-4">
      <Tabs 
        defaultValue={activeTab}
        dir="rtl"
        className="w-full"
        onValueChange={onTabChange}
        value={activeTab}
      >
        <TabsList className="bg-white/10 dark:bg-[#2c6c7a]/20 rounded-xl p-1 h-11 w-full max-w-md justify-start border-none overflow-x-auto">
          {tabItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <TabsTrigger 
                key={item.id}
                value={item.id}
                className={cn(
                  "px-5 relative group transition-all duration-300 min-w-[120px]",
                  "data-[state=active]:text-[#3a7a89] dark:data-[state=active]:text-white",
                  "data-[state=active]:font-semibold",
                  "text-gray-100/90 dark:text-gray-200/80",
                  "hover:text-white dark:hover:text-white",
                  "mx-0.5"
                )}
              >
                <div className="flex items-center gap-2 z-10 relative">
                  <motion.span 
                    whileHover={{ rotate: isActive ? 0 : 10, scale: 1.15 }} 
                    whileTap={{ scale: 0.95 }}
                    initial={false}
                    className={cn(
                      isActive ? "text-[#3a7a89] dark:text-white" : "text-white/80"
                    )}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.label}</span>
                </div>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeSubTab"
                    className="absolute inset-0 bg-white dark:bg-slate-800/80 rounded-lg shadow-md"
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
