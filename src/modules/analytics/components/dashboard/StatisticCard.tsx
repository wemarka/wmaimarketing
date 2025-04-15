
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

export interface StatisticCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  iconBgClass: string;
  positive?: boolean;
  showSpark?: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  change,
  icon,
  iconBgClass,
  positive = true,
  showSpark = false,
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // استخدام useMemo لتجنب إعادة حساب القيم في كل تصيير
  const parsedChangeValue = useMemo(() => parseFloat(change), [change]);
  const isPositive = useMemo(() => positive || parsedChangeValue >= 0, [positive, parsedChangeValue]);
  const showExceptionalPerformance = useMemo(
    () => isPositive && parsedChangeValue > 15,
    [isPositive, parsedChangeValue]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(155, 135, 245, 0.1), 0 8px 10px -6px rgba(155, 135, 245, 0.1)" }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-beauty-purple/10 dark:border-beauty-purple/20">
        <CardContent className={cn(
          "p-6",
          isMobile && "p-4"
        )}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{title}</p>
              <p className={cn(
                "text-2xl font-semibold bg-gradient-to-r from-beauty-purple to-beauty-lightpurple bg-clip-text text-transparent",
                isMobile && "text-xl"
              )}>{value}</p>
              <div className={cn(
                "flex items-center mt-1", 
                isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-400',
                "text-sm"
              )}>
                {isPositive ? 
                  <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                }
                <span>{Math.abs(parsedChangeValue)}% من الأسبوع الماضي</span>
              </div>
            </div>
            <div className={cn(
              "p-2 rounded-md relative",
              iconBgClass,
              "dark:bg-opacity-30"
            )}>
              {icon}
              {showSpark && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-3 w-3 text-beauty-gold" />
                </div>
              )}
            </div>
          </div>
          
          {showExceptionalPerformance && (
            <div className="mt-3 pt-3 border-t dark:border-slate-700 border-beauty-purple/10">
              <div className="text-xs text-green-600 dark:text-green-500 flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                <span>أداء استثنائي مقارنة بالفترات السابقة</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// تصدير تركيب يستخدم React.memo لمنع إعادة التصيير غير الضرورية
export default React.memo(StatisticCard);
