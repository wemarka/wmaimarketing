
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Map route paths to display titles
const routeTitles: Record<string, string> = {
  '/': 'لوحة التحكم',
  '/dashboard': 'لوحة التحكم',
  '/dashboard/performance': 'أداء الحملات',
  '/dashboard/interactions': 'التفاعلات',
  '/profile': 'الملف الشخصي',
  '/settings': 'الإعدادات',
  '/members': 'الأعضاء',
  '/content-creator': 'إنشاء المحتوى',
  '/content/posts': 'المنشورات',
  '/scheduler': 'جدولة المحتوى',
  '/schedule-post': 'إنشاء منشور مجدول',
  '/social-integration': 'ربط منصات التواصل',
  '/image-upload': 'رفع الصور',
  '/video-generator': 'مولد الفيديو',
  '/webhook-integration': 'إدارة ويب هوك',
};

export interface PageTitleDisplayProps {
  className?: string;
  // Optional pageTitle prop to allow direct title setting
  pageTitle?: string;
  pathname?: string;
  breadcrumbs?: { label: string; path: string }[];
}

const PageTitleDisplay: React.FC<PageTitleDisplayProps> = ({ 
  className,
  pageTitle,
  pathname: providedPathname,
  breadcrumbs
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const pathName = providedPathname || location.pathname;
  const isRTL = i18n.language === "ar";
  
  // Get the title for the current path, or use the provided pageTitle, or use the pathname as fallback
  const title = pageTitle || routeTitles[pathName] || pathName.split('/').pop()?.replace('-', ' ');
  
  // Animation variants - direction aware
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      x: isRTL ? 20 : -20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={titleVariants}
      key={`page-title-${i18n.language}`}
      className={cn(
        "text-xl md:text-2xl font-bold tracking-tight", 
        isRTL ? "font-arabic" : "font-sans",
        className
      )}
    >
      {t(title)}
    </motion.h1>
  );
};

export default PageTitleDisplay;
