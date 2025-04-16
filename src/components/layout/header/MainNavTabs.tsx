
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface MainNavTabsProps {
  navItems: NavItem[];
}

const MainNavTabs: React.FC<MainNavTabsProps> = ({
  navItems
}) => {
  const location = useLocation();
  
  // Determine active tab based on current route
  const activeTab = location.pathname.includes("/dashboard")
    ? "dashboard"
    : location.pathname.includes("/insights")
      ? "insights"
      : location.pathname.includes("/channels")
        ? "channels"
        : "dashboard";

  return (
    <Tabs 
      defaultValue={activeTab} 
      dir="rtl" 
      className="w-full"
    >
      <TabsList className="bg-white/10 dark:bg-[#2c6c7a]/30 rounded-xl p-1 h-10 w-full md:w-auto justify-start border-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <Link to={item.path} key={item.id}>
              <TabsTrigger 
                value={item.id}
                className={cn(
                  "px-4 relative group transition-all duration-300",
                  "data-[state=active]:text-white dark:data-[state=active]:text-white",
                  "data-[state=active]:font-medium",
                  "text-white/70 dark:text-white/70"
                )}
              >
                <div className="flex items-center z-10 relative">
                  <motion.span 
                    className="mr-2"
                    whileHover={{ rotate: isActive ? 0 : 10, scale: 1.1 }} 
                    initial={false}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.title}</span>
                </div>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeMainTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#3a7a89]/80 to-[#4a8a99]/80 rounded-lg shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </TabsTrigger>
            </Link>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default MainNavTabs;
