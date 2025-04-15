
import React from "react";
import { useTranslation } from "react-i18next";
import { useRBACSidebar } from "@/modules/dashboard/utils/sidebarItems";
import { useAuth } from "@/context/AuthContext";

export const useNavigationItems = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  
  // Get user role from the auth context, default to 'user' if not available
  const userRole = profile?.role || 'user';
  
  console.log("useNavigationItems - Current user role:", userRole);
  
  // Get role-based navigation items
  const {
    dashboardItems,
    contentItems,
    schedulingItems,
    analyticsItems,
    productItems,
    managementItems,
    documentationItems
  } = useRBACSidebar(userRole);
  
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
