
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  className?: string;
  trend?: "day" | "week" | "month" | "year";
}

const StatCard = ({
  icon,
  title,
  value,
  change,
  positive,
  className,
  trend = "week"
}: StatCardProps) => {
  const { t } = useTranslation();
  
  const getTrendText = () => {
    switch(trend) {
      case "day": return t("dashboard.trends.vsYesterday");
      case "week": return t("dashboard.trends.vsLastWeek");
      case "month": return t("dashboard.trends.vsLastMonth");
      case "year": return t("dashboard.trends.vsLastYear");
      default: return t("dashboard.trends.vsLastWeek");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className={cn("overflow-hidden hover:shadow-md transition-all", className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{title}</p>
              <p className="text-3xl font-semibold mt-1">{value}</p>
              {change && (
                <p className={cn("text-xs font-medium mt-2", 
                  positive ? "text-green-500" : "text-red-500")}>
                  {positive ? "+" : "-"}{change} {getTrendText()}
                </p>
              )}
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 p-3 rounded-lg shadow-sm">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
