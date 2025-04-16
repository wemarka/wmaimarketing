
import React from "react";
import { cn } from "@/lib/utils";
import SidebarNavItem from "./SidebarNavItem";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface SidebarNavSectionProps {
  title: string;
  items: NavItem[];
  expanded: boolean;
  checkIsActive: (path: string) => boolean;
  activePath: string; // Add activePath prop to interface
}

const SidebarNavSection: React.FC<SidebarNavSectionProps> = ({
  title,
  items,
  expanded,
  checkIsActive,
  activePath
}) => {
  return (
    <div className="w-full flex flex-col">
      <AnimatePresence>
        {expanded && (
          <motion.h3
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="px-4 mb-2 text-xs font-medium text-white/60 uppercase tracking-wider"
          >
            {title}
          </motion.h3>
        )}
      </AnimatePresence>
      
      <div className="space-y-1 w-full">
        {items.map((item) => (
          <SidebarNavItem
            key={item.id}
            to={item.to}
            icon={item.icon}
            label={item.label}
            expanded={expanded}
            checkIsActive={checkIsActive}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarNavSection;
