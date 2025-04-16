
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerformanceCard from "../cards/PerformanceCard";
import { useTranslation } from "react-i18next";
import { AreaChart, BarChart3, TrendingUp } from "lucide-react";

const PerformanceTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("dashboard.performance.title", "الأداء")}</h2>
      </div>
      
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="mb-6 bg-muted/20">
          <TabsTrigger value="sales" className="data-[state=active]:bg-primary/10 gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>{t("dashboard.performance.sales", "المبيعات")}</span>
          </TabsTrigger>
          <TabsTrigger value="revenue" className="data-[state=active]:bg-primary/10 gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>{t("dashboard.performance.revenue", "الإيرادات")}</span>
          </TabsTrigger>
          <TabsTrigger value="growth" className="data-[state=active]:bg-primary/10 gap-2">
            <AreaChart className="h-4 w-4" />
            <span>{t("dashboard.performance.growth", "النمو")}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceCard />
            
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.performance.salesBreakdown", "تفاصيل المبيعات")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t("dashboard.performance.salesDetails", "يعرض هذا القسم تفاصيل المبيعات حسب المنتج والمنطقة")}</p>
                {/* Placeholder for sales breakdown chart */}
                <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center mt-4">
                  <p className="text-muted">{t("dashboard.performance.comingSoon", "قريباً")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.performance.salesTrend", "اتجاهات المبيعات")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t("dashboard.performance.trendDetails", "تحليل اتجاهات المبيعات على مدار الوقت")}</p>
                {/* Placeholder for sales trend chart */}
                <div className="h-80 bg-muted/10 rounded-lg flex items-center justify-center mt-4">
                  <p className="text-muted">{t("dashboard.performance.comingSoon", "قريباً")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.performance.revenueAnalysis", "تحليل الإيرادات")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("dashboard.performance.revenueDetails", "تحليل مفصل لمصادر الإيرادات")}</p>
              {/* Placeholder for revenue analysis */}
              <div className="h-96 bg-muted/10 rounded-lg flex items-center justify-center mt-4">
                <p className="text-muted">{t("dashboard.performance.comingSoon", "قريباً")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="growth" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.performance.growthMetrics", "مقاييس النمو")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("dashboard.performance.growthDetails", "قياس معدلات النمو والتطور")}</p>
              {/* Placeholder for growth metrics */}
              <div className="h-96 bg-muted/10 rounded-lg flex items-center justify-center mt-4">
                <p className="text-muted">{t("dashboard.performance.comingSoon", "قريباً")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceTab;
