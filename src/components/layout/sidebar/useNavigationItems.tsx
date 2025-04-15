
import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRBACSidebar } from '@/modules/dashboard/utils/sidebarItems';

export const useNavigationItems = () => {
  const { profile } = useAuth();
  const userRole = profile?.role || 'user';

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

  // Organize items into groups
  const mainNavItems = useMemo(() => [
    ...dashboardItems
  ], [dashboardItems]);

  const mediaNavItems = useMemo(() => [
    ...contentItems,
    ...schedulingItems,
    ...analyticsItems
  ], [contentItems, schedulingItems, analyticsItems]);

  return {
    mainNavItems,
    mediaNavItems,
    productItems,
    managementItems,
    documentationItems
  };
};

export default useNavigationItems;
