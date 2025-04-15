
import { Image, Sparkles, FileText, Video } from "lucide-react";
import { NavItem } from "../types/sidebarTypes";
import React from "react";

export const getContentItems = (t: (key: string, fallback?: string) => string): NavItem[] => [
  {
    id: 'image-upload',
    to: "/image-upload",
    icon: <Image className="h-5 w-5" />,
    label: t("sidebar.navigation.imageAnalysis"),
    tooltip: t("sidebar.tooltip.imageAnalysis"),
    roles: ['admin', 'manager', 'marketing', 'designer', 'user']
  },
  {
    id: 'ad-generator',
    to: "/ad-generator",
    icon: <Sparkles className="h-5 w-5" />,
    label: t("sidebar.navigation.adGenerator"),
    tooltip: t("sidebar.tooltip.adGenerator"),
    roles: ['admin', 'manager', 'marketing', 'designer']
  },
  {
    id: 'content-creator',
    to: "/content-creator",
    icon: <FileText className="h-5 w-5" />,
    label: t("sidebar.navigation.contentCreator"),
    tooltip: t("sidebar.tooltip.contentCreator"),
    roles: ['admin', 'manager', 'marketing', 'designer']
  },
  {
    id: 'video-generator',
    to: "/video-generator",
    icon: <Video className="h-5 w-5" />,
    label: t("sidebar.navigation.videoGenerator"),
    tooltip: t("sidebar.tooltip.videoGenerator"),
    roles: ['admin', 'manager', 'marketing', 'designer']
  }
];
