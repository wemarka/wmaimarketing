
import React from "react";
import { BarChart3, MessageSquare, Settings, Share2 } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const tabItems: TabItem[] = [
  {
    id: "overview",
    label: "نظرة عامة",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    id: "posts",
    label: "المنشورات",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    id: "sharing",
    label: "المشاركة",
    icon: <Share2 className="h-4 w-4" />,
  },
  {
    id: "settings",
    label: "الإعدادات",
    icon: <Settings className="h-4 w-4" />,
  },
];
