
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { motion } from "framer-motion";
import { BarChart3, PieChart, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const AnalyticsTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            {t("dashboard.analytics.title", "التحليلات")}
          </h2>
        </motion.div>
        
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5 bg-white/50 border-muted hover:bg-white/80">
                <Filter className="h-3.5 w-3.5" />
                <span>فلترة</span>
                <ChevronDown className="h-3.5 w-3.5 ms-1 opacity-70" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-2">
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm">آخر 7 أيام</Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm">آخر 30 يوم</Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm">هذا الشهر</Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm">الربع الماضي</Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5 bg-white/50 border-muted hover:bg-white/80">
                <PieChart className="h-3.5 w-3.5" />
                <span>نوع الرسم البياني</span>
                <ChevronDown className="h-3.5 w-3.5 ms-1 opacity-70" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48 p-2">
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm">خطي</Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm">عمودي</Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm">دائري</Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm">مساحي</Button>
              </div>
            </PopoverContent>
          </Popover>
        </motion.div>
      </div>
      
      <Card className="overflow-hidden border-none shadow-sm bg-white/70 backdrop-blur-sm">
        <CardContent className="p-0">
          <AnalyticsDashboard />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
