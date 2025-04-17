
import { useTranslation } from "react-i18next";
import { UserRole } from "./types/sidebarTypes";
import { getDashboardItems } from "./navigation/dashboardItems";
import { getContentItems } from "./navigation/contentItems";
import { getSchedulingItems } from "./navigation/schedulingItems";
import { getAnalyticsItems } from "./navigation/analyticsItems";
import { getProductItems } from "./navigation/productItems";
import { getManagementItems } from "./navigation/managementItems";
import { getDocumentationItems } from "./navigation/documentationItems";

/**
 * A hook to filter navigation items based on user role
 */
export const useRBACSidebar = (role: UserRole) => {
  const { t } = useTranslation();
  
  // Create a wrapper function to match the expected signature
  const tWrapper = (key: string, fallback?: string): string => {
    return t(key, { defaultValue: fallback || key });
  };
  
  // Get all navigation items
  const allDashboardItems = getDashboardItems(tWrapper);
  const allContentItems = getContentItems(tWrapper);
  const allSchedulingItems = getSchedulingItems(tWrapper);
  const allAnalyticsItems = getAnalyticsItems(tWrapper);
  const allProductItems = getProductItems(tWrapper);
  const allManagementItems = getManagementItems(tWrapper);
  const allDocumentationItems = getDocumentationItems(tWrapper);
  
  // Filter items based on user role
  const filterItemsByRole = (items: any[]) => {
    return items.filter((item) => {
      // If no roles are specified, or the item has no role restrictions, show to all users
      if (!item.roles || item.roles.length === 0) {
        return true;
      }
      // Only show items that include the user's role
      return item.roles.includes(role);
    });
  };
  
  return {
    dashboardItems: filterItemsByRole(allDashboardItems),
    contentItems: filterItemsByRole(allContentItems),
    schedulingItems: filterItemsByRole(allSchedulingItems),
    analyticsItems: filterItemsByRole(allAnalyticsItems),
    productItems: filterItemsByRole(allProductItems),
    managementItems: filterItemsByRole(allManagementItems),
    documentationItems: filterItemsByRole(allDocumentationItems),
  };
};
