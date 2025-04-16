
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

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
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            className={cn(
              "flex items-center py-2 rounded-lg transition-colors relative",
              expanded ? "px-3 justify-start" : "px-1 justify-center",
              isActive && "bg-[#ffffff15]"
            )}
          >
            {() => (
              <>
                <motion.div 
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-white to-white/90 text-[#3a7a89] shadow-lg" 
                      : "text-white/90 hover:bg-white/15"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="w-5 h-5">
                    {icon}
                  </div>
                </motion.div>
                
                <AnimatePresence mode="wait">
                  {expanded && (
                    <motion.span 
                      className={cn(
                        "mr-3 text-sm font-medium transition-opacity duration-200",
                        isActive ? "text-white" : "text-white/80"
                      )}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {isActive && (
                  <motion.div 
                    className={cn(
                      "absolute right-0 bg-white rounded-r-full h-8",
                      expanded ? "w-1.5" : "w-1.5"
                    )}
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
          <TooltipContent side="left" className="bg-[#3a7a89]/90 text-white border-none shadow-lg">
            <p className="font-medium">{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarNavItem;
