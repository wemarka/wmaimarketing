
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import { useRBACSidebar } from "@/modules/dashboard/utils/sidebarItems";
import { useAuth } from "@/context/AuthContext";
import CollapsibleSidebarNav from "./CollapsibleSidebarNav";
import { NavItem, NavSection } from "@/modules/dashboard/utils/types/sidebarTypes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "./SidebarNavItem";
import SidebarNavSection from "./SidebarNavSection";

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
  
  // Track which section is currently expanded
  const [expandedSection, setExpandedSection] = useState<string | undefined>(
    navigationSections.length > 0 ? navigationSections[0].title : undefined
  );
  
  const handleSectionToggle = (section: string) => {
    // Implement accordion behavior - only one section open at a time
    setExpandedSection(expandedSection === section ? undefined : section);
  };

  return (
    <ScrollArea 
      className="h-[calc(100vh-64px-80px)]" 
      scrollHideDelay={750}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className={cn(
        "py-4 px-2",
        !expanded && "px-1"
      )}>
        {expanded ? (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={expandedSection}
          >
            {navigationSections.map((section) => (
              <AccordionItem 
                value={section.title} 
                key={section.title}
                className="border-b-0 last:border-0"
              >
                <AccordionTrigger 
                  className={cn(
                    "py-2 px-3 text-sm font-semibold hover:bg-white/5 rounded-md",
                    "text-white/90 hover:text-white no-underline hover:no-underline",
                    "data-[state=open]:bg-white/10"
                  )}
                  onClick={() => handleSectionToggle(section.title)}
                >
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pt-1">
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
            ))}
          </Accordion>
        ) : (
          <div className="space-y-6">
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
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default SidebarContent;
