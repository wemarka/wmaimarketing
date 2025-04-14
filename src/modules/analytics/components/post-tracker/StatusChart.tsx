
import React from "react";
import { StatusInfo } from "./types";

interface StatusChartProps {
  statuses: StatusInfo[];
  totalPosts: number;
}

const StatusChart: React.FC<StatusChartProps> = ({ statuses, totalPosts }) => {
  // حساب النسب المئوية للرسم البياني
  const getPercentage = (count: number) => {
    return (count / totalPosts) * 100;
  };

  return (
    <div className="space-y-4">
      {/* مخطط بياني دائري سريع الاستجابة */}
      <div className="relative pt-2">
        <div className="h-40 w-40 mx-auto">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {statuses.map((status, index) => {
              // حساب قيم المخطط الدائري
              const percentage = getPercentage(status.count);
              const dashArray = 2 * Math.PI * 25; // محيط الدائرة (2πr)
              const dashOffset = dashArray - (dashArray * percentage) / 100;
              const prevPercentages = statuses
                .slice(0, index)
                .reduce((sum, s) => sum + getPercentage(s.count), 0);
              
              // تعيين الألوان حسب حالة المنشور
              let strokeColor = "";
              if (index === 0) strokeColor = "stroke-green-500"; // منشورة
              if (index === 1) strokeColor = "stroke-yellow-500"; // مجدولة
              if (index === 2) strokeColor = "stroke-blue-500"; // قيد الانتظار
              if (index === 3) strokeColor = "stroke-red-500"; // مرفوضة
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  strokeWidth="12"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  style={{
                    transformOrigin: "50% 50%",
                    transform: `rotate(${prevPercentages * 3.6}deg)`,
                  }}
                  className={cn("transition-all", strokeColor)}
                />
              );
            })}
            <circle cx="50" cy="50" r="18" className="fill-card" />
            <text
              x="50"
              y="50"
              dominantBaseline="middle"
              textAnchor="middle"
              className="fill-foreground text-lg font-bold"
            >
              {totalPosts}
            </text>
            <text
              x="50"
              y="60"
              dominantBaseline="middle"
              textAnchor="middle"
              className="fill-muted-foreground text-[9px]"
            >
              منشور
            </text>
          </svg>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {statuses.map((status, index) => {
            let dotColor = "";
            if (index === 0) dotColor = "bg-green-500";
            if (index === 1) dotColor = "bg-yellow-500";
            if (index === 2) dotColor = "bg-blue-500";
            if (index === 3) dotColor = "bg-red-500";
            
            return (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${dotColor}`} />
                <div className="text-sm">
                  <span className="font-medium">{status.count}</span>
                  <span className="text-muted-foreground mr-1">
                    ({Math.round(getPercentage(status.count))}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* جدول بيانات المنشورات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {statuses.map((status, index) => (
          <div 
            key={index} 
            className={cn(
              "p-3 rounded-md border text-center transition-colors", 
              status.bgClass,
              status.borderClass
            )}
          >
            <div className="flex justify-center mb-2">{status.icon}</div>
            <p className="text-2xl font-bold">{status.count}</p>
            <p className="text-xs text-muted-foreground">{status.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusChart;
