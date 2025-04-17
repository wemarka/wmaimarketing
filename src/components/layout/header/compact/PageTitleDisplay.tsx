
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
  const { t } = useTranslation();
  const location = useLocation();
  const pathName = providedPathname || location.pathname;
  
  // Get the title for the current path, or use the provided pageTitle, or use the pathname as fallback
  const title = pageTitle || routeTitles[pathName] || pathName.split('/').pop()?.replace('-', ' ');
  
  return (
    <motion.h1
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("text-2xl font-bold tracking-tight", className)}
    >
      {t(title)}
    </motion.h1>
  );
};

export default PageTitleDisplay;
