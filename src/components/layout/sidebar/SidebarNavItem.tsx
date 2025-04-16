
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  checkIsActive: (path: string) => boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  to, 
  icon, 
  label, 
  expanded, 
  checkIsActive 
}) => {
  return (
    <TooltipProvider key={to} delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            className={({ isActive }) => cn(
              "flex items-center rounded-md mx-2 px-3 py-2 text-sm font-medium",
              isActive || checkIsActive(to)
                ? "bg-primary/10 text-primary" 
                : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
              !expanded && "justify-center"
            )}
          >
            <div className={cn("flex items-center", !expanded && "justify-center w-full")}>
              {icon}
              {expanded && (
                <span className="mr-2 text-inherit">{label}</span>
              )}
            </div>
          </NavLink>
        </TooltipTrigger>
        {!expanded && (
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarNavItem;
