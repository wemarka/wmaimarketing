
import React from "react";
import { useTranslation } from "react-i18next";
import { NavItem, UserRole } from "./types/sidebarTypes";
import { filterByRole } from "./helpers/roleFilter";
import { getDashboardItems } from "./navigation/dashboardItems";
import { getContentItems } from "./navigation/contentItems";
import { getSchedulingItems } from "./navigation/schedulingItems";
import { getAnalyticsItems } from "./navigation/analyticsItems";
import { getProductItems } from "./navigation/productItems";
import { getManagementItems } from "./navigation/managementItems";
import { getDocumentationItems } from "./navigation/documentationItems";

export const useRBACSidebar = (userRole: string = 'user') => {
  const { t } = useTranslation();
  
  // Create a wrapper function to adapt the t function to match our expected signature
  const translateWrapper = (key: string, fallback?: string): string => {
    return t(key, { defaultValue: fallback });
  };
  
  // Get all navigation items
  const dashboardItems = filterByRole(getDashboardItems(translateWrapper), userRole);
  const contentItems = filterByRole(getContentItems(translateWrapper), userRole);
  const schedulingItems = filterByRole(getSchedulingItems(translateWrapper), userRole);
  const analyticsItems = filterByRole(getAnalyticsItems(translateWrapper), userRole);
  const productItems = filterByRole(getProductItems(translateWrapper), userRole);
  const managementItems = filterByRole(getManagementItems(translateWrapper), userRole);
  const documentationItems = filterByRole(getDocumentationItems(translateWrapper), userRole);

  return {
    dashboardItems,
    contentItems,
    schedulingItems,
    analyticsItems,
    productItems,
    managementItems,
    documentationItems
  };
};

export default useRBACSidebar;
