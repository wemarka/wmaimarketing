
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
          
          {/* Navigation tabs - Enhanced Design */}
          <div className="flex justify-center md:justify-start">
            <Tabs 
              defaultValue={location.pathname.includes("/dashboard") ? "dashboard" : 
                          location.pathname.includes("/insights") ? "insights" : 
                          location.pathname.includes("/channels") ? "channels" : "dashboard"}
              dir="rtl"
              className="w-full"
            >
              <TabsList className="relative bg-[#2c6c7a]/20 backdrop-blur-sm rounded-xl p-1 h-12 border border-white/20 w-full justify-start">
                {mainNavItems.map((item) => {
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
          </div>
          
          {/* Dashboard sub-tabs - Enhanced Design */}
          {isDashboardRoute && (
            <div className="flex justify-center md:justify-start mt-2">
              <Tabs 
                defaultValue={activeTab}
                dir="rtl"
                className="w-full"
                onValueChange={handleTabClick}
              >
                <TabsList className="bg-[#2c6c7a]/10 rounded-xl p-1 h-10 w-full justify-start border-none overflow-x-auto">
                  {dashboardTabItems.map((item) => {
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
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
