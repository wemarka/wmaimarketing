
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
  const changeValue = parseFloat(change);
  const isPositive = positive || changeValue >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-all">
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
                <span>{Math.abs(changeValue)}% من الأسبوع الماضي</span>
              </div>
            </div>
            <div className={`p-2 rounded-md ${iconBgClass} relative`}>
              {icon}
              {showSpark && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-3 w-3 text-beauty-gold" />
                </div>
              )}
            </div>
          </div>
          
          {isPositive && changeValue > 15 && (
            <div className="mt-3 pt-3 border-t">
              <div className="text-xs text-green-600 flex items-center">
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

export default StatisticCard;
