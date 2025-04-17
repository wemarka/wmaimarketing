
import React from 'react';
import { BarChart3, Calendar, Settings, MessageCircle } from "lucide-react";

// Define the type for navigation tab items
export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Export the tab items for the integration dashboard
export const tabItems: TabItem[] = [
  {
    id: "overview",
    label: "نظرة عامة",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    id: "posts",
    label: "المنشورات",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: "webhooks",
    label: "الويب هوك",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    id: "analytics",
    label: "التحليلات",
    icon: <BarChart3 className="h-4 w-4" />,
  },
];
