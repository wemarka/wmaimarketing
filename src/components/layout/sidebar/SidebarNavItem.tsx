
import React from "react";
import { NavItem } from "@/modules/dashboard/utils/types/sidebarTypes";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  expanded: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, isActive, expanded }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

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
            {/* Properly position icon based on RTL */}
            <span className={cn(
              isRTL ? expanded ? "ml-2" : "mx-auto" : expanded ? "mr-2" : "mx-auto"
            )}>{item.icon}</span>
            
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
          <TooltipContent 
            side={isRTL ? "left" : "right"} 
            className="flex items-center bg-[#3a7a89]/90 text-white border-white/10"
          >
            <span>{item.tooltip || item.label}</span>
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
