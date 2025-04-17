
import React from "react";
import { motion } from "framer-motion";
import { NavSection } from "@/modules/dashboard/utils/types/sidebarTypes";
import SidebarNavSection from "../SidebarNavSection";

interface CollapsedViewSectionProps {
  navigationSections: NavSection[];
  expanded: boolean;
  checkIsActive: (path: string) => boolean;
  activePath: string;
}

const CollapsedViewSection: React.FC<CollapsedViewSectionProps> = ({
  navigationSections,
  expanded,
  checkIsActive,
  activePath,
}) => {
  return (
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
  );
};

export default CollapsedViewSection;
