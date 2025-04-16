
import React from "react";
import {
  LayoutDashboard,
  Image,
  FileText,
  Video,
  CalendarDays,
  BarChart,
  FileQuestion,
  Users,
  Settings,
  Database,
  Package2,
  PackagePlus,
  ShoppingCart,
} from "lucide-react";

export interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
}

export interface NavigationSection {
  title: string;
  items: NavItem[];
}

export const getNavigationSections = (): NavigationSection[] => [
  {
    title: "الرئيسية",
    items: [
      { id: 'dashboard', icon: <LayoutDashboard className="h-5 w-5" />, to: "/dashboard", label: "لوحة التحكم" }
    ]
  },
  {
    title: "المحتوى",
    items: [
      { id: 'image-upload', icon: <Image className="h-5 w-5" />, to: "/image-upload", label: "تحليل الصور" },
      { id: 'content-creator', icon: <FileText className="h-5 w-5" />, to: "/content-creator", label: "منشئ المحتوى" },
      { id: 'video-generator', icon: <Video className="h-5 w-5" />, to: "/video-generator", label: "منشئ الفيديو" },
      { id: 'scheduler', icon: <CalendarDays className="h-5 w-5" />, to: "/scheduler", label: "الجدولة والنشر" },
      { id: 'analytics', icon: <BarChart className="h-5 w-5" />, to: "/analytics", label: "التحليلات" }
    ]
  },
  {
    title: "المنتجات",
    items: [
      { id: 'product-list', icon: <Package2 className="h-5 w-5" />, to: "/product/list", label: "المنتجات" },
      { id: 'product-add', icon: <PackagePlus className="h-5 w-5" />, to: "/product/add", label: "إضافة منتج" },
      { id: 'product-orders', icon: <ShoppingCart className="h-5 w-5" />, to: "/product/orders", label: "الطلبات" }
    ]
  },
  {
    title: "الإدارة",
    items: [
      { id: 'users', icon: <Users className="h-5 w-5" />, to: "/users", label: "إدارة المستخدمين" },
      { id: 'profile', icon: <Settings className="h-5 w-5" />, to: "/profile", label: "الإعدادات الشخصية" },
      { id: 'integration', icon: <Database className="h-5 w-5" />, to: "/integration", label: "التكاملات" }
    ]
  },
  {
    title: "المستندات",
    items: [
      { id: 'documentation', icon: <FileQuestion className="h-5 w-5" />, to: "/documentation", label: "خطة المشروع" }
    ]
  }
];
