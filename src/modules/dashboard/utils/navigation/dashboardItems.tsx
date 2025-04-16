
import { LayoutDashboard, BarChart3, Users } from "lucide-react";
import { NavItem } from "../types/sidebarTypes";
import React from "react";

export const getDashboardItems = (t: (key: string, fallback?: string) => string): NavItem[] => [
  {
    id: 'dashboard',
    to: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: t("sidebar.navigation.dashboard", "لوحة التحكم"),
    tooltip: t("sidebar.tooltip.dashboard", "الصفحة الرئيسية"),
    roles: ['admin', 'manager', 'marketing', 'designer', 'user']
  },
  {
    id: 'performance',
    to: "/dashboard/performance",
    icon: <BarChart3 className="h-5 w-5" />,
    label: t("sidebar.navigation.performance", "الأداء"),
    tooltip: t("sidebar.tooltip.performance", "تحليل الأداء"),
    roles: ['admin', 'manager', 'marketing']
  },
  {
    id: 'interactions',
    to: "/dashboard/interactions",
    icon: <Users className="h-5 w-5" />,
    label: t("sidebar.navigation.interactions", "التفاعلات"),
    tooltip: t("sidebar.tooltip.interactions", "تحليل تفاعلات المستخدمين"),
    roles: ['admin', 'manager', 'marketing']
  }
];
