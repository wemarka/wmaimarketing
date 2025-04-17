
import React, { useState } from "react";
import SidebarNavItem from "./SidebarNavItem";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem as NavItemType } from "@/modules/dashboard/utils/types/sidebarTypes";
import { cn } from "@/lib/utils";

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
  const [hovered, setHovered] = useState(false);
  
  // Enhanced animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8,
        ease: "easeOut"
      }
    })
  };
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: expanded ? 1 : 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };
  
  const titleVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 25
      } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      } 
    }
  };
  
  const containerVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="mb-6"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      whileHover={expanded ? undefined : "hover"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Section title - only shown when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.h3 
            className={cn(
              "text-xs font-medium uppercase tracking-wider px-3 mb-3",
              hovered ? "text-white/90" : "text-white/60"
            )}
            variants={titleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {title}
          </motion.h3>
        )}
      </AnimatePresence>
      
      {/* Navigation items with enhanced animations */}
      <motion.div 
        className="space-y-1.5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {items.map((item, i) => (
          <motion.div 
            key={item.id}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            layout
          >
            <SidebarNavItem
              item={item}
              isActive={checkIsActive(item.to)}
              expanded={expanded}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SidebarNavSection;
