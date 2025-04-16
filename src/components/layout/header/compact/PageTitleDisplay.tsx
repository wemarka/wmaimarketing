
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface PageTitleDisplayProps {
  pageTitle: string;
  pathname: string;
  breadcrumbs?: BreadcrumbItem[];
}

const PageTitleDisplay: React.FC<PageTitleDisplayProps> = ({ 
  pageTitle, 
  pathname,
  breadcrumbs 
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  // Determine if it's a main dashboard view for styling purposes
  const isMainDashboard = pathname === "/dashboard";
  
  // Generate breadcrumbs if not provided
  const generatedBreadcrumbs: BreadcrumbItem[] = breadcrumbs || 
    pathname.split('/')
      .filter(segment => segment)
      .map((segment, index, array) => {
        const path = '/' + array.slice(0, index + 1).join('/');
        // Convert path segments to readable labels
        let label = segment.charAt(0).toUpperCase() + segment.slice(1);
        // Special case translations
        if (segment === 'dashboard') label = 'لوحة التحكم';
        
        return { label, path };
      });
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      {/* Breadcrumbs for non-dashboard pages */}
      {!isMainDashboard && generatedBreadcrumbs.length > 0 && (
        <div className="flex items-center text-xs text-white/70 mb-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-white/70 hover:text-white"
            onClick={() => navigate('/dashboard')}
          >
            لوحة التحكم
          </Button>
          
          {generatedBreadcrumbs.map((item, index) => (
            <React.Fragment key={item.path}>
              <span className="mx-1.5">
                {isRTL ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 px-2",
                  index === generatedBreadcrumbs.length - 1
                    ? "text-white/95 hover:text-white font-medium"
                    : "text-white/70 hover:text-white/90"
                )}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            </React.Fragment>
          ))}
        </div>
      )}
      
      {/* Main page title */}
      <h1 className={`text-lg font-semibold ${isMainDashboard ? "text-white" : "text-white/95"}`}>
        {pageTitle}
      </h1>
    </motion.div>
  );
};

export default PageTitleDisplay;
