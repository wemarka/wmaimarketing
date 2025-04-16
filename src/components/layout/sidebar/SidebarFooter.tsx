
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
    <div className="mt-auto border-t border-white/10 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9 border-2 border-white/20">
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
                className="ml-3 overflow-hidden"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-medium text-white">{displayName}</p>
                <p className="text-xs text-white/70">{displayRole}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleDarkMode}
                  className={cn(
                    "p-1.5 rounded-full text-white hover:bg-white/20 transition-colors"
                  )}
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#3a7a89]/90 text-white border-none"
              >
                <p>{isDarkMode ? "وضع النهار" : "وضع الليل"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {expanded && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1.5 rounded-full text-white hover:bg-white/20 transition-colors">
                      <Settings className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-[#3a7a89]/90 text-white border-none"
                  >
                    <p>الإعدادات</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1.5 rounded-full text-white hover:bg-white/20 transition-colors">
                      <LogOut className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-[#3a7a89]/90 text-white border-none"
                  >
                    <p>تسجيل الخروج</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
