
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
  Image,
  BookOpen,
  Code,
  Megaphone,
  Palette,
  Package,
  PackagePlus,
  ShoppingCart,
  Video,
  FileImage
} from "lucide-react";
import { CompareIcon } from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

export const useNavigationItems = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  
  // Get user role from the auth context, default to 'user' if not available
  const userRole = profile?.role || 'user';
  
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
    icon: item.id.includes('asset') ? <FileImage className="h-5 w-5" /> :
          item.id.includes('ai') ? <Sparkles className="h-5 w-5 text-beauty-gold" /> :
          item.id.includes('video') ? <Video className="h-5 w-5 text-red-500" /> :
          <FileText className="h-5 w-5" />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
    badgeText: item.id.includes('ai') ? t('sidebar.badges.ai') : undefined,
    badgeVariant: item.id.includes('ai') ? 'outline' : undefined,
  }));
  
  // Enhance scheduling items
  const schedulingItems = rawSchedulingItems.map(item => ({
    ...item,
    icon: <Calendar className={cn("h-5 w-5", item.id === 'schedule-post' && "text-beauty-pink")} />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
  }));
  
  // Enhance analytics items
  const analyticsItems = rawAnalyticsItems.map(item => ({
    ...item,
    icon: item.id.includes('campaign') ? <Megaphone className="h-5 w-5" /> :
          item.id.includes('content') ? <CompareIcon className="h-5 w-5" /> :
          <BarChart2 className="h-5 w-5" />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
    badgeText: item.id.includes('dashboard') ? t('sidebar.badges.new') : undefined,
    badgeVariant: 'default',
  }));
  
  // Enhance product items with more specific icons
  const productItems = rawProductItems.map(item => ({
    ...item,
    icon: item.id.includes('add') ? <PackagePlus className="h-5 w-5 text-green-500" /> :
          item.id.includes('list') ? <Package className="h-5 w-5" /> :
          item.id.includes('orders') ? <ShoppingCart className="h-5 w-5" /> :
          <PackageSearch className="h-5 w-5" />,
    tooltip: t(`sidebar.tooltips.${item.id}`, item.label),
    badgeText: item.id === 'product-add' && window.location.pathname.includes('/product/add') ? t('sidebar.badges.current') : undefined,
    badgeVariant: item.id === 'product-add' && window.location.pathname.includes('/product/add') ? 'outline' : undefined,
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
