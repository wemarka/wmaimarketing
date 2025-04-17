
import React from "react";
import { NavItem } from "@/modules/dashboard/utils/types/sidebarTypes";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  expanded: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, isActive, expanded }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Link
            to={item.to}
            className={cn(
              "relative flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-white/10 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            <span className="mr-2 flex-shrink-0">{item.icon}</span>
            {expanded && <span className="truncate">{item.label}</span>}
            {expanded && item.badgeText && (
              <span className={cn(
                "ml-auto rounded-full px-1.5 py-0.5 text-xs",
                item.variant === "outline" ? "border border-white/20" : "bg-white/20"
              )}>
                {item.badgeText}
              </span>
            )}
            {isActive && (
              <motion.div 
                className="absolute inset-0 rounded-md bg-white/10 -z-10"
                layoutId="sidebar-active-item"
                transition={{ 
                  type: "spring", 
                  stiffness: 350, 
                  damping: 30 
                }}
              />
            )}
          </Link>
        </TooltipTrigger>
        {!expanded && (
          <TooltipContent side="right" className="flex items-center">
            <span>{item.tooltip}</span>
            {item.badgeText && (
              <span className={cn(
                "ml-2 rounded-full px-1.5 py-0.5 text-xs",
                item.variant === "outline" ? "border border-white/20" : "bg-white/20"
              )}>
                {item.badgeText}
              </span>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarNavItem;
