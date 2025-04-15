
import { LayoutDashboard } from "lucide-react";
import { NavItem } from "../types/sidebarTypes";
import React from "react";

export const getDashboardItems = (t: (key: string, fallback?: string) => string): NavItem[] => [
  {
    id: 'dashboard',
    to: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: t("sidebar.navigation.dashboard"),
    tooltip: t("sidebar.tooltip.dashboard"),
    roles: ['admin', 'manager', 'marketing', 'designer', 'user']
  }
];
