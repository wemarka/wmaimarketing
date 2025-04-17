
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
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="mb-6">
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
      <motion.div 
        className="space-y-1.5"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              when: "beforeChildren",
              staggerChildren: 0.1
            }
          },
          hidden: {
            opacity: 0
          }
        }}
      >
        {items.map((item, i) => (
          <motion.div 
            key={item.id}
            custom={i}
            variants={itemVariants}
          >
            <SidebarNavItem
              item={item}
              isActive={checkIsActive(item.to)}
              expanded={expanded}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SidebarNavSection;
