
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
    <Tabs value={activeTab} className="w-full max-w-md mx-auto md:mx-0">
      <TabsList className="bg-[#2c6c7a]/20 rounded-xl p-1 h-12 w-full md:w-auto overflow-x-auto">
        {navItems.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            asChild
            className={cn(
              "text-white/80 hover:text-white relative min-w-[100px] whitespace-nowrap",
              "data-[state=active]:text-white font-medium transition-all duration-300"
            )}
          >
            <Link
              to={item.path}
              className="flex items-center gap-3 justify-center px-6 py-1.5 rounded-lg"
            >
              <motion.span
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.icon}
              </motion.span>
              <span className="font-medium">{item.title}</span>
              
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeMainTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#2c6c7a]/70 to-[#3a7a89]/70 rounded-lg shadow-lg -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default MainNavTabs;
