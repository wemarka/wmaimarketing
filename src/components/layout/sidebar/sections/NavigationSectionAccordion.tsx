
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NavSection } from "@/modules/dashboard/utils/types/sidebarTypes";
import SidebarNavItem from "../SidebarNavItem";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface NavigationSectionAccordionProps {
  section: NavSection;
  index: number;
  checkIsActive: (path: string) => boolean;
  expandedSection: string | undefined;
  handleSectionToggle: (section: string) => void;
}

const staggerDelay = 0.05;

const NavigationSectionAccordion: React.FC<NavigationSectionAccordionProps> = ({
  section,
  index,
  checkIsActive,
  expandedSection,
  handleSectionToggle
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const isExpanded = expandedSection === section.title;
  
  const navItemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * staggerDelay,
        duration: 0.2,
        ease: "easeOut"
      }
    })
  };

  return (
    <AccordionItem
      value={section.title}
      className="border-b-0 last:border-0"
      data-state={isExpanded ? "open" : "closed"}
    >
      <AccordionTrigger
        onClick={() => handleSectionToggle(section.title)}
        className={cn(
          "py-3 px-3 text-sm hover:bg-white/5 rounded-md transition-all",
          "text-white/70 hover:text-white no-underline hover:no-underline",
          isExpanded ? "font-medium text-white" : "font-normal"
        )}
      >
        <span className={cn("text-xs font-medium uppercase tracking-wider", isRTL && "ml-auto")}>
          {section.title}
        </span>
      </AccordionTrigger>
      
      <AccordionContent className="pb-1 pt-1">
        <div className={cn("space-y-1", isRTL && "text-right")}>
          {section.items.map((item, i) => (
            <motion.div
              key={item.to}
              custom={i}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <SidebarNavItem
                item={item}
                isActive={checkIsActive(item.to)}
                expanded={true}
              />
            </motion.div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavigationSectionAccordion;
