import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BarChart, Bell, LayoutGrid, PieChart, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import HeaderTitle from "./header/HeaderTitle";
import MainNavTabs from "./header/MainNavTabs";
import DashboardSubTabs from "./header/DashboardSubTabs";
import SearchBar from "./header/SearchBar";

const Header: React.FC = () => {
  const location = useLocation();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState("dashboard");
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const isDashboardRoute = location.pathname.includes("dashboard");
  const isInsightsRoute = location.pathname.includes("insights");
  const isChannelsRoute = location.pathname.includes("channels");

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

  const handleSubTabClick = (tabId: string) => {
    setActiveSubTab(tabId);
    
    const eventDetail = {
      detail: {
        subtab: tabId
      }
    };
    window.dispatchEvent(new CustomEvent('sub-tab-change', eventDetail));
  };

  const getCurrentSubTabs = () => {
    if (isDashboardRoute) return dashboardTabItems;
    if (isInsightsRoute) return insightsTabItems;
    if (isChannelsRoute) return channelsTabItems;
    return [];
  };

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
          <motion.div className="flex items-center justify-between" {...topRowAnimation}>
            <HeaderTitle getPageTitle={getPageTitle} />
            <div className="flex items-center gap-4">
              <SearchBar />
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
          <motion.div className="flex justify-center md:justify-start" {...tabsAnimation}>
            <MainNavTabs navItems={mainNavItems} />
          </motion.div>
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
