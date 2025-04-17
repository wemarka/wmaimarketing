
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Grid } from "lucide-react";
import PerformanceIndicator from "./PerformanceIndicator";
import InsightsCard from "./InsightsCard";

interface PerformanceDataItem {
  title: string;
  value: string;
  previousValue: string;
  changePercentage: number;
  icon: React.ReactNode;
  indicatorColor: string;
  sparklineData: { value: number }[];
  tooltip: string;
}

interface PerformanceOverviewProps {
  performanceData: PerformanceDataItem[];
}

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({ performanceData }) => {
  // Insights data
  const insights = [
    {
      color: "bg-green-500",
      title: "أفضل أيام الأسبوع",
      description: "يوم الخميس يشهد أعلى معدل تفاعل بنسبة 7.2%"
    },
    {
      color: "bg-amber-500",
      title: "أفضل المناطق",
      description: "المملكة العربية السعودية والإمارات والكويت الأكثر تفاعلاً"
    },
    {
      color: "bg-blue-500",
      title: "أفضل المنصات",
      description: "تيك توك يتفوق على المنصات الأخرى بنسبة 42% من التفاعل"
    }
  ];

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {performanceData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PerformanceIndicator
              title={item.title}
              value={item.value}
              previousValue={item.previousValue}
              changePercentage={item.changePercentage}
              icon={item.icon}
              indicatorColor={item.indicatorColor}
              sparklineData={item.sparklineData}
              tooltip={item.tooltip}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Main performance chart section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>تحليل الأداء الأسبوعي</CardTitle>
            <CardDescription>تتبع تقدم المؤشرات الرئيسية خلال الأسبوع الماضي</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center bg-muted/10 rounded-lg border border-dashed">
              <div className="flex flex-col items-center text-muted-foreground">
                <Grid className="h-10 w-10 mb-2" />
                <p>مخطط الأداء التفصيلي</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Sidebar insights */}
        <InsightsCard
          title="أهم الإحصائيات"
          description="معلومات قد تهمك حول الأداء الحالي"
          insights={insights}
        />
      </div>
    </>
  );
};

export default PerformanceOverview;
