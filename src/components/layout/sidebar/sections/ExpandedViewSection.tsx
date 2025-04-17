
import React from "react";
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { NavSection } from "@/modules/dashboard/utils/types/sidebarTypes";
import NavigationSectionAccordion from "./NavigationSectionAccordion";

interface ExpandedViewSectionProps {
  navigationSections: NavSection[];
  expandedSection: string | undefined;
  handleSectionToggle: (section: string) => void;
  checkIsActive: (path: string) => boolean;
}

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

const ExpandedViewSection: React.FC<ExpandedViewSectionProps> = ({
  navigationSections,
  expandedSection,
  handleSectionToggle,
  checkIsActive
}) => {
  return (
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
          <NavigationSectionAccordion 
            key={section.title}
            section={section}
            index={index}
            checkIsActive={checkIsActive}
            expandedSection={expandedSection}
            handleSectionToggle={handleSectionToggle}
          />
        ))}
      </Accordion>
    </motion.div>
  );
};

export default ExpandedViewSection;
