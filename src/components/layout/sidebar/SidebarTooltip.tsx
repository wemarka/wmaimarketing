
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
  
  // تحديد جانب عرض التلميح بناءً على اتجاه اللغة
  const tooltipSide = side || (isRTL ? "left" : "right");
  
  // في حالة عدم وجود محتوى للتلميح، نعيد العنصر الأصلي فقط
  if (!content) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          side={tooltipSide} 
          className={`bg-slate-800 text-white border-slate-700 animate-in fade-in-50 zoom-in-95 ${className || ""}`}
          sideOffset={5}
        >
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm"
          >
            {content}
          </motion.p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
