
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarTooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "right" | "left" | "top" | "bottom";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SidebarTooltip: React.FC<SidebarTooltipProps> = ({
  content,
  children,
  side = "right",
  open,
  onOpenChange
}) => {
  if (!content) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} className="bg-slate-800 text-white border-slate-700">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
