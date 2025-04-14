
import React from "react";
import {
  LayoutDashboard,
  BarChart,
  Image,
  FileText,
  Video,
  CalendarDays,
  Package2,
  Users,
  Settings,
  Sparkles,
  FileQuestion,
  MessageSquare,
  Database
} from "lucide-react";

interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  badgeText?: string;
  variant?: "default" | "outline";
  className?: string;
  roles?: string[]; // For role-based access control
}

export const useRBACSidebar = (userRole: string = 'user') => {
  // Define groups of navigation items with role-based access control
  const dashboardItems = [
    {
      id: 'dashboard',
      to: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "لوحة التحكم",
      tooltip: "عرض لوحة التحكم الرئيسية",
      roles: ['admin', 'manager', 'marketing', 'designer', 'user']
    }
  ];

  const contentItems = [
    {
      id: 'image-upload',
      to: "/image-upload",
      icon: <Image className="h-5 w-5" />,
      label: "تحليل الصور",
      tooltip: "تحليل وتصنيف الصور",
      roles: ['admin', 'manager', 'marketing', 'designer', 'user']
    },
    {
      id: 'ad-generator',
      to: "/ad-generator",
      icon: <Sparkles className="h-5 w-5" />,
      label: "توليد الإعلانات",
      tooltip: "أداة توليد الإعلانات بالذكاء الاصطناعي",
      roles: ['admin', 'manager', 'marketing', 'designer']
    },
    {
      id: 'content-creator',
      to: "/content-creator",
      icon: <FileText className="h-5 w-5" />,
      label: "منشئ المحتوى",
      tooltip: "إنشاء محتوى نصي للمنشورات",
      roles: ['admin', 'manager', 'marketing', 'designer']
    },
    {
      id: 'video-generator',
      to: "/video-generator",
      icon: <Video className="h-5 w-5" />,
      label: "منشئ الفيديو",
      tooltip: "إنشاء فيديوهات من الصور",
      roles: ['admin', 'manager', 'marketing', 'designer']
    }
  ];

  const schedulingItems = [
    {
      id: 'scheduler',
      to: "/scheduler",
      icon: <CalendarDays className="h-5 w-5" />,
      label: "الجدولة والنشر",
      tooltip: "جدولة ونشر المحتوى على منصات التواصل",
      roles: ['admin', 'manager', 'marketing']
    },
    {
      id: 'schedule-post',
      to: "/schedule-post",
      icon: <MessageSquare className="h-5 w-5" />,
      label: "إنشاء منشور",
      tooltip: "إنشاء منشور جديد ونشره",
      badgeText: "جديد",
      variant: "outline" as const,
      className: "bg-beauty-purple/5 border border-beauty-purple/20",
      roles: ['admin', 'manager', 'marketing']
    }
  ];

  const analyticsItems = [
    {
      id: 'analytics',
      to: "/analytics",
      icon: <BarChart className="h-5 w-5" />,
      label: "التحليلات",
      tooltip: "عرض تحليلات المنصات والأداء",
      roles: ['admin', 'manager', 'marketing']
    }
  ];

  const productItems = [
    {
      id: 'product-list',
      to: "/product/list",
      icon: <Package2 className="h-5 w-5" />,
      label: "المنتجات",
      tooltip: "إدارة المنتجات وعرضها",
      roles: ['admin', 'manager', 'marketing']
    }
  ];

  const managementItems = [
    {
      id: 'users',
      to: "/users",
      icon: <Users className="h-5 w-5" />,
      label: "إدارة المستخدمين",
      tooltip: "إدارة وصلاحيات المستخدمين",
      roles: ['admin', 'manager']
    },
    {
      id: 'profile',
      to: "/profile",
      icon: <Settings className="h-5 w-5" />,
      label: "الإعدادات",
      tooltip: "إعدادات الحساب والنظام",
      roles: ['admin', 'manager', 'marketing', 'designer', 'user']
    },
    {
      id: 'integration',
      to: "/integration",
      icon: <Database className="h-5 w-5" />,
      label: "الدمج والتكامل",
      tooltip: "إعدادات تكاملات النظام",
      roles: ['admin', 'manager']
    }
  ];

  const documentationItems = [
    {
      id: 'documentation',
      to: "/documentation",
      icon: <FileQuestion className="h-5 w-5" />,
      label: "خطة المشروع",
      tooltip: "عرض خطة تطوير المشروع",
      roles: ['admin', 'manager', 'marketing', 'designer', 'user']
    },
    {
      id: 'ai-studio',
      to: "/ai-studio",
      icon: <Sparkles className="h-5 w-5 text-beauty-gold" />,
      label: "استوديو الذكاء",
      tooltip: "استوديو الذكاء الاصطناعي",
      variant: "outline" as const,
      className: "bg-beauty-purple/5 border border-beauty-purple/20",
      badgeText: "جديد",
      roles: ['admin', 'manager', 'marketing', 'designer']
    }
  ];

  // Filter items based on user role
  const filterByRole = (items: NavItem[]) => {
    return items.filter(item => !item.roles || item.roles.includes(userRole));
  };

  return {
    dashboardItems: filterByRole(dashboardItems),
    contentItems: filterByRole(contentItems),
    schedulingItems: filterByRole(schedulingItems),
    analyticsItems: filterByRole(analyticsItems),
    productItems: filterByRole(productItems),
    managementItems: filterByRole(managementItems),
    documentationItems: filterByRole(documentationItems)
  };
};

export default useRBACSidebar;
