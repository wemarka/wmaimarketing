
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

interface SidebarTooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "right" | "left" | "top" | "bottom";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const SidebarTooltip: React.FC<SidebarTooltipProps> = ({
  content,
  children,
  side,
  open,
  onOpenChange,
  className
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
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={tooltipSide} 
          className={`bg-slate-800 text-white border-slate-700 animate-in fade-in-50 zoom-in-95 ${className || ""}`}
          sideOffset={5}
        >
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
