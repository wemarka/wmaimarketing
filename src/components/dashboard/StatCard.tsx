
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import AnimateInView from "@/components/ui/animate-in-view";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Percent, 
  DollarSign, 
  Users, 
  Hash,
  Sparkles
} from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  className?: string;
  trend?: "day" | "week" | "month" | "year";
  format?: "number" | "percentage" | "currency" | "none";
  animate?: boolean;
  delay?: number;
  featured?: boolean;
  animation?: "fade" | "slide-up" | "slide-right" | "slide-left" | "scale" | "bounce";
}

const StatCard = ({
  icon,
  title,
  value,
  change,
  positive,
  className,
  trend = "week",
  format = "none",
  animate = true,
  delay = 0,
  featured = false,
  animation = "slide-up"
}: StatCardProps) => {
  const { t } = useTranslation();
  
  const getTrendText = () => {
    switch(trend) {
      case "day": return t("dashboard.trends.vsYesterday", "من الأمس");
      case "week": return t("dashboard.trends.vsLastWeek", "من الأسبوع الماضي");
      case "month": return t("dashboard.trends.vsLastMonth", "من الشهر الماضي");
      case "year": return t("dashboard.trends.vsLastYear", "من السنة الماضية");
      default: return t("dashboard.trends.vsLastWeek", "من الأسبوع الماضي");
    }
  };

  const getFormatIcon = () => {
    switch(format) {
      case "percentage": return <Percent className="h-3 w-3 text-muted-foreground" />;
      case "currency": return <DollarSign className="h-3 w-3 text-muted-foreground" />;
      case "number": return <Hash className="h-3 w-3 text-muted-foreground" />;
      default: return null;
    }
  };

  const cardContent = (
    <Card className={cn(
      "overflow-hidden hover:shadow-md transition-all bg-card border rounded-lg", 
      featured && "border-primary/20 bg-primary/5 shadow-lg",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <div className="flex items-center gap-1">
              {getFormatIcon()}
              <p className="text-3xl font-semibold mt-1">{value}</p>
            </div>
            {change && (
              <p className={cn("text-xs font-medium mt-2 flex items-center gap-1", 
                positive ? "text-green-500" : "text-red-500")}>
                {positive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{change} {getTrendText()}</span>
              </p>
            )}
            {featured && (
              <div className="mt-2 pt-2 border-t border-primary/10">
                <span className="text-xs flex items-center gap-1 text-primary">
                  <Sparkles className="h-3 w-3" />
                  <span>{t("dashboard.stats.featured", "مميز")}</span>
                </span>
              </div>
            )}
          </div>
          <motion.div 
            className={cn(
              "p-3 rounded-lg shadow-sm",
              featured ? "bg-gradient-to-br from-primary/20 to-primary/5" : "bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900"
            )}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {icon}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );

  if (animate) {
    return (
      <AnimateInView
        animation={animation}
        delay={delay}
        className="w-full"
        once={true}
      >
        {cardContent}
      </AnimateInView>
    );
  }

  return cardContent;
};

export default StatCard;
