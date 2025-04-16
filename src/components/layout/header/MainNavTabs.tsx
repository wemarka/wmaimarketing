
import React from "react";
import { useLocation } from "react-router-dom";
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

const MainNavTabs: React.FC<MainNavTabsProps> = ({ navItems }) => {
  const location = useLocation();

  return (
    <Tabs 
      defaultValue={location.pathname.includes("/dashboard") ? "dashboard" : 
                  location.pathname.includes("/insights") ? "insights" : 
                  location.pathname.includes("/channels") ? "channels" : "dashboard"}
      dir="rtl"
      className="w-full"
    >
      <TabsList className="relative bg-[#2c6c7a]/20 backdrop-blur-sm rounded-xl p-1 h-12 border border-white/20 w-full justify-start">
        {navItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <TabsTrigger 
              key={item.id}
              value={item.id}
              className={cn(
                "px-6 relative group transition-all duration-300",
                "data-[state=active]:text-white data-[state=active]:font-medium text-white/80",
                "hover:text-white"
              )}
              onClick={() => {
                if (item.path) {
                  if (location.pathname !== item.path) {
                    window.location.href = item.path;
                  }
                }
              }}
            >
              <div className="flex items-center z-10 relative">
                {item.icon}
                {item.title}
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-white/20 rounded-lg shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default MainNavTabs;
