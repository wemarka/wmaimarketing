
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Download, PieChart, LineChart, Users } from "lucide-react";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AnalyticsTab = () => {
  const [activeMetric, setActiveMetric] = useState<string>("engagement");

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-beauty-purple to-beauty-lightpurple bg-clip-text text-transparent">التحليلات</h2>
          <p className="text-muted-foreground">عرض ملخص للبيانات التحليلية</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 border-beauty-purple/20 hover:bg-beauty-purple/5 text-beauty-purple hover:shadow-sm transition-all"
        >
          <Download className="h-4 w-4" />
          <span>صدّر التقرير</span>
        </Button>
      </motion.div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 bg-background border border-muted rounded-lg p-1">
          <TabsTrigger 
            value="overview" 
            className="rounded-md data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple"
          >
            <BarChart className="h-4 w-4 mr-2" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger 
            value="content" 
            className="rounded-md data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple"
          >
            <PieChart className="h-4 w-4 mr-2" />
            أداء المحتوى
          </TabsTrigger>
          <TabsTrigger 
            value="audience" 
            className="rounded-md data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple"
          >
            <Users className="h-4 w-4 mr-2" />
            الجمهور
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-0 animate-fade-in">
          <AnalyticsDashboard />
        </TabsContent>
        <TabsContent value="content" className="mt-0 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>أداء المحتوى</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  معلومات تحليلية مفصلة عن أداء المحتوى المنشور على مختلف المنصات.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audience" className="mt-0 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الجمهور</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  معلومات تفصيلية عن خصائص وسلوك الجمهور المستهدف.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AnalyticsTab;
