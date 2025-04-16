
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface SidebarTooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "right" | "left" | "top" | "bottom";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  delay?: number;
}

export const SidebarTooltip: React.FC<SidebarTooltipProps> = ({
  content,
  children,
  side,
  open,
  onOpenChange,
  className,
  delay = 700
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  // Determine tooltip side based on language direction
  const tooltipSide = side || (isRTL ? "left" : "right");
  
  // If no content for tooltip, return original element only
  if (!content) {
    return <>{children}</>;
  }

  // Animation for the tooltip content
  const tooltipAnimation = {
    initial: { opacity: 0, scale: 0.85, x: isRTL ? 10 : -10 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.85, x: isRTL ? 10 : -10 },
    transition: { type: "spring", stiffness: 350, damping: 25 }
  };

  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          side={tooltipSide} 
          className={`bg-slate-800 text-white border-slate-700 ${className || ""}`}
          sideOffset={5}
          align="center"
        >
          <motion.div 
            className="relative z-50"
            {...tooltipAnimation}
          >
            <p className="text-sm whitespace-nowrap">{content}</p>
          </motion.div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
