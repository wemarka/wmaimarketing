
import React from "react";
import { Moon, Sun, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarFooterProps {
  expanded: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  displayName: string;
  displayRole: string;
  userInitials: string;
  avatarUrl: string | undefined;
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
    <div className="mt-auto p-3 border-t border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-white/20">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={displayName} />
            ) : (
              <AvatarFallback className="bg-[#4a8a99] text-white text-xs">
                {userInitials}
              </AvatarFallback>
            )}
          </Avatar>
          
          <AnimatePresence>
            {expanded && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white truncate max-w-[120px]">
                    {displayName}
                  </span>
                  <span className="text-xs text-white/70 truncate max-w-[120px]">
                    {displayRole}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className={cn("flex items-center", expanded ? "gap-2" : "flex-col gap-3")}>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleDarkMode}
                  className="bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4 text-white/90" />
                  ) : (
                    <Moon className="h-4 w-4 text-white/90" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{isDarkMode ? "الوضع المضيء" : "الوضع الداكن"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                  <LogOut className="h-4 w-4 text-white/90" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>تسجيل الخروج</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
