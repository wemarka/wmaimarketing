
import { BarChart } from "lucide-react";
import { NavItem } from "../types/sidebarTypes";
import React from "react";

export const getAnalyticsItems = (t: (key: string, fallback?: string) => string): NavItem[] => [
  {
    id: 'analytics',
    to: "/analytics",
    icon: <BarChart className="h-5 w-5" />,
    label: t("sidebar.navigation.analytics"),
    tooltip: t("sidebar.tooltip.analytics"),
    roles: ['admin', 'manager', 'marketing']
  }
];
