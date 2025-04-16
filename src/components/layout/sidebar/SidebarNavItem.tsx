
import React from "react";
import { NavItem } from "@/modules/dashboard/utils/types/sidebarTypes";
import { Link } from "react-router-dom";
import { useTooltip } from "@/hooks/use-tooltip";
import { cn } from "@/lib/utils";

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
  // Use tooltip for collapsed sidebar items
  const { showTooltip, hideTooltip, tooltipOpen } = useTooltip();
  
  return (
    <Link
      to={item.to}
      className={cn(
        "flex items-center text-sm px-3 py-2 rounded-md transition-colors",
        "hover:text-white relative group",
        isActive
          ? "bg-white/20 text-white"
          : "text-white/60 hover:bg-white/10",
          !expanded && "justify-center"
      )}
      onMouseEnter={!expanded ? showTooltip : undefined}
      onMouseLeave={!expanded ? hideTooltip : undefined}
      data-tooltip-content={item.tooltip}
      data-tooltip-id="sidebar-tooltip"
    >
      <div className={cn(
        "flex items-center",
        expanded ? "mr-2" : "mx-0"
      )}>
        {item.icon}
      </div>
      {expanded && (
        <span className="truncate">
          {item.label}
        </span>
      )}
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute inset-y-0 right-0 w-1 bg-white rounded-l-md" />
      )}
    </Link>
  );
};
