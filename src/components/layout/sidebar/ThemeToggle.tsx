
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ThemeToggleProps {
  expanded: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  expanded, 
  isDarkMode, 
  toggleDarkMode 
}) => {
  return (
    <div className={cn(
      "w-full pt-4 mt-4", 
      expanded ? "px-3" : "px-1"
    )}>
      <Separator className="mb-4" />
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className={cn(
                "h-9 w-9 rounded-md transition-all duration-200",
                expanded ? "h-9 w-9" : "h-8 w-8",
                isDarkMode ? "bg-slate-800 text-yellow-400 hover:text-yellow-300" : "text-slate-600 hover:text-slate-900"
              )}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {isDarkMode ? (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                )}
              </motion.div>
              <span className="sr-only">
                {isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
              </span>
            </Button>
          </TooltipTrigger>
          {!expanded && (
            <TooltipContent side="right">
              <p>{isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ThemeToggle;
