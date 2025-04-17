
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface PerformanceIndicatorProps {
  title: string;
  value: string;
  previousValue: string;
  changePercentage: number;
  icon: React.ReactNode;
  indicatorColor: string;
  sparklineData: { value: number }[];
  tooltip: string;
}

const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({
  title,
  value,
  previousValue,
  changePercentage,
  icon,
  indicatorColor,
  sparklineData,
  tooltip
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full ${indicatorColor} bg-opacity-15`}>
              {icon}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm font-medium">{title}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center text-xs">
            <TrendingUp className={`h-3 w-3 mr-1 ${changePercentage > 0 ? 'text-green-500' : 'text-red-500'}`} />
            <span className={changePercentage > 0 ? 'text-green-500' : 'text-red-500'}>
              {changePercentage > 0 ? '+' : ''}{changePercentage}%
            </span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">
            سابقاً: {previousValue}
          </div>
        </div>
        
        <div className="mt-3 h-6">
          <div className="flex items-end justify-between w-full h-full">
            {sparklineData.map((data, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${(data.value / Math.max(...sparklineData.map(d => d.value))) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`${indicatorColor} w-1 rounded-t`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceIndicator;
