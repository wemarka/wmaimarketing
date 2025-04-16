
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { motion } from "framer-motion";
import { BarChart3, PieChart } from "lucide-react";

const AnalyticsTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{t("dashboard.analytics.title", "التحليلات")}</h2>
        </div>
        
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="bg-muted/50 text-sm text-muted-foreground px-3 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            آخر 7 أيام
          </motion.div>
          
          <motion.div 
            className="bg-muted/50 text-sm text-muted-foreground px-3 py-1 rounded-full flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <PieChart className="h-3 w-3" /> رسم بياني
          </motion.div>
        </motion.div>
      </div>
      
      <Card className="overflow-hidden border-none shadow-sm">
        <CardContent className="p-0">
          <AnalyticsDashboard />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
