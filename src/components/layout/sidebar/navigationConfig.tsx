
import React from "react";
import {
  LayoutDashboard,
  BarChart,
  FileText,
  Image,
  Video,
  Calendar,
  Settings,
  HelpCircle,
  Home,
  Star,
  Users
} from "lucide-react";

export const getNavigationSections = () => {
  return [
    {
      title: "Main",
      items: [
        {
          id: "home",
          to: "/",
          icon: <Home className="h-full w-full" />,
          label: "Home"
        },
        {
          id: "dashboard",
          to: "/dashboard",
          icon: <LayoutDashboard className="h-full w-full" />,
          label: "Dashboard"
        },
        {
          id: "overview",
          to: "/overview",
          icon: <Star className="h-full w-full" />,
          label: "Overview"
        },
      ]
    },
    {
      title: "Content",
      items: [
        {
          id: "content",
          to: "/content",
          icon: <FileText className="h-full w-full" />,
          label: "Content"
        },
        {
          id: "images",
          to: "/images",
          icon: <Image className="h-full w-full" />,
          label: "Images"
        },
        {
          id: "videos",
          to: "/video",
          icon: <Video className="h-full w-full" />,
          label: "Videos"
        }
      ]
    },
    {
      title: "Management",
      items: [
        {
          id: "analytics",
          to: "/analytics",
          icon: <BarChart className="h-full w-full" />,
          label: "Analytics"
        },
        {
          id: "team",
          to: "/team",
          icon: <Users className="h-full w-full" />,
          label: "Team"
        },
        {
          id: "settings",
          to: "/settings",
          icon: <Settings className="h-full w-full" />,
          label: "Settings"
        }
      ]
    }
  ];
};
