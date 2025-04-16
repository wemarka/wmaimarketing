
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { LayoutGrid, BarChart, PieChart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import HeaderTitle from "./header/HeaderTitle";
import HeaderActions from "./header/HeaderActions";
import MainNavTabs from "./header/MainNavTabs";
import DashboardSubTabs from "./header/DashboardSubTabs";

const Header: React.FC = () => {
  const location = useLocation();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
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
    { id: "dashboard", title: "لوحة التحكم", path: "/dashboard", icon: <LayoutGrid className="h-4 w-4 ml-2" /> },
    { id: "insights", title: "الإحصائيات", path: "/insights", icon: <BarChart className="h-4 w-4 ml-2" /> },
    { id: "channels", title: "القنوات", path: "/channels", icon: <PieChart className="h-4 w-4 ml-2" /> }
  ];
  
  // Dashboard tab items that show when on dashboard page
  const dashboardTabItems = [
    { id: "dashboard", label: "لوحة التحكم", icon: <LayoutGrid className="h-4 w-4 ml-2" /> },
    { id: "performance", label: "الأداء", icon: <BarChart className="h-4 w-4 ml-2" /> },
    { id: "analytics", label: "التحليلات", icon: <PieChart className="h-4 w-4 ml-2" /> }
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
    <div className="flex flex-col">
      <header className="bg-gradient-to-r from-[#3a7a89] to-[#4a8a99] px-6 py-4 text-white shadow-md">
        <div className="flex flex-col space-y-3">
          {/* Top row with logo, title and actions */}
          <div className="flex items-center justify-between">
            {/* Left side - Title */}
            <HeaderTitle getPageTitle={getPageTitle} />
            
            {/* Right actions - Search, Notifications, Team */}
            <HeaderActions teamMembers={teamMembers} />
          </div>
          
          {/* Main Navigation tabs */}
          <div className="flex justify-center md:justify-start">
            <MainNavTabs navItems={mainNavItems} />
          </div>
          
          {/* Dashboard sub-tabs - only shown on dashboard route */}
          {isDashboardRoute && (
            <DashboardSubTabs 
              tabItems={dashboardTabItems}
              activeTab={activeTab}
              onTabChange={handleTabClick}
            />
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
