
import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// تحديث الاستيرادات من الهيكل النمطي الجديد
import {
  AnalyticsDashboard,
  CampaignPerformance,
  ProductPerformance,
  ProductionCostAnalysis,
  ContentRecommendations,
  PostPerformance,
  PostStatusTracker
} from "@/modules/analytics/components";

const Analytics = () => {
  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">التحليلات والإحصائيات</h1>
          <p className="text-muted-foreground">
            متابعة وتحليل أداء المحتوى والحملات التسويقية
          </p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="flex flex-wrap gap-2 justify-start">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="campaigns">الحملات</TabsTrigger>
          <TabsTrigger value="posts">المنشورات</TabsTrigger>
          <TabsTrigger value="products">المنتجات</TabsTrigger>
          <TabsTrigger value="costs">تكاليف الإنتاج</TabsTrigger>
          <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
          <TabsTrigger value="status">حالة النشر</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignPerformance />
        </TabsContent>

        <TabsContent value="posts">
          <PostPerformance />
        </TabsContent>

        <TabsContent value="products">
          <ProductPerformance />
        </TabsContent>

        <TabsContent value="costs">
          <ProductionCostAnalysis />
        </TabsContent>

        <TabsContent value="recommendations">
          <ContentRecommendations />
        </TabsContent>

        <TabsContent value="status">
          <PostStatusTracker />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Analytics;
