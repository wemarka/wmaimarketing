
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PerformanceIndicatorProps {
  title: string;
  value: string;
  previousValue: string;
  changePercentage: number;
  icon: React.ReactNode;
  indicatorColor?: string;
}

const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({
  title,
  value,
  previousValue,
  changePercentage,
  icon,
  indicatorColor = 'bg-primary'
}) => {
  return (
    <div className="mt-5">
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`${indicatorColor}/10 rounded-md p-1`}>
              {icon}
            </div>
            <h4 className="text-lg font-bold text-[#654321]">{value}</h4>
          </div>
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
            <ArrowUpRight className="h-3 w-3" />
            <span>{changePercentage}%</span>
          </div>
        </div>
        <div className="mt-0.5 text-xs text-[#654321]/70">
          كان {previousValue} في الأسبوع الماضي
        </div>
      </div>
    </div>
  );
};

export default PerformanceIndicator;
