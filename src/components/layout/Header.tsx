
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LayoutGrid, BarChart, PieChart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

import HeaderTitle from "./header/HeaderTitle";
import HeaderActions from "./header/HeaderActions";
import MainNavTabs from "./header/MainNavTabs";
import DashboardSubTabs from "./header/DashboardSubTabs";

const Header: React.FC = () => {
  const location = useLocation();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mounted, setMounted] = useState(false);
  
  // Animation on mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Function to get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "لوحة التحكم";
    if (path.includes("notification")) return "الإشعارات";
    if (path.includes("search")) return "البحث";
    if (path.includes("content")) return "المحتوى";
    if (path.includes("documentation")) return "التوثيق";
    if (path.includes("video")) return "الوسائط";
    if (path.includes("scheduler")) return "التطبيقات";
    if (path.includes("profile")) return "الملف الشخصي";
    if (path.includes("insights")) return "الإحصائيات";
    if (path.includes("channels")) return "القنوات";
    return "Circle";
  };

  // Main navigation items with icons
  const mainNavItems = [
    { id: "dashboard", title: "لوحة التحكم", path: "/dashboard", icon: <LayoutGrid className="h-4 w-4" /> },
    { id: "insights", title: "الإحصائيات", path: "/insights", icon: <BarChart className="h-4 w-4" /> },
    { id: "channels", title: "القنوات", path: "/channels", icon: <PieChart className="h-4 w-4" /> }
  ];
  
  // Dashboard tab items that show when on dashboard page
  const dashboardTabItems = [
    { id: "dashboard", label: "لوحة التحكم", icon: <LayoutGrid className="h-4 w-4" /> },
    { id: "performance", label: "الأداء", icon: <BarChart className="h-4 w-4" /> },
    { id: "analytics", label: "التحليلات", icon: <PieChart className="h-4 w-4" /> }
  ];

  // Team members for avatar display
  const teamMembers = [
    { name: "أحمد خالد", avatar: null, initials: "أخ" },
    { name: "سارة محمد", avatar: null, initials: "سم" },
    { name: "فيصل علي", avatar: null, initials: "فع" }
  ];
  
  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.dispatchEvent(new CustomEvent('header-tab-change', { 
      detail: { tab: tabId } 
    }));
  };

  // Check if current route is dashboard
  const isDashboardRoute = location.pathname.includes("dashboard");

  return (
    <motion.div 
      className="flex flex-col"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header className="bg-gradient-to-r from-[#3a7a89] to-[#4a8a99] px-6 py-4 text-white shadow-lg">
        <div className="flex flex-col space-y-3">
          {/* Top row with logo, title and actions */}
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Left side - Title */}
            <HeaderTitle getPageTitle={getPageTitle} />
            
            {/* Right actions - Search, Notifications, Team */}
            <HeaderActions teamMembers={teamMembers} />
          </motion.div>
          
          {/* Main Navigation tabs with improved styling */}
          <motion.div 
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <MainNavTabs navItems={mainNavItems} />
          </motion.div>
          
          {/* Dashboard sub-tabs with improved styling - only shown on dashboard route */}
          <AnimatePresence>
            {isDashboardRoute && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardSubTabs 
                  tabItems={dashboardTabItems}
                  activeTab={activeTab}
                  onTabChange={handleTabClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </motion.div>
  );
};

export default Header;
