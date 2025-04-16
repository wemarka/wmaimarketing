
import React from 'react';
import { ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface PerformanceIndicatorProps {
  title: string;
  value: string;
  previousValue: string;
  changePercentage: number;
  icon: React.ReactNode;
  indicatorColor?: string;
  sparklineData?: Array<{ value: number }>;
  showSparkline?: boolean;
  tooltip?: string;
}

const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({
  title,
  value,
  previousValue,
  changePercentage,
  icon,
  indicatorColor = 'bg-primary',
  sparklineData = [],
  showSparkline = true,
  tooltip
}) => {
  const isPositiveChange = changePercentage >= 0;
  
  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`${indicatorColor}/10 rounded-md p-1.5`}>
            {icon}
          </div>
          <h3 className="text-sm font-medium text-gray-500">
            {title}
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3.5 w-3.5 ml-1.5 inline text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </h3>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
          isPositiveChange ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {isPositiveChange ? 
            <ArrowUpRight className="h-3 w-3" /> :
            <ArrowDownRight className="h-3 w-3" />
          }
          <span>{Math.abs(changePercentage)}%</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between mb-2">
        <div>
          <h4 className="text-lg font-bold text-[#654321]">{value}</h4>
          <div className="mt-0.5 text-xs text-[#654321]/70">
            كان {previousValue} سابقًا
          </div>
        </div>
        
        {showSparkline && sparklineData.length > 0 && (
          <div className="h-12 w-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`sparklineGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositiveChange ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isPositiveChange ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={isPositiveChange ? "#10b981" : "#ef4444"}
                  fill={`url(#sparklineGradient-${title})`} 
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      {/* AI insight tip */}
      {changePercentage > 10 && (
        <div className="flex items-center mt-2 text-xs text-purple-700 bg-purple-50 p-1.5 rounded">
          <Sparkles className="h-3 w-3 mr-1" />
          <span>أداء مميز! استمر بالمحتوى المشابه</span>
        </div>
      )}
    </div>
  );
};

export default PerformanceIndicator;
