
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
    <Tabs value={activeTab} className="w-full max-w-md mx-auto md:mx-0" dir="rtl">
      <TabsList className="bg-white/10 dark:bg-[#2c6c7a]/20 rounded-xl p-1 h-11 w-full justify-start border-none overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <TabsTrigger 
              key={item.id}
              value={item.id}
              asChild
              className={cn(
                "px-5 relative group transition-all duration-300",
                "data-[state=active]:text-[#3a7a89] dark:data-[state=active]:text-white",
                "data-[state=active]:font-semibold",
                "text-gray-100/90 dark:text-gray-200/80",
                "hover:text-white dark:hover:text-white",
                "mx-0.5"
              )}
            >
              <Link to={item.path} className="flex items-center gap-2 z-10 relative">
                <motion.span 
                  whileHover={{ scale: 1.15 }} 
                  whileTap={{ scale: 0.95 }}
                  initial={false}
                  className={cn(
                    isActive ? "text-[#3a7a89] dark:text-white" : "text-white/80"
                  )}
                >
                  {item.icon}
                </motion.span>
                <span>{item.title}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white dark:bg-slate-800/80 rounded-lg shadow-md -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default MainNavTabs;
