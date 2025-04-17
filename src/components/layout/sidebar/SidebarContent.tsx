
import React, { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import { useRBACSidebar } from "@/modules/dashboard/utils/sidebarItems";
import { useAuth } from "@/context/AuthContext";
import { NavSection } from "@/modules/dashboard/utils/types/sidebarTypes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { useSidebarStore, useActivePath } from "@/stores/sidebarStore";

// Lazy loaded components
const ExpandedViewSection = lazy(() => import('./sections/ExpandedViewSection'));
const CollapsedViewSection = lazy(() => import('./sections/CollapsedViewSection'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex justify-center p-4">
    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin"></div>
  </div>
);

interface SidebarContentProps {
  expanded: boolean;
  activePath: string;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  expanded,
  activePath,
}) => {
  const { i18n } = useTranslation();
  const { profile } = useAuth();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const userRole = profile?.role || "user";

  const { checkIsActive } = useActivePath();
  const [expandedSection, setExpandedSection] = React.useState<string | undefined>();
  
  // Get user role-based navigation items
  const {
    dashboardItems,
    contentItems,
    schedulingItems,
    analyticsItems,
    productItems,
    managementItems,
    documentationItems
  } = useRBACSidebar(userRole);

  // Construct organized navigation sections
  const navigationSections: NavSection[] = [
    {
      title: "لوحة التحكم",
      items: dashboardItems
    },
    {
      title: "المحتوى",
      items: contentItems
    },
    {
      title: "الجدولة",
      items: schedulingItems
    },
    {
      title: "التحليلات",
      items: analyticsItems
    },
    {
      title: "المنتجات",
      items: productItems
    },
    {
      title: "الإدارة",
      items: managementItems
    },
    {
      title: "المساعدة",
      items: documentationItems
    }
  ].filter(section => section.items.length > 0); // Only include sections with items
  
  // Find and activate the section containing the current active path
  useEffect(() => {
    const findActiveSectionIndex = () => {
      for (let i = 0; i < navigationSections.length; i++) {
        const section = navigationSections[i];
        const hasActiveItem = section.items.some(item => checkIsActive(item.to));
        if (hasActiveItem) {
          return section.title;
        }
      }
      return navigationSections.length > 0 ? navigationSections[0].title : undefined;
    };
    
    const activeSection = findActiveSectionIndex();
    if (activeSection && expanded) {
      setExpandedSection(activeSection);
    }
  }, [activePath, navigationSections, checkIsActive, expanded]);
  
  const handleSectionToggle = (section: string) => {
    // Implement accordion behavior - only one section open at a time
    setExpandedSection(expandedSection === section ? undefined : section);
  };

  // Enhanced animation variants
  const contentVariants = {
    expanded: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      } 
    },
    collapsed: { opacity: 1 }
  };

  return (
    <ScrollArea 
      className="h-[calc(100vh-64px-80px)]" 
      scrollHideDelay={750}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <motion.div 
        className={cn(
          "py-4 px-2",
          !expanded && "px-1"
        )}
        variants={contentVariants}
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <Suspense fallback={<LoadingFallback />}>
              <ExpandedViewSection
                navigationSections={navigationSections}
                expandedSection={expandedSection}
                handleSectionToggle={handleSectionToggle}
                checkIsActive={checkIsActive}
              />
            </Suspense>
          ) : (
            <Suspense fallback={<LoadingFallback />}>
              <CollapsedViewSection
                navigationSections={navigationSections}
                expanded={expanded}
                checkIsActive={checkIsActive}
                activePath={activePath}
              />
            </Suspense>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollArea>
  );
};

export default SidebarContent;
