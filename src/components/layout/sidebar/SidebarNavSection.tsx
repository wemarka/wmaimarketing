
import React from "react";
import { SidebarNavItem } from "./SidebarNavItem";
import { motion } from "framer-motion";
import { NavItem as NavItemType } from "@/modules/dashboard/utils/types/sidebarTypes";

interface SidebarNavSectionProps {
  title: string;
  items: NavItemType[];
  expanded: boolean;
  checkIsActive: (path: string) => boolean;
  activePath: string;
}

const SidebarNavSection: React.FC<SidebarNavSectionProps> = ({
  title,
  items,
  expanded,
  checkIsActive,
  activePath
}) => {
  return (
    <div className="mb-2">
      {/* Section title - only shown when expanded */}
      {expanded && (
        <motion.h3 
          className="text-xs font-medium text-white/60 uppercase tracking-wider px-3 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
      )}
      
      {/* Navigation items */}
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.id}>
            <SidebarNavItem
              item={item}
              isActive={checkIsActive(item.to)}
              expanded={expanded}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarNavSection;
