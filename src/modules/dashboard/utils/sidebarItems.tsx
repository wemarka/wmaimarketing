
import React from "react";
import {
  LayoutDashboard,
  BarChart,
  Image,
  FileText,
  Video,
  CalendarDays,
  Package2,
  Users,
  Settings,
  Sparkles,
  FileQuestion,
  MessageSquare,
  Database,
  PackagePlus,
  ShoppingCart
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  badgeText?: string;
  variant?: "default" | "outline";
  className?: string;
  roles?: string[]; // For role-based access control
}

export const useRBACSidebar = (userRole: string = 'user') => {
  const { t, i18n } = useTranslation();
  // Normalize the role to lowercase for case-insensitive comparison
  const normalizedUserRole = userRole.toLowerCase();

  // Define groups of navigation items with role-based access control
  const dashboardItems = [
    {
      id: 'dashboard',
      to: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: t("sidebar.navigation.dashboard"),
      tooltip: t("sidebar.tooltip.dashboard"),
      roles: ['admin', 'manager', 'marketing', 'designer', 'user']
    }
  ];

  const contentItems = [
    {
      id: 'image-upload',
      to: "/image-upload",
      icon: <Image className="h-5 w-5" />,
      label: t("sidebar.navigation.imageAnalysis"),
      tooltip: t("sidebar.tooltip.imageAnalysis"),
      roles: ['admin', 'manager', 'marketing', 'designer', 'user']
    },
    {
      id: 'ad-generator',
      to: "/ad-generator",
      icon: <Sparkles className="h-5 w-5" />,
      label: t("sidebar.navigation.adGenerator"),
      tooltip: t("sidebar.tooltip.adGenerator"),
      roles: ['admin', 'manager', 'marketing', 'designer']
    },
    {
      id: 'content-creator',
      to: "/content-creator",
      icon: <FileText className="h-5 w-5" />,
      label: t("sidebar.navigation.contentCreator"),
      tooltip: t("sidebar.tooltip.contentCreator"),
      roles: ['admin', 'manager', 'marketing', 'designer']
    },
    {
      id: 'video-generator',
      to: "/video-generator",
      icon: <Video className="h-5 w-5" />,
      label: t("sidebar.navigation.videoGenerator"),
      tooltip: t("sidebar.tooltip.videoGenerator"),
      roles: ['admin', 'manager', 'marketing', 'designer']
    }
  ];

  const schedulingItems = [
    {
      id: 'scheduler',
      to: "/scheduler",
      icon: <CalendarDays className="h-5 w-5" />,
      label: t("sidebar.navigation.scheduler"),
      tooltip: t("sidebar.tooltip.scheduler"),
      roles: ['admin', 'manager', 'marketing']
    },
    {
      id: 'schedule-post',
      to: "/schedule-post",
      icon: <MessageSquare className="h-5 w-5" />,
      label: t("sidebar.navigation.schedulePost", "Create Post"),
      tooltip: t("sidebar.tooltip.schedulePost", "Create a new post and publish it"),
      badgeText: t("sidebar.badge.new"),
      variant: "outline" as const,
      className: "bg-beauty-purple/5 border border-beauty-purple/20",
      roles: ['admin', 'manager', 'marketing']
    }
  ];

  const analyticsItems = [
    {
      id: 'analytics',
      to: "/analytics",
      icon: <BarChart className="h-5 w-5" />,
      label: t("sidebar.navigation.analytics"),
      tooltip: t("sidebar.tooltip.analytics"),
      roles: ['admin', 'manager', 'marketing']
    }
  ];

  // Enhanced product items with more options
  const productItems = [
    {
      id: 'product-list',
      to: "/product/list",
      icon: <Package2 className="h-5 w-5" />,
      label: t("sidebar.navigation.products", "المنتجات"),
      tooltip: t("sidebar.tooltip.products", "عرض وإدارة المنتجات"),
      roles: ['admin', 'manager', 'marketing']
    },
    {
      id: 'product-add',
      to: "/product/add",
      icon: <PackagePlus className="h-5 w-5" />,
      label: t("sidebar.navigation.addProduct", "إضافة منتج"),
      tooltip: t("sidebar.tooltip.addProduct", "إضافة منتج جديد"),
      roles: ['admin', 'manager']
    },
    {
      id: 'product-orders',
      to: "/product/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      label: t("sidebar.navigation.orders", "الطلبات"),
      tooltip: t("sidebar.tooltip.orders", "إدارة طلبات المنتجات"),
      roles: ['admin', 'manager']
    }
  ];

  const managementItems = [
    {
      id: 'users',
      to: "/users",
      icon: <Users className="h-5 w-5" />,
      label: t("sidebar.navigation.userManagement"),
      tooltip: t("sidebar.tooltip.userManagement"),
      roles: ['admin', 'manager']
    },
    {
      id: 'profile',
      to: "/profile",
      icon: <Settings className="h-5 w-5" />,
      label: t("sidebar.navigation.profile"),
      tooltip: t("sidebar.tooltip.profile"),
      roles: ['admin', 'manager', 'marketing', 'designer', 'user']
    },
    {
      id: 'integration',
      to: "/integration",
      icon: <Database className="h-5 w-5" />,
      label: t("sidebar.navigation.integrations"),
      tooltip: t("sidebar.tooltip.integrations"),
      roles: ['admin', 'manager']
    }
  ];

  const documentationItems = [
    {
      id: 'documentation',
      to: "/documentation",
      icon: <FileQuestion className="h-5 w-5" />,
      label: t("sidebar.navigation.projectPlan"),
      tooltip: t("sidebar.tooltip.projectPlan"),
      roles: ['admin', 'manager', 'marketing', 'designer', 'user']
    },
    {
      id: 'ai-studio',
      to: "/ai-studio",
      icon: <Sparkles className="h-5 w-5 text-beauty-gold" />,
      label: t("sidebar.navigation.aiStudio"),
      tooltip: t("sidebar.tooltip.aiStudio"),
      variant: "outline" as const,
      className: "bg-beauty-purple/5 border border-beauty-purple/20",
      badgeText: t("sidebar.badge.new"),
      roles: ['admin', 'manager', 'marketing', 'designer']
    }
  ];

  // Enhanced filter function with case-insensitive comparison
  const filterByRole = (items: NavItem[]) => {
    return items.filter(item => {
      // If no roles specified, show to everyone
      if (!item.roles || item.roles.length === 0) {
        return true;
      }
      
      // Convert all roles to lowercase for case-insensitive comparison
      const normalizedRoles = item.roles.map(role => role.toLowerCase());
      
      // Special case: 'admin' role should see everything
      if (normalizedUserRole === 'admin') {
        return true;
      }
      
      // Check if user's role is in the allowed roles
      return normalizedRoles.includes(normalizedUserRole);
    });
  };

  return {
    dashboardItems: filterByRole(dashboardItems),
    contentItems: filterByRole(contentItems),
    schedulingItems: filterByRole(schedulingItems),
    analyticsItems: filterByRole(analyticsItems),
    productItems: filterByRole(productItems),
    managementItems: filterByRole(managementItems),
    documentationItems: filterByRole(documentationItems)
  };
};

export default useRBACSidebar;
