
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarFooterProps {
  expanded: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  displayName: string;
  displayRole: string;
  userInitials: string;
  avatarUrl?: string | null;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({
  expanded,
  isDarkMode,
  toggleDarkMode,
  displayName,
  displayRole,
  userInitials,
  avatarUrl
}) => {
  return (
    <div className={cn(
      "mt-auto p-4 border-t border-white/10",
      expanded ? "flex items-center justify-between" : "flex flex-col justify-center items-center gap-4"
    )}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              className={cn(
                "flex items-center cursor-pointer",
                expanded ? "space-x-3" : ""
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar className="h-10 w-10 border-2 border-white/20 shadow-md">
                <AvatarImage src={avatarUrl || ""} alt={displayName} />
                <AvatarFallback className="bg-white/10 text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              
              <AnimatePresence>
                {expanded && (
                  <motion.div 
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-medium text-white">{displayName}</span>
                    <span className="text-xs text-white/60">{displayRole}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </TooltipTrigger>
          
          {!expanded && (
            <TooltipContent side="right" className="bg-[#3a7a89]/90 text-white border-none">
              <div className="text-sm">
                <p className="font-medium">{displayName}</p>
                <p className="text-xs opacity-70">{displayRole}</p>
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      
      {expanded ? (
        <motion.button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.button>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#3a7a89]/90 text-white border-none">
              <p>{isDarkMode ? "تفعيل الوضع المضيء" : "تفعيل الوضع المظلم"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default SidebarFooter;
