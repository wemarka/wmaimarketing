
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const PopularityCard = () => {
  const popularityScore = 78;
  const improvementRate = 12;
  
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-primary">
          <TrendingUp className="h-4 w-4" />
          مؤشر الشعبية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          {/* Simplified Score Display */}
          <div className="relative flex flex-col items-center justify-center pt-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <div className="text-5xl font-bold text-primary">
                {popularityScore}
              </div>
              <div className="text-xl text-primary/80 mt-2">%</div>
            </motion.div>
            
            <p className="text-sm text-muted-foreground mt-2">
              درجة الشعبية تظهر تفاعل الجمهور الإيجابي
            </p>
          </div>
          
          {/* Simplified Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">مقياس الشعبية</span>
              <span className="text-sm font-medium">{popularityScore}%</span>
            </div>
            <Progress value={popularityScore} className="h-2" />
          </div>
          
          {/* Improvement Rate */}
          <div className="pt-2 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-green-500" />
            <span className="text-sm font-medium text-green-500">+{improvementRate}%</span>
            <span className="text-sm text-muted-foreground mr-1">منذ الشهر الماضي</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularityCard;
