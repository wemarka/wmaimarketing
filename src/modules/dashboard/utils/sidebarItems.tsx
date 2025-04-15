
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
  const { t, i18n } = useTranslation();
  
  // Get all navigation items
  const dashboardItems = filterByRole(getDashboardItems(t), userRole);
  const contentItems = filterByRole(getContentItems(t), userRole);
  const schedulingItems = filterByRole(getSchedulingItems(t), userRole);
  const analyticsItems = filterByRole(getAnalyticsItems(t), userRole);
  const productItems = filterByRole(getProductItems(t), userRole);
  const managementItems = filterByRole(getManagementItems(t), userRole);
  const documentationItems = filterByRole(getDocumentationItems(t), userRole);

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
