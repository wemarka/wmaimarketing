
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
              "flex items-center justify-center w-full",
              !expanded && "mx-auto"
            )}
          >
            <div 
              className={({ isActive }) => cn(
                "flex items-center justify-center w-12 h-12 rounded-full transition-all",
                (isActive || checkIsActive(to))
                  ? "bg-white text-[#3a7a89]" 
                  : "text-white hover:bg-white/10",
              )}
            >
              <div className="w-5 h-5">
                {icon}
              </div>
            </div>
            {expanded && (
              <span className="ml-3 text-sm font-medium text-white">{label}</span>
            )}
          </NavLink>
        </TooltipTrigger>
        {!expanded && (
          <TooltipContent side="right" className="bg-[#3a7a89]/90 text-white border-none">
            <p>{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarNavItem;
