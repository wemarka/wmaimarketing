
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
    <div className="mt-auto border-t border-white/15 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar className="h-9 w-9 border-2 border-white/20 shadow-md">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={displayName} />
              ) : (
                <AvatarFallback className="bg-[#4a8a99] text-white text-xs">
                  {userInitials}
                </AvatarFallback>
              )}
            </Avatar>
          </motion.div>
          
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
        
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={toggleDarkMode}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-1.5 rounded-full text-white/90 hover:text-white transition-colors"
                  )}
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.button>
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
                    <motion.button 
                      className="p-1.5 rounded-full text-white/90 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Settings className="h-4 w-4" />
                    </motion.button>
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
                    <motion.button 
                      className="p-1.5 rounded-full text-white/90 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <LogOut className="h-4 w-4" />
                    </motion.button>
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
