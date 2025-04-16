
import React from "react";
import { useLocation } from "react-router-dom";
import { useRBACSidebar } from "@/modules/dashboard/utils/sidebarItems";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import SidebarNavSection from "./SidebarNavSection";
import { NavSection } from "@/modules/dashboard/utils/types/sidebarTypes";

interface CollapsibleSidebarNavProps {
  expanded: boolean;
}

const CollapsibleSidebarNav: React.FC<CollapsibleSidebarNavProps> = ({ expanded }) => {
  const location = useLocation();
  const { profile } = useAuth();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const userRole = profile?.role || "user";
  
  // Get user role-based navigation items
  const {
    dashboardItems,
    contentItems,
    schedulingItems,
    analyticsItems,
    productItems,
    managementItems,
    documentationItems
  } = useRBACSidebar(userRole);
  
  // Helper function to check if a route is active
  const checkIsActive = (path: string): boolean => {
    // Exact match for root and dashboard
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    
    // For other routes, check if current path starts with the given path
    return path !== '/' && path !== '/dashboard' && location.pathname.startsWith(path);
  };
  
  // Construct organized navigation sections
  const navigationSections: NavSection[] = [
    {
      title: "لوحة التحكم",
      items: dashboardItems
    },
    {
      title: "المحتوى",
      items: contentItems
    },
    {
      title: "الجدولة",
      items: schedulingItems
    },
    {
      title: "التحليلات",
      items: analyticsItems
    },
    {
      title: "المنتجات",
      items: productItems
    },
    {
      title: "الإدارة",
      items: managementItems
    },
    {
      title: "المساعدة",
      items: documentationItems
    }
  ].filter(section => section.items.length > 0);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="flex flex-col gap-4">
      {navigationSections.map((section) => (
        <SidebarNavSection
          key={section.title}
          title={section.title}
          items={section.items}
          expanded={expanded}
          checkIsActive={checkIsActive}
          activePath={location.pathname}
        />
      ))}
    </div>
  );
};

export default CollapsibleSidebarNav;
