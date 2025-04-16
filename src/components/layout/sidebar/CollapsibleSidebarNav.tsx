
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRBACSidebar } from "@/modules/dashboard/utils/sidebarItems";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import SidebarNavSection from "./SidebarNavSection";
import { NavSection } from "@/modules/dashboard/utils/types/sidebarTypes";
import { motion, AnimatePresence } from "framer-motion";

interface CollapsibleSidebarNavProps {
  expanded: boolean;
}

const CollapsibleSidebarNav: React.FC<CollapsibleSidebarNavProps> = ({ expanded }) => {
  const location = useLocation();
  const { profile } = useAuth();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const userRole = profile?.role || "user";
  
  // الحصول على عناصر التنقل حسب دور المستخدم
  const {
    dashboardItems,
    contentItems,
    schedulingItems,
    analyticsItems,
    productItems,
    managementItems,
    documentationItems
  } = useRBACSidebar(userRole);
  
  // دالة مساعدة للتحقق من المسار النشط
  const checkIsActive = (path: string): boolean => {
    // مطابقة دقيقة للجذر ولوحة التحكم
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    
    // للمسارات الأخرى، تحقق مما إذا كان المسار الحالي يبدأ بالمسار المعطى
    return path !== '/' && path !== '/dashboard' && location.pathname.startsWith(path);
  };
  
  // إنشاء أقسام التنقل المنظمة
  const navigationSections: NavSection[] = [
    {
      title: t("sidebar.dashboard", "لوحة التحكم"),
      items: dashboardItems
    },
    {
      title: t("sidebar.content", "المحتوى"),
      items: contentItems
    },
    {
      title: t("sidebar.scheduling", "الجدولة"),
      items: schedulingItems
    },
    {
      title: t("sidebar.analytics", "التحليلات"),
      items: analyticsItems
    },
    {
      title: t("sidebar.products", "المنتجات"),
      items: productItems
    },
    {
      title: t("sidebar.management", "الإدارة"),
      items: managementItems
    },
    {
      title: t("sidebar.help", "المساعدة"),
      items: documentationItems
    }
  ].filter(section => section.items.length > 0);

  // تأثيرات حركية
  const sectionVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <motion.div 
      dir={isRTL ? "rtl" : "ltr"} 
      className="flex flex-col gap-4"
      initial="hidden"
      animate="show"
      variants={sectionVariants}
    >
      <AnimatePresence mode="wait">
        {navigationSections.map((section) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <SidebarNavSection
              title={section.title}
              items={section.items}
              expanded={expanded}
              checkIsActive={checkIsActive}
              activePath={location.pathname}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CollapsibleSidebarNav;
