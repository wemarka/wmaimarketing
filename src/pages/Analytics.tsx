
import React, { useEffect, useState } from "react";
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
  const [activeTab, setActiveTab] = useState("dashboard");

  // Listen for sub-tab changes from the header
  useEffect(() => {
    const handleSubTabChange = (event: CustomEvent) => {
      if (event.detail.subtab) {
        // Map the header tabs to our local tabs
        const tabMapping: Record<string, string> = {
          "overview": "dashboard",
          "performance": "posts",
          "campaigns": "campaigns"
        };
        
        setActiveTab(tabMapping[event.detail.subtab] || event.detail.subtab);
      }
    };

    // Add event listener
    window.addEventListener('sub-tab-change' as any, handleSubTabChange as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('sub-tab-change' as any, handleSubTabChange as EventListener);
    };
  }, []);

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

      <Tabs value={activeTab} className="space-y-4" onValueChange={setActiveTab}>
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
