
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import { useRBACSidebar } from "@/modules/dashboard/utils/sidebarItems";
import { useAuth } from "@/context/AuthContext";
import { NavItem, NavSection } from "@/modules/dashboard/utils/types/sidebarTypes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "./SidebarNavItem";
import SidebarNavSection from "./SidebarNavSection";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarContentProps {
  expanded: boolean;
  activePath: string;
  checkIsActive: (path: string) => boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  expanded,
  activePath,
  checkIsActive
}) => {
  const { i18n } = useTranslation();
  const { profile } = useAuth();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const userRole = profile?.role || "user";
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
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
      return navigationSections.length > 0 ? navigationSections[0].title : null;
    };
    
    setActiveSection(findActiveSectionIndex());
  }, [activePath, navigationSections, checkIsActive]);
  
  // Track which section is currently expanded
  const [expandedSection, setExpandedSection] = useState<string | undefined>(
    navigationSections.length > 0 ? navigationSections[0].title : undefined
  );
  
  // Update expanded section when active section changes
  useEffect(() => {
    if (activeSection && expanded) {
      setExpandedSection(activeSection);
    }
  }, [activeSection, expanded]);
  
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

  const sectionVariants = {
    expanded: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    collapsed: { 
      opacity: 0.8, 
      height: "auto" 
    }
  };
  
  const accordionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.3,
        ease: "easeOut",
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
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
            <motion.div
              key="expanded-view"
              initial="hidden"
              animate="visible"
              variants={accordionVariants}
            >
              <Accordion
                type="single"
                collapsible
                className="w-full"
                value={expandedSection}
              >
                {navigationSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    variants={sectionVariants}
                    initial="collapsed"
                    animate="expanded"
                    transition={{ delay: index * 0.05 }}
                  >
                    <AccordionItem 
                      value={section.title}
                      className="border-b-0 last:border-0"
                    >
                      <AccordionTrigger 
                        className={cn(
                          "py-2 px-3 text-sm font-semibold hover:bg-white/5 rounded-md",
                          "text-white/90 hover:text-white no-underline hover:no-underline",
                          "data-[state=open]:bg-white/10",
                          "transition-all duration-200"
                        )}
                        onClick={() => handleSectionToggle(section.title)}
                      >
                        {section.title}
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 transition-all">
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <SidebarNavItem
                              key={item.id}
                              item={item}
                              isActive={checkIsActive(item.to)}
                              expanded={expanded}
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          ) : (
            <motion.div 
              key="collapsed-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {navigationSections.map((section) => (
                <SidebarNavSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  expanded={expanded}
                  checkIsActive={checkIsActive}
                  activePath={activePath}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollArea>
  );
};

export default SidebarContent;
