
import React from "react";
import { 
  LayoutDashboard, 
  Upload, 
  Image, 
  FileText, 
  Video, 
  CalendarDays, 
  BarChart,
  FileQuestion,
  User,
  Users,
  Database,
  Sparkles 
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const useNavigationItems = () => {
  const { t } = useTranslation();
  
  const mainNavItems = [
    { 
      id: 'dashboard', 
      to: "/dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: t("sidebar.navigation.dashboard"), 
      tooltip: t("sidebar.tooltip.dashboard") 
    },
    { 
      id: 'image-upload', 
      to: "/image-upload", 
      icon: <Upload className="h-5 w-5" />, 
      label: t("sidebar.navigation.imageAnalysis"), 
      tooltip: t("sidebar.tooltip.imageAnalysis") 
    },
    { 
      id: 'ad-generator', 
      to: "/ad-generator", 
      icon: <Image className="h-5 w-5" />, 
      label: t("sidebar.navigation.adGenerator"), 
      tooltip: t("sidebar.tooltip.adGenerator") 
    },
    { 
      id: 'content-creator', 
      to: "/content-creator", 
      icon: <FileText className="h-5 w-5" />, 
      label: t("sidebar.navigation.contentCreator"), 
      tooltip: t("sidebar.tooltip.contentCreator")
    },
  ];

  const mediaNavItems = [
    { 
      id: 'video-generator', 
      to: "/video-generator", 
      icon: <Video className="h-5 w-5" />, 
      label: t("sidebar.navigation.videoGenerator"), 
      tooltip: t("sidebar.tooltip.videoGenerator") 
    },
    { 
      id: 'scheduler', 
      to: "/scheduler", 
      icon: <CalendarDays className="h-5 w-5" />, 
      label: t("sidebar.navigation.scheduler"), 
      tooltip: t("sidebar.tooltip.scheduler") 
    },
    { 
      id: 'analytics', 
      to: "/analytics", 
      icon: <BarChart className="h-5 w-5" />, 
      label: t("sidebar.navigation.analytics"), 
      tooltip: t("sidebar.tooltip.analytics") 
    },
  ];

  const managementNavItems = [
    { 
      id: 'profile', 
      to: "/profile", 
      icon: <User className="h-5 w-5" />, 
      label: t("sidebar.navigation.profile"), 
      tooltip: t("sidebar.tooltip.profile") 
    },
    { 
      id: 'users', 
      to: "/users", 
      icon: <Users className="h-5 w-5" />, 
      label: t("sidebar.navigation.userManagement"), 
      tooltip: t("sidebar.tooltip.userManagement") 
    },
    { 
      id: 'integration', 
      to: "/integration", 
      icon: <Database className="h-5 w-5" />, 
      label: t("sidebar.navigation.integrations"), 
      tooltip: t("sidebar.tooltip.integrations") 
    },
  ];

  const documentationItems = [
    { 
      id: 'documentation', 
      to: "/documentation", 
      icon: <FileQuestion className="h-5 w-5" />, 
      label: t("sidebar.navigation.projectPlan"), 
      tooltip: t("sidebar.tooltip.projectPlan") 
    },
    { 
      id: 'ai-studio', 
      to: "/ai-studio", 
      icon: <Sparkles className="h-5 w-5 text-beauty-gold" />, 
      label: t("sidebar.navigation.aiStudio"), 
      tooltip: t("sidebar.tooltip.aiStudio"),
      variant: "outline" as const,
      className: "bg-beauty-purple/5 border border-beauty-purple/20",
      badgeText: t("sidebar.badge.new")
    },
  ];

  return {
    mainNavItems,
    mediaNavItems,
    managementNavItems,
    documentationItems
  };
};
