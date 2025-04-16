
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart, LayoutGrid, PieChart } from "lucide-react";

export const useHeaderNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState("dashboard");

  // Set initial active tab based on current route
  useEffect(() => {
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

  const isDashboardRoute = location.pathname.includes("dashboard");
  const isInsightsRoute = location.pathname.includes("insights");
  const isChannelsRoute = location.pathname.includes("channels");

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

  return {
    activeTab,
    activeSubTab,
    handleTabChange,
    handleSubTabClick,
    getPageTitle,
    getCurrentSubTabs,
    mainNavItems
  };
};
