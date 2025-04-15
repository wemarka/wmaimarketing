
import React from "react";
import { useTranslation } from "react-i18next";
import { useRBACSidebar } from "@/modules/dashboard/utils/sidebarItems";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  BarChart2,
  PackageSearch,
  Users,
  Settings,
  Sparkles,
  Layers,
  Image,
  BookOpen,
  Code,
  Megaphone,
  Palette
} from "lucide-react";

export const useNavigationItems = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  
  // Get user role from the auth context, default to 'user' if not available
  const userRole = profile?.role || 'user';
  
  console.log("useNavigationItems - Current user role:", userRole);
  
  // Get role-based navigation items
  const {
    dashboardItems: rawDashboardItems,
    contentItems: rawContentItems,
    schedulingItems: rawSchedulingItems,
    analyticsItems: rawAnalyticsItems,
    productItems: rawProductItems,
    managementItems: rawManagementItems,
    documentationItems: rawDocumentationItems
  } = useRBACSidebar(userRole);
  
  // Enhance dashboard items with icons and additional metadata
  const dashboardItems = rawDashboardItems.map(item => ({
    ...item,
    icon: <LayoutDashboard className="h-5 w-5" />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
  }));
  
  // Enhance content items
  const contentItems = rawContentItems.map(item => ({
    ...item,
    icon: item.id.includes('asset') ? <Image className="h-5 w-5" /> :
          item.id.includes('ai') ? <Sparkles className="h-5 w-5" /> :
          <FileText className="h-5 w-5" />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
  }));
  
  // Enhance scheduling items
  const schedulingItems = rawSchedulingItems.map(item => ({
    ...item,
    icon: <Calendar className="h-5 w-5" />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
  }));
  
  // Enhance analytics items
  const analyticsItems = rawAnalyticsItems.map(item => ({
    ...item,
    icon: item.id.includes('campaign') ? <Megaphone className="h-5 w-5" /> :
          item.id.includes('content') ? <Layers className="h-5 w-5" /> :
          <BarChart2 className="h-5 w-5" />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
    badgeText: item.id.includes('dashboard') ? t('sidebar.badges.new') : undefined,
    badgeVariant: 'default',
  }));
  
  // Enhance product items
  const productItems = rawProductItems.map(item => ({
    ...item,
    icon: <PackageSearch className="h-5 w-5" />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
  }));
  
  // Enhance management items
  const managementItems = rawManagementItems.map(item => ({
    ...item,
    icon: item.id.includes('settings') ? <Settings className="h-5 w-5" /> :
          item.id.includes('users') ? <Users className="h-5 w-5" /> :
          item.id.includes('designer') ? <Palette className="h-5 w-5" /> :
          <Settings className="h-5 w-5" />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
    badgeText: userRole === 'admin' && item.id.includes('users') ? t('sidebar.badges.admin') : undefined,
    badgeVariant: 'destructive',
  }));
  
  // Enhance documentation items
  const documentationItems = rawDocumentationItems.map(item => ({
    ...item,
    icon: item.id.includes('api') ? <Code className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
  }));
  
  // Combine the content and scheduling items into mediaNavItems
  const mediaNavItems = [...contentItems, ...schedulingItems, ...analyticsItems];
  
  return {
    mainNavItems: dashboardItems,
    mediaNavItems,
    productItems,
    managementItems,
    documentationItems
  };
};
