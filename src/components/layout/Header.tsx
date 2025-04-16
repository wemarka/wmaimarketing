import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, BarChart, LayoutGrid, PieChart, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import HeaderTitle from "./header/HeaderTitle";
import SearchBar from "./header/SearchBar";
import DynamicNavigationMenu from "./header/DynamicNavigationMenu";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState("dashboard");
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  useEffect(() => {
    setMounted(true);
    
    // Set initial active tab based on current route
    if (location.pathname.includes("dashboard")) setActiveTab("dashboard");
    else if (location.pathname.includes("insights")) setActiveTab("insights");
    else if (location.pathname.includes("channels")) setActiveTab("channels");
    
  }, [location.pathname]);

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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    
    // Map tab IDs to their respective routes if needed
    if (tabId === "dashboard" && !location.pathname.includes("dashboard")) {
      navigate("/dashboard");
    } else if (tabId === "insights" && !location.pathname.includes("insights")) {
      navigate("/insights");
    } else if (tabId === "channels" && !location.pathname.includes("channels")) {
      navigate("/channels");
    }
  };

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

  const navigationAnimation = {
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

  const userInitials = profile?.first_name && profile?.last_name ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}` : "??";

  return (
    <motion.div 
      className="flex flex-col sticky top-0 z-40" 
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

          <motion.div {...navigationAnimation}>
            <DynamicNavigationMenu 
              mainNavItems={mainNavItems}
              currentSubTabs={getCurrentSubTabs()}
              activeTab={activeTab}
              activeSubTab={activeSubTab}
              onTabChange={handleTabChange}
              onSubTabChange={handleSubTabClick}
              isRTL={isRTL}
            />
          </motion.div>
        </div>
      </header>
    </motion.div>
  );
};

export default Header;
