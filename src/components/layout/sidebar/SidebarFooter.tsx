
import React from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div className="absolute bottom-0 left-0 right-0 border-t border-border/60">
      {/* Theme toggle */}
      <div className="px-3 py-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="w-full h-9 justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDarkMode ? (
            <Moon className="h-5 w-5 text-yellow-400" />
          ) : (
            <Sun className="h-5 w-5 text-gray-700" />
          )}
        </Button>
      </div>
      
      <Separator className="my-1" />
      
      {/* User profile */}
      <div 
        className={cn(
          "p-3 flex items-center",
          expanded ? "justify-between" : "justify-center"
        )}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={cn(
                "flex items-center cursor-pointer p-2 rounded-lg hover:bg-muted",
                expanded ? "w-full" : "w-auto justify-center"
              )}>
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarImage src={avatarUrl || ""} alt={displayName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                {expanded && (
                  <div className="mr-3 text-right flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate text-gray-800 dark:text-gray-200">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {displayRole}
                    </p>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            
            {!expanded && (
              <TooltipContent side="right">
                <div className="text-sm">
                  <p className="font-medium">{displayName}</p>
                  <p className="text-xs opacity-70">{displayRole}</p>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SidebarFooter;
