
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  className?: string;
}

const StatCard = ({
  icon,
  title,
  value,
  change,
  positive,
  className
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
            {change && (
              <p className={cn("text-xs font-medium mt-1", 
                positive ? "text-green-500" : "text-red-500")}>
                {positive ? "+" : "-"}{change} from last month
              </p>
            )}
          </div>
          <div className="bg-muted p-2 rounded-md">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
