
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  side?: "right" | "left" | "top" | "bottom";
  delay?: number;
  align?: "center" | "start" | "end";
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
}

export const SidebarTooltip: React.FC<SidebarTooltipProps> = ({
  children,
  content,
  open,
  onOpenChange,
  className,
  side = "right",
  delay = 300,
  align = "center",
  sideOffset = 5,
  alignOffset = 0,
  avoidCollisions = true
}) => {
  if (!content) {
    return <>{children}</>;
  }

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -5 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 3 }
  };

  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          avoidCollisions={avoidCollisions}
          className={cn(
            "bg-[#3a7a89]/95 text-white border-white/10 shadow-lg backdrop-blur-lg",
            "px-3 py-2 text-sm font-medium",
            className
          )}
          asChild
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tooltipVariants}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
          >
            {content}
          </motion.div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
