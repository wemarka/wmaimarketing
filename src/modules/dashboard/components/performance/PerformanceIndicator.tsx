
import React from "react";
import { motion } from "framer-motion";
import { ChevronUp, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface PerformanceIndicatorProps {
  title: string;
  value: number | string;
  previousValue?: number | string;
  changePercentage: number;
  icon?: React.ReactNode;
  tooltipContent?: React.ReactNode;
  isCompact?: boolean;
  indicatorColor?: string;
}

const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({
  title,
  value,
  previousValue,
  changePercentage,
  icon,
  tooltipContent,
  isCompact = false,
  indicatorColor = "bg-blue-500"
}) => {
  const isPositive = changePercentage >= 0;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-100 dark:border-slate-700", 
              isCompact ? "flex items-center gap-3" : ""
            )}
          >
            {icon && (
              <div className={cn(
                "rounded-lg p-2.5 mb-3",
                indicatorColor.startsWith("bg-") ? `${indicatorColor}/10` : "bg-blue-500/10",
                isCompact ? "mb-0" : ""
              )}>
                {icon}
              </div>
            )}
            
            <div className={isCompact ? "flex-1" : ""}>
              <h3 className="text-sm text-slate-500 dark:text-slate-400">{title}</h3>
              <div className="flex items-baseline gap-2 mt-1">
                <p className={cn(
                  "font-bold",
                  isCompact ? "text-xl" : "text-2xl"
                )}>
                  {typeof value === "number" ? value.toLocaleString() : value}
                </p>
                <div className={cn(
                  "flex items-center text-xs gap-0.5 px-1.5 py-0.5 rounded",
                  isPositive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                )}>
                  {isPositive ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{Math.abs(changePercentage).toFixed(1)}%</span>
                </div>
              </div>
              
              {!isCompact && previousValue && (
                <p className="text-xs text-slate-400 mt-1">
                  {typeof previousValue === "number" ? previousValue.toLocaleString() : previousValue} فترة سابقة
                </p>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start" className="w-64 p-0">
          <div className="p-3 space-y-2">
            <p className="font-medium">{title}</p>
            {tooltipContent ? (
              tooltipContent
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">الحالي</p>
                    <p className="font-medium">{typeof value === "number" ? value.toLocaleString() : value}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">السابق</p>
                    <p className="font-medium">{typeof previousValue === "number" ? previousValue.toLocaleString() : previousValue}</p>
                  </div>
                </div>
                <div className={cn(
                  "text-sm p-1.5 rounded",
                  isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                )}>
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    <span className="font-medium">
                      {isPositive ? "زيادة بنسبة" : "انخفاض بنسبة"} {Math.abs(changePercentage).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PerformanceIndicator;
