
import { Package2, PackagePlus, ShoppingCart } from "lucide-react";
import { NavItem } from "../types/sidebarTypes";
import React from "react";

export const getProductItems = (t: (key: string, fallback?: string) => string): NavItem[] => [
  {
    id: 'product-list',
    to: "/product/list",
    icon: <Package2 className="h-5 w-5" />,
    label: t("sidebar.navigation.products", "المنتجات"),
    tooltip: t("sidebar.tooltip.products", "عرض وإدارة المنتجات"),
    roles: ['admin', 'manager', 'marketing']
  },
  {
    id: 'product-add',
    to: "/product/add",
    icon: <PackagePlus className="h-5 w-5" />,
    label: t("sidebar.navigation.addProduct", "إضافة منتج"),
    tooltip: t("sidebar.tooltip.addProduct", "إضافة منتج جديد"),
    roles: ['admin', 'manager']
  },
  {
    id: 'product-orders',
    to: "/product/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
    label: t("sidebar.navigation.orders", "الطلبات"),
    tooltip: t("sidebar.tooltip.orders", "إدارة طلبات المنتجات"),
    roles: ['admin', 'manager']
  }
];
