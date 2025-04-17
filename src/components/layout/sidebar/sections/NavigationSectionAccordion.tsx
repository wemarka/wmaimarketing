
import React from "react";
import { motion } from "framer-motion";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { NavSection } from "@/modules/dashboard/utils/types/sidebarTypes";
import { SidebarNavItem } from "../SidebarNavItem";

interface NavigationSectionAccordionProps {
  section: NavSection;
  index: number;
  checkIsActive: (path: string) => boolean;
  expandedSection: string | undefined;
  handleSectionToggle: (section: string) => void;
}

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

const NavigationSectionAccordion: React.FC<NavigationSectionAccordionProps> = ({
  section,
  index,
  checkIsActive,
  expandedSection,
  handleSectionToggle
}) => {
  return (
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
                expanded={true}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default NavigationSectionAccordion;
