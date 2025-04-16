
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
  
  // Get navigation items based on user role
  const {
    dashboardItems,
    contentItems,
    schedulingItems,
    analyticsItems,
    productItems,
    managementItems,
    documentationItems
  } = useRBACSidebar(userRole);
  
  // Helper function to check active path
  const checkIsActive = (path: string): boolean => {
    // Exact match for root and dashboard
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    
    // For other paths, check if current path starts with given path
    return path !== '/' && path !== '/dashboard' && location.pathname.startsWith(path);
  };
  
  // Create organized navigation sections
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

  // Motion effects for sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -15,
      transition: {
        duration: 0.3
      }
    }
  };
  
  // RTL-aware animation variants
  const slideVariants = {
    expanded: { 
      width: "100%",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    collapsed: { 
      width: "auto",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };
  
  return (
    <motion.div 
      dir={isRTL ? "rtl" : "ltr"} 
      className="flex flex-col gap-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      layout
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={expanded ? "expanded" : "collapsed"}
          variants={slideVariants}
          initial={expanded ? "expanded" : "collapsed"}
          animate={expanded ? "expanded" : "collapsed"}
          className="w-full"
        >
          {navigationSections.map((section) => (
            <motion.div
              key={section.title}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="mb-4"
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
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default CollapsibleSidebarNav;
