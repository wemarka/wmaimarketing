
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import CampaignPerformance from "@/components/analytics/CampaignPerformance";
import ProductPerformance from "@/components/analytics/ProductPerformance";
import PostPerformance from "@/components/analytics/PostPerformance";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">التحليلات والتقارير</h1>
            <p className="text-muted-foreground max-w-2xl">
              تتبع أداء التسويق وفهم ما يناسب جمهورك المستهدف
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="campaigns">الحملات</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="posts">المنشورات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <AnalyticsDashboard />
          </TabsContent>
          
          <TabsContent value="campaigns">
            <CampaignPerformance />
          </TabsContent>
          
          <TabsContent value="products">
            <ProductPerformance />
          </TabsContent>
          
          <TabsContent value="posts">
            <PostPerformance />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
