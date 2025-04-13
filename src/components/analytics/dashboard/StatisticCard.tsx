
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatisticCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  iconBgClass: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  change,
  icon,
  iconBgClass,
}) => {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
            <div className={`flex items-center mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'} text-sm`}>
              {isPositive ? 
                <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                <ArrowDownRight className="h-3 w-3 mr-1" />
              }
              <span>{Math.abs(change)}% من الأسبوع الماضي</span>
            </div>
          </div>
          <div className={`p-2 rounded-md ${iconBgClass}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
