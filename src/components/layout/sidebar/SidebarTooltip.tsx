
import React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";

interface SidebarTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
}

export const SidebarTooltip: React.FC<SidebarTooltipProps> = ({
  content,
  children,
  open,
  onOpenChange,
  side = "right"
}) => {
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className="bg-white/10 backdrop-blur-lg text-white border-white/20">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
