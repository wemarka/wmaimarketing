
import React from "react";
import CompactMenuButton from "./compact/CompactMenuButton";
import PageTitleDisplay from "./compact/PageTitleDisplay";
import CompactHeaderActions from "./compact/CompactHeaderActions";

interface CompactHeaderProps {
  showSidebarTrigger?: boolean;
  pathname?: string;
  pageTitle?: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
}

const CompactHeader: React.FC<CompactHeaderProps> = ({
  showSidebarTrigger = false,
  pathname = "/dashboard",
  pageTitle = "لوحة التحكم",
  notificationCount = 0,
  onNotificationClick = () => {}
}) => {
  // Generate breadcrumbs automatically from pathname
  const breadcrumbs = pathname
    .split('/')
    .filter(segment => segment)
    .map((segment, index, array) => {
      const path = '/' + array.slice(0, index + 1).join('/');
      
      // Convert path segments to readable labels
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === 'dashboard') label = 'لوحة التحكم';
      if (segment === 'performance') label = 'الأداء';
      if (segment === 'interactions') label = 'التفاعلات';
      if (segment === 'marketing') label = 'التسويق';
      if (segment === 'content') label = 'المحتوى';
      if (segment === 'analytics') label = 'التحليلات';
      if (segment === 'scheduler') label = 'الجدولة';
      if (segment === 'admin') label = 'الإدارة';
      
      return { label, path };
    });

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <CompactMenuButton show={showSidebarTrigger} />
        <PageTitleDisplay 
          pageTitle={pageTitle} 
          pathname={pathname}
          breadcrumbs={breadcrumbs}
        />
      </div>
      
      <CompactHeaderActions 
        notificationCount={notificationCount} 
        onNotificationClick={onNotificationClick} 
      />
    </div>
  );
};

export default CompactHeader;
