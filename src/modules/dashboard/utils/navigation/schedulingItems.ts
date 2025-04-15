
import { CalendarDays, MessageSquare } from "lucide-react";
import { NavItem } from "../types/sidebarTypes";
import React from "react";

export const getSchedulingItems = (t: (key: string, fallback?: string) => string): NavItem[] => [
  {
    id: 'scheduler',
    to: "/scheduler",
    icon: <CalendarDays className="h-5 w-5" />,
    label: t("sidebar.navigation.scheduler"),
    tooltip: t("sidebar.tooltip.scheduler"),
    roles: ['admin', 'manager', 'marketing']
  },
  {
    id: 'schedule-post',
    to: "/schedule-post",
    icon: <MessageSquare className="h-5 w-5" />,
    label: t("sidebar.navigation.schedulePost", "Create Post"),
    tooltip: t("sidebar.tooltip.schedulePost", "Create a new post and publish it"),
    badgeText: t("sidebar.badge.new"),
    variant: "outline" as const,
    className: "bg-beauty-purple/5 border border-beauty-purple/20",
    roles: ['admin', 'manager', 'marketing']
  }
];
