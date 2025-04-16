
import React from "react";
import { NavItem } from "@/modules/dashboard/utils/types/sidebarTypes";
import { Link } from "react-router-dom";
import { useTooltip } from "@/hooks/use-tooltip";
import { cn } from "@/lib/utils";
import { SidebarTooltip } from "./SidebarTooltip";
import { Badge } from "@/components/ui/badge";

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
    <SidebarTooltip
      content={!expanded ? item.tooltip : ""}
      open={!expanded ? tooltipOpen : false}
      onOpenChange={open => open ? showTooltip() : hideTooltip()}
    >
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
      >
        <div className={cn(
          "flex items-center",
          expanded ? "mr-2" : "mx-0"
        )}>
          {item.icon}
        </div>
        {expanded && (
          <div className="flex flex-1 items-center justify-between">
            <span className="truncate">
              {item.label}
            </span>
            {item.badgeText && (
              <Badge 
                variant={item.variant || "default"}
                className="ml-2 bg-white/20 text-white text-xs"
              >
                {item.badgeText}
              </Badge>
            )}
          </div>
        )}
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute inset-y-0 right-0 w-1 bg-white rounded-l-md" />
        )}
      </Link>
    </SidebarTooltip>
  );
};
