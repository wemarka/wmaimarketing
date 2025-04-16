
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Bell, Search, LayoutGrid, BarChart, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            {/* Left side */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="#" className="flex items-center hover:bg-white/10 p-2 rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5 ml-2" />
                <span className="text-sm">رجوع</span>
              </Link>
              
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-xl font-medium mr-4"
              >
                {getPageTitle()}
              </motion.h2>
            </div>
            
            {/* Right actions */}
            <motion.div 
              className="flex items-center space-x-4 space-x-reverse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {/* Actions */}
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <div className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px]">
                    3
                  </span>
                </div>
              </Button>
              
              {/* Team members */}
              <div className="flex items-center -space-x-2 space-x-reverse mr-4">
                {teamMembers.map((member, idx) => (
                  <Avatar 
                    key={idx}
                    className="border-2 border-[#3a7a89] w-8 h-8 hover:transform hover:scale-110 transition-transform cursor-pointer"
                  >
                    <AvatarImage src={member.avatar || undefined} />
                    <AvatarFallback className="bg-white/20 text-white text-xs">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <span className="mr-4 text-xs font-medium">12 عضو</span>
              </div>
            </motion.div>
          </div>
          
          {/* Navigation tabs */}
          <div className="flex justify-center md:justify-start">
            <Tabs 
              defaultValue={location.pathname.includes("/dashboard") ? "dashboard" : 
                          location.pathname.includes("/insights") ? "insights" : 
                          location.pathname.includes("/channels") ? "channels" : "dashboard"}
              dir="rtl"
              className="w-full"
            >
              <TabsList className="bg-transparent h-10 border-b border-white/20 w-full justify-start">
                {mainNavItems.map((item) => (
                  <TabsTrigger 
                    key={item.id}
                    value={item.id}
                    className="data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none px-6 relative text-white/70 data-[state=active]:text-white"
                    onClick={() => {
                      if (item.path) {
                        if (location.pathname !== item.path) {
                          window.location.href = item.path;
                        }
                      }
                    }}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      {item.title}
                    </div>
                    {location.pathname.includes(item.path) && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          {/* Dashboard sub-tabs */}
          {isDashboardRoute && (
            <div className="flex justify-center md:justify-start pt-1">
              <Tabs 
                defaultValue={activeTab}
                dir="rtl"
                className="w-full"
                onValueChange={handleTabClick}
              >
                <TabsList className="bg-[#3a7a89]/70 h-10 w-full justify-start">
                  {dashboardTabItems.map((item) => (
                    <TabsTrigger 
                      key={item.id}
                      value={item.id}
                      className="data-[state=active]:bg-white/10 rounded-md px-6 relative text-white/70 data-[state=active]:text-white"
                    >
                      <div className="flex items-center">
                        {item.icon}
                        {item.label}
                      </div>
                      {activeTab === item.id && (
                        <motion.div
                          layoutId="activeDashboardTab"
                          className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
