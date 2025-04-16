
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
    <div className="absolute bottom-6 left-0 right-0 flex justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "cursor-pointer",
              expanded ? "w-full px-4" : "w-auto"
            )}>
              <Avatar className="h-12 w-12 border-2 border-white/30">
                <AvatarImage src={avatarUrl || ""} alt={displayName} />
                <AvatarFallback className="bg-white/10 text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
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
