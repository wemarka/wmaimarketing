
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LayoutGrid, BarChart, PieChart, Search, Bell, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import HeaderTitle from "./header/HeaderTitle";
import HeaderActions from "./header/HeaderActions";
import MainNavTabs from "./header/MainNavTabs";
import DashboardSubTabs from "./header/DashboardSubTabs";

const Header: React.FC = () => {
  const location = useLocation();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState("dashboard");
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

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
  const mainNavItems = [{
    id: "dashboard",
    title: "لوحة التحكم",
    path: "/dashboard",
    icon: <LayoutGrid className="h-4 w-4" />
  }, {
    id: "insights",
    title: "الإحصائيات",
    path: "/insights",
    icon: <BarChart className="h-4 w-4" />
  }, {
    id: "channels",
    title: "القنوات",
    path: "/channels",
    icon: <PieChart className="h-4 w-4" />
  }];

  // Dashboard tab items that show when on dashboard page
  const dashboardTabItems = [{
    id: "dashboard",
    label: "النظرة العامة",
    icon: <LayoutGrid className="h-4 w-4" />
  }, {
    id: "performance",
    label: "الأداء",
    icon: <BarChart className="h-4 w-4" />
  }, {
    id: "analytics",
    label: "التحليلات",
    icon: <PieChart className="h-4 w-4" />
  }, {
    id: "content",
    label: "المحتوى",
    icon: <PieChart className="h-4 w-4" />
  }];

  // Check if current route is dashboard
  const isDashboardRoute = location.pathname.includes("dashboard");
  // Check if current route is insights
  const isInsightsRoute = location.pathname.includes("insights");
  // Check if current route is channels
  const isChannelsRoute = location.pathname.includes("channels");
  
  // Insights tab items
  const insightsTabItems = [{
    id: "overview",
    label: "النظرة العامة",
    icon: <LayoutGrid className="h-4 w-4" />
  }, {
    id: "performance",
    label: "الأداء",
    icon: <BarChart className="h-4 w-4" />
  }, {
    id: "campaigns",
    label: "الحملات",
    icon: <PieChart className="h-4 w-4" />
  }];
  
  // Channels tab items
  const channelsTabItems = [{
    id: "all",
    label: "جميع القنوات",
    icon: <LayoutGrid className="h-4 w-4" />
  }, {
    id: "social",
    label: "التواصل الاجتماعي",
    icon: <BarChart className="h-4 w-4" />
  }, {
    id: "email",
    label: "البريد الإلكتروني",
    icon: <PieChart className="h-4 w-4" />
  }];

  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);

    // Dispatch both events together for better synchronization
    const eventDetail = {
      detail: {
        tab: tabId
      }
    };
    window.dispatchEvent(new CustomEvent('dashboard-tab-change', eventDetail));
    window.dispatchEvent(new CustomEvent('header-tab-change', eventDetail));
  };

  // Handle sub-tab click
  const handleSubTabClick = (tabId: string) => {
    setActiveSubTab(tabId);
    
    // Dispatch event for sub-tab change
    const eventDetail = {
      detail: {
        subtab: tabId
      }
    };
    window.dispatchEvent(new CustomEvent('sub-tab-change', eventDetail));
  };

  // Get current sub-tabs based on the active main tab
  const getCurrentSubTabs = () => {
    if (isDashboardRoute) return dashboardTabItems;
    if (isInsightsRoute) return insightsTabItems;
    if (isChannelsRoute) return channelsTabItems;
    return [];
  };

  // RTL-aware animations
  const topRowAnimation = {
    initial: {
      opacity: 0,
      y: isRTL ? 10 : -10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.4,
      delay: 0.2,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  };
  
  const tabsAnimation = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.4,
      delay: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  };
  
  const subtabsAnimation = {
    initial: {
      opacity: 0,
      height: 0
    },
    animate: {
      opacity: 1,
      height: 'auto'
    },
    exit: {
      opacity: 0,
      height: 0
    },
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  };
  
  const userInitials = profile?.first_name && profile?.last_name ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}` : "??";
  
  return (
    <motion.div 
      className="flex flex-col" 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
    >
      <header className="bg-gradient-to-r from-[#3a7a89] via-[#4a8a99] to-[#5a9aa9] px-6 py-4 text-white shadow-lg" dir={isRTL ? "rtl" : "ltr"}>
        <div className="flex flex-col space-y-4">
          {/* Top row with logo, title and actions */}
          <motion.div className="flex items-center justify-between" {...topRowAnimation}>
            {/* Left side - Title */}
            <HeaderTitle getPageTitle={getPageTitle} />
            
            {/* Right actions - Search, Notifications, Team */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Input 
                  type="search" 
                  placeholder="بحث..." 
                  className="h-9 w-[200px] rounded-full bg-white/15 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/30 pr-9" 
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
              </div>
              
              <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 bg-white/15 hover:bg-white/25">
                <Bell className="h-4.5 w-4.5" />
              </Button>
              
              <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 bg-white/15 hover:bg-white/25">
                <Settings className="h-4.5 w-4.5" />
              </Button>
              
              <Avatar className="h-9 w-9 border-2 border-white/20">
                {profile?.avatar_url ? 
                  <AvatarImage src={profile.avatar_url} alt="صورة المستخدم" /> 
                  : 
                  <AvatarFallback className="bg-[#4a8a99] text-white">
                    {userInitials}
                  </AvatarFallback>
                }
              </Avatar>
            </div>
          </motion.div>
          
          {/* Main Navigation tabs with improved styling */}
          <motion.div className="flex justify-center md:justify-start" {...tabsAnimation}>
            <MainNavTabs navItems={mainNavItems} />
          </motion.div>
          
          {/* Sub-tabs section - shows dynamically based on the current route */}
          <AnimatePresence mode="wait">
            {(isDashboardRoute || isInsightsRoute || isChannelsRoute) && (
              <motion.div 
                key={location.pathname}
                className="pt-1"
                {...subtabsAnimation}
              >
                <DashboardSubTabs 
                  tabItems={getCurrentSubTabs()}
                  activeTab={activeSubTab}
                  onTabChange={handleSubTabClick}
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
