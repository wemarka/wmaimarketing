
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
  
  // Get all navigation items
  const allDashboardItems = getDashboardItems(t);
  const allContentItems = getContentItems(t);
  const allSchedulingItems = getSchedulingItems(t);
  const allAnalyticsItems = getAnalyticsItems(t);
  const allProductItems = getProductItems(t);
  const allManagementItems = getManagementItems(t);
  const allDocumentationItems = getDocumentationItems(t);
  
  // Filter items based on user role
  const filterItemsByRole = (items) => {
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
