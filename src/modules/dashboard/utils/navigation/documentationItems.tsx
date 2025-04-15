
import { FileQuestion, Sparkles } from "lucide-react";
import { NavItem } from "../types/sidebarTypes";
import React from "react";

export const getDocumentationItems = (t: (key: string, fallback?: string) => string): NavItem[] => [
  {
    id: 'documentation',
    to: "/documentation",
    icon: <FileQuestion className="h-5 w-5" />,
    label: t("sidebar.navigation.projectPlan"),
    tooltip: t("sidebar.tooltip.projectPlan"),
    roles: ['admin', 'manager', 'marketing', 'designer', 'user']
  },
  {
    id: 'ai-studio',
    to: "/ai-studio",
    icon: <Sparkles className="h-5 w-5 text-beauty-gold" />,
    label: t("sidebar.navigation.aiStudio"),
    tooltip: t("sidebar.tooltip.aiStudio"),
    variant: "outline" as const,
    className: "bg-beauty-purple/5 border border-beauty-purple/20",
    badgeText: t("sidebar.badge.new"),
    roles: ['admin', 'manager', 'marketing', 'designer']
  }
];
