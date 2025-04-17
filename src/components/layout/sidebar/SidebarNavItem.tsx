
import React, { useState } from "react";
import { NavItem } from "@/modules/dashboard/utils/types/sidebarTypes";
import { Link } from "react-router-dom";
import { useTooltip } from "@/hooks/use-tooltip";
import { cn } from "@/lib/utils";
import { SidebarTooltip } from "./SidebarTooltip";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  expanded: boolean;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  isActive,
  expanded
}) => {
  // Use tooltip for items when sidebar is collapsed
  const { showTooltip, hideTooltip, tooltipOpen } = useTooltip({ hoverDelay: 400 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion effects for icons
  const iconVariants = {
    expanded: { rotate: 0 },
    collapsed: { rotate: expanded ? 0 : 360, scale: expanded ? 1 : 1.2 },
    hover: { 
      scale: 1.2, 
      rotate: 0, 
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };
  
  // Badge animation
  const badgeVariants = {
    expanded: { opacity: 1, scale: 1 },
    collapsed: { opacity: 0, scale: 0 },
    hover: { 
      scale: 1.2,
      transition: { type: "spring", stiffness: 500 }
    }
  };
  
  // Active indicator animation
  const activeIndicatorVariants = {
    active: { 
      opacity: 1, 
      height: "70%", 
      transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 25 } 
    },
    inactive: { 
      opacity: 0, 
      height: "0%", 
      transition: { duration: 0.3 } 
    },
    hover: { 
      opacity: 0.7, 
      height: "50%", 
      transition: { duration: 0.2 } 
    }
  };
  
  // Interactive button effect
  const buttonVariants = {
    initial: { 
      backgroundColor: "rgba(255, 255, 255, 0)" 
    },
    hover: { 
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transition: { duration: 0.1 }
    }
  };
  
  // Label animation
  const labelVariants = {
    initial: { opacity: 0, x: -5 },
    animate: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8,
        delay: 0.05 
      }
    },
    exit: { 
      opacity: 0, 
      x: -5, 
      transition: { 
        duration: 0.15,
        ease: "easeOut"
      } 
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!expanded) {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    hideTooltip();
  };
  
  // Dynamic tooltip positioning based on item position
  const getTooltipAlignment = () => {
    // Enhanced tooltip positioning logic
    return {
      align: "center" as const,
      side: "right" as const,
      sideOffset: 8
    };
  };

  const tooltipProps = getTooltipAlignment();
  
  return (
    <SidebarTooltip
      content={!expanded ? item.tooltip || item.label : ""}
      open={!expanded ? tooltipOpen : false}
      onOpenChange={open => open ? showTooltip() : hideTooltip()}
      className="z-50"
      delay={400}
      {...tooltipProps}
    >
      <motion.div
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        className="rounded-md overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to={item.to}
          className={cn(
            "flex items-center text-sm px-3 py-2.5 rounded-md transition-all duration-200",
            "hover:text-white relative group",
            isActive
              ? "bg-white/20 text-white"
              : "text-white/70 hover:bg-white/10",
            !expanded && "justify-center"
          )}
        >
          <motion.div 
            className={cn(
              "flex items-center",
              expanded ? "mr-2.5" : "mx-0"
            )}
            variants={iconVariants}
            initial={expanded ? "expanded" : "collapsed"}
            animate={expanded ? "expanded" : isHovered ? "hover" : "collapsed"}
            transition={{ duration: 0.3, type: "spring" }}
          >
            {item.icon}
          </motion.div>
          
          <AnimatePresence mode="wait">
            {expanded && (
              <motion.div 
                className="flex flex-1 items-center justify-between overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                key="expanded-content"
              >
                <motion.span 
                  className="truncate"
                  variants={labelVariants}
                >
                  {item.label}
                </motion.span>
                {item.badgeText && (
                  <motion.div
                    variants={badgeVariants}
                    initial="expanded"
                    animate="expanded"
                    whileHover="hover"
                  >
                    <Badge 
                      variant={item.variant || "default"}
                      className={cn(
                        "ml-2 text-xs",
                        item.variant === "outline" 
                          ? item.className || "bg-white/10 text-white" 
                          : "bg-white/20 text-white"
                      )}
                    >
                      {item.badgeText}
                    </Badge>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Enhanced active indicator with improved animation */}
          <motion.div 
            className="absolute inset-y-0 right-0 w-1 bg-white rounded-l-md"
            initial="inactive"
            animate={isActive ? "active" : "inactive"}
            whileHover={!isActive && isHovered ? "hover" : undefined}
            variants={activeIndicatorVariants}
          />
        </Link>
      </motion.div>
    </SidebarTooltip>
  );
};
