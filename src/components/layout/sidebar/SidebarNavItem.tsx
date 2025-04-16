
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

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
  const isActive = checkIsActive(to);
  
  return (
    <TooltipProvider key={to} delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            className={({ isActive }) => cn(
              "flex items-center py-2",
              expanded ? "px-3 justify-start" : "justify-center"
            )}
          >
            {() => (
              <>
                <motion.div 
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 shadow-sm",
                    isActive
                      ? "bg-white text-[#3a7a89]" 
                      : "text-white/90 hover:bg-white/15"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-5 h-5">
                    {icon}
                  </div>
                </motion.div>
                
                {expanded && (
                  <motion.span 
                    className="ml-3 text-sm font-medium text-white transition-opacity duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {label}
                  </motion.span>
                )}
                
                {expanded && isActive && (
                  <motion.div 
                    className="absolute right-0 w-1 h-8 bg-white rounded-l-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
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
