
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
              "flex items-center py-3",
              expanded ? "px-3 justify-start" : "justify-center"
            )}
          >
            {({ isActive }) => (
              <>
                <div 
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 shadow-sm",
                    (isActive || checkIsActive(to))
                      ? "bg-white text-[#3a7a89]" 
                      : "text-white hover:bg-white/15"
                  )}
                >
                  <div className="w-5 h-5">
                    {icon}
                  </div>
                </div>
                {expanded && (
                  <span className="ml-3 text-sm font-medium text-white transition-opacity duration-200">{label}</span>
                )}
              </>
            )}
          </NavLink>
        </TooltipTrigger>
        {!expanded && (
          <TooltipContent side="right" className="bg-[#3a7a89]/90 text-white border-none shadow-lg">
            <p className="font-medium">{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarNavItem;
