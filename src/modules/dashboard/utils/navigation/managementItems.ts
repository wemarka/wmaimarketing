
import { Users, Settings, Database } from "lucide-react";
import { NavItem } from "../types/sidebarTypes";
import React from "react";

export const getManagementItems = (t: (key: string, fallback?: string) => string): NavItem[] => [
  {
    id: 'users',
    to: "/users",
    icon: <Users className="h-5 w-5" />,
    label: t("sidebar.navigation.userManagement"),
    tooltip: t("sidebar.tooltip.userManagement"),
    roles: ['admin', 'manager']
  },
  {
    id: 'profile',
    to: "/profile",
    icon: <Settings className="h-5 w-5" />,
    label: t("sidebar.navigation.profile"),
    tooltip: t("sidebar.tooltip.profile"),
    roles: ['admin', 'manager', 'marketing', 'designer', 'user']
  },
  {
    id: 'integration',
    to: "/integration",
    icon: <Database className="h-5 w-5" />,
    label: t("sidebar.navigation.integrations"),
    tooltip: t("sidebar.tooltip.integrations"),
    roles: ['admin', 'manager']
  }
];
