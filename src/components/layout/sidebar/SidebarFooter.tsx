
import React from "react";
import { cn } from "@/lib/utils";
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
    <div className={cn(
      "absolute bottom-0 left-0 right-0 p-4 border-t border-white/10",
      expanded ? "flex items-center justify-between" : "flex justify-center py-5"
    )}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "flex items-center cursor-pointer",
              expanded ? "space-x-3" : ""
            )}>
              <Avatar className="h-10 w-10 border-2 border-white/20 shadow-md">
                <AvatarImage src={avatarUrl || ""} alt={displayName} />
                <AvatarFallback className="bg-white/10 text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              
              {expanded && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{displayName}</span>
                  <span className="text-xs text-white/60">{displayRole}</span>
                </div>
              )}
            </div>
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
    </div>
  );
};

export default SidebarFooter;
