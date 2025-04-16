
import React from "react";
import SidebarNavItem from "./SidebarNavItem";
import { motion } from "framer-motion";

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
  activePath: string;
  SidebarItemWrapper?: ({ children, title, isExpanded }: { 
    children: React.ReactNode; 
    title: string; 
    isExpanded: boolean 
  }) => JSX.Element;
}

const SidebarNavSection: React.FC<SidebarNavSectionProps> = ({
  title,
  items,
  expanded,
  checkIsActive,
  activePath,
  SidebarItemWrapper
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
            {SidebarItemWrapper ? (
              <SidebarItemWrapper title={item.label} isExpanded={expanded}>
                <SidebarNavItem
                  item={item}
                  expanded={expanded}
                  isActive={checkIsActive(item.to)}
                  activePath={activePath}
                />
              </SidebarItemWrapper>
            ) : (
              <SidebarNavItem
                item={item}
                expanded={expanded}
                isActive={checkIsActive(item.to)}
                activePath={activePath}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarNavSection;
