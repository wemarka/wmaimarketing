
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";

// Import the analytics components
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

      <Tabs value={activeTab} className="space-y-4">
        <TabsContent value="dashboard" className="animate-fade-in">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="campaigns" className="animate-fade-in">
          <CampaignPerformance />
        </TabsContent>

        <TabsContent value="posts" className="animate-fade-in">
          <PostPerformance />
        </TabsContent>

        <TabsContent value="products" className="animate-fade-in">
          <ProductPerformance />
        </TabsContent>

        <TabsContent value="costs" className="animate-fade-in">
          <ProductionCostAnalysis />
        </TabsContent>

        <TabsContent value="recommendations" className="animate-fade-in">
          <ContentRecommendations />
        </TabsContent>

        <TabsContent value="status" className="animate-fade-in">
          <PostStatusTracker />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Analytics;
