
import React from "react";
import { NavItem } from "@/modules/dashboard/utils/types/sidebarTypes";
import { Link } from "react-router-dom";
import { useTooltip } from "@/hooks/use-tooltip";
import { cn } from "@/lib/utils";
import { SidebarTooltip } from "./SidebarTooltip";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
  // استخدام التلميح للعناصر عندما يكون الشريط مطوياً
  const { showTooltip, hideTooltip, tooltipOpen } = useTooltip();
  
  // تأثيرات حركية للعناصر
  const iconVariants = {
    expanded: { rotate: 0 },
    collapsed: { rotate: expanded ? 0 : 360 }
  };
  
  const badgeVariants = {
    expanded: { opacity: 1, scale: 1 },
    collapsed: { opacity: 0, scale: 0 }
  };
  
  const activeIndicatorVariants = {
    active: { opacity: 1, height: "70%" },
    inactive: { opacity: 0, height: "0%" }
  };
  
  return (
    <SidebarTooltip
      content={!expanded ? item.tooltip || item.label : ""}
      open={!expanded ? tooltipOpen : false}
      onOpenChange={open => open ? showTooltip() : hideTooltip()}
      className="z-50"
    >
      <Link
        to={item.to}
        className={cn(
          "flex items-center text-sm px-3 py-2 rounded-md transition-all duration-200",
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
            expanded ? "mr-2" : "mx-0"
          )}
          variants={iconVariants}
          initial={expanded ? "expanded" : "collapsed"}
          animate={expanded ? "expanded" : "collapsed"}
          transition={{ duration: 0.3, type: "spring" }}
        >
          {item.icon}
        </motion.div>
        
        {expanded && (
          <div className="flex flex-1 items-center justify-between overflow-hidden">
            <span className="truncate">
              {item.label}
            </span>
            {item.badgeText && (
              <motion.div
                variants={badgeVariants}
                initial="expanded"
                animate="expanded"
                exit="collapsed"
              >
                <Badge 
                  variant={item.variant || "default"}
                  className="ml-2 bg-white/20 text-white text-xs"
                >
                  {item.badgeText}
                </Badge>
              </motion.div>
            )}
          </div>
        )}
        
        {/* مؤشر النشط المحسن */}
        {isActive && (
          <motion.div 
            className="absolute inset-y-0 right-0 w-1 bg-white rounded-l-md"
            initial="inactive"
            animate="active"
            variants={activeIndicatorVariants}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </SidebarTooltip>
  );
};
