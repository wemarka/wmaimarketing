
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatisticCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  iconBgClass?: string;
  positive?: boolean;
  showSpark?: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  change,
  icon,
  iconBgClass = "bg-blue-100",
  positive = true,
  showSpark = false,
}) => {
  const numericChange = parseFloat(change);
  
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-sm font-medium text-muted-foreground"
              >
                {title}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <span className="text-2xl font-bold">{value}</span>
                {numericChange !== 0 && (
                  <div className={cn(
                    "flex items-center text-xs gap-0.5 py-0.5 px-1.5 rounded",
                    positive ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                  )}>
                    {positive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(numericChange)}%
                  </div>
                )}
                {showSpark && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">أداء ممتاز! استمر في العمل الجيد</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                )}
              </motion.div>
            </div>
            
            <div className={cn("p-2 rounded-lg", iconBgClass)}>
              {icon}
            </div>
          </div>
          
          <motion.div 
            className="mt-4 pt-3 border-t border-dashed border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="text-xs text-muted-foreground flex justify-between">
              <span>مقارنة بالفترة السابقة</span>
              <span className={positive ? "text-green-600" : "text-red-600"}>
                {positive ? "▲" : "▼"} {change}%
              </span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatisticCard;
