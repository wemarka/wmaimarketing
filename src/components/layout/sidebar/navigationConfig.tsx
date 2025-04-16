
import React from "react";
import {
  LayoutDashboard,
  BarChart,
  FileText,
  Image,
  Video,
  Calendar,
  Settings,
  Users,
  Home,
  Star,
  TrendingUp,
  BookOpen,
  Target,
  UserCircle,
  PieChart,
  LineChart,
  Layers,
  MessageCircle,
  DollarSign,
  ShieldCheck
} from "lucide-react";

export const getNavigationSections = () => {
  return [
    {
      title: "الرئيسية",
      items: [
        {
          id: "home",
          to: "/",
          icon: <Home className="h-full w-full" />,
          label: "الصفحة الرئيسية"
        }
      ]
    },
    {
      title: "لوحة التحكم",
      items: [
        {
          id: "dashboard",
          to: "/dashboard",
          icon: <LayoutDashboard className="h-full w-full" />,
          label: "النظرة العامة"
        },
        {
          id: "performance",
          to: "/dashboard/performance",
          icon: <TrendingUp className="h-full w-full" />,
          label: "الأداء"
        },
        {
          id: "interactions",
          to: "/dashboard/interactions",
          icon: <MessageCircle className="h-full w-full" />,
          label: "التفاعلات"
        }
      ]
    },
    {
      title: "التسويق",
      items: [
        {
          id: "campaigns",
          to: "/marketing/campaigns",
          icon: <Target className="h-full w-full" />,
          label: "الحملات"
        },
        {
          id: "audience",
          to: "/marketing/audience",
          icon: <Users className="h-full w-full" />,
          label: "الجمهور"
        },
        {
          id: "insights",
          to: "/marketing/insights",
          icon: <PieChart className="h-full w-full" />,
          label: "الإحصاءات"
        }
      ]
    },
    {
      title: "المحتوى",
      items: [
        {
          id: "posts",
          to: "/content/posts",
          icon: <FileText className="h-full w-full" />,
          label: "المنشورات"
        },
        {
          id: "images",
          to: "/content/images",
          icon: <Image className="h-full w-full" />,
          label: "الصور"
        },
        {
          id: "videos",
          to: "/content/videos",
          icon: <Video className="h-full w-full" />,
          label: "الفيديوهات"
        }
      ]
    },
    {
      title: "التحليلات",
      items: [
        {
          id: "weekly-reports",
          to: "/analytics/weekly",
          icon: <BarChart className="h-full w-full" />,
          label: "التقارير الأسبوعية"
        },
        {
          id: "engagement",
          to: "/analytics/engagement",
          icon: <LineChart className="h-full w-full" />,
          label: "التفاعل"
        },
        {
          id: "sales",
          to: "/analytics/sales",
          icon: <DollarSign className="h-full w-full" />,
          label: "المبيعات"
        }
      ]
    },
    {
      title: "الإدارة",
      items: [
        {
          id: "users",
          to: "/admin/users",
          icon: <Users className="h-full w-full" />,
          label: "المستخدمين"
        },
        {
          id: "settings",
          to: "/admin/settings",
          icon: <Settings className="h-full w-full" />,
          label: "الإعدادات"
        },
        {
          id: "roles",
          to: "/admin/roles",
          icon: <ShieldCheck className="h-full w-full" />,
          label: "الصلاحيات"
        }
      ]
    }
  ];
};
