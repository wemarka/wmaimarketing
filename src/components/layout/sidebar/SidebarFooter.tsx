
import React from "react";
import { Moon, Sun, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarTooltip } from "./SidebarTooltip";
import { useTooltip } from "@/hooks/use-tooltip";

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
  const { tooltipOpen: darkModeTooltipOpen, showTooltip: showDarkModeTooltip, hideTooltip: hideDarkModeTooltip } = useTooltip();
  const { tooltipOpen: logoutTooltipOpen, showTooltip: showLogoutTooltip, hideTooltip: hideLogoutTooltip } = useTooltip();
  
  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.25)" },
    tap: { scale: 0.95 }
  };
  
  const textVariants = {
    initial: { opacity: 0, width: 0 },
    animate: { opacity: 1, width: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, width: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="mt-auto p-3 border-t border-white/10 backdrop-blur-sm bg-gradient-to-t from-[#276070]/80 to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className={cn(
            "border border-white/20",
            expanded ? "h-8 w-8" : "h-10 w-10"
          )}>
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
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
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
          <SidebarTooltip
            content={!expanded ? (isDarkMode ? "الوضع المضيء" : "الوضع الداكن") : ""}
            open={!expanded && darkModeTooltipOpen}
            onOpenChange={open => open ? showDarkModeTooltip() : hideDarkModeTooltip()}
          >
            <motion.button
              onClick={toggleDarkMode}
              className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onMouseEnter={!expanded ? showDarkModeTooltip : undefined}
              onMouseLeave={!expanded ? hideDarkModeTooltip : undefined}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-white/90" />
              ) : (
                <Moon className="h-4 w-4 text-white/90" />
              )}
            </motion.button>
          </SidebarTooltip>
          
          <SidebarTooltip
            content={!expanded ? "تسجيل الخروج" : ""}
            open={!expanded && logoutTooltipOpen}
            onOpenChange={open => open ? showLogoutTooltip() : hideLogoutTooltip()}
          >
            <motion.button 
              className="bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onMouseEnter={!expanded ? showLogoutTooltip : undefined}
              onMouseLeave={!expanded ? hideLogoutTooltip : undefined}
            >
              <LogOut className="h-4 w-4 text-white/90" />
            </motion.button>
          </SidebarTooltip>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
