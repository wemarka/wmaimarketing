
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Users, TrendingUp, BarChart3, ShoppingCart, Grid } from "lucide-react";

interface PerformanceTabsProps {
  children?: React.ReactNode;
}

const PerformanceTabs: React.FC<PerformanceTabsProps> = ({ children }) => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
        <TabsTrigger value="social">التواصل الاجتماعي</TabsTrigger>
        <TabsTrigger value="content">المحتوى</TabsTrigger>
        <TabsTrigger value="sales">المبيعات</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        {children}
      </TabsContent>
      
      <TabsContent value="social">
        <div className="grid grid-cols-1 gap-6">
          {/* SocialMediaPerformance component is rendered in the parent */}
        </div>
      </TabsContent>
      
      <TabsContent value="content">
        <div className="h-96 flex items-center justify-center bg-muted/10 rounded-lg border border-dashed">
          <div className="flex flex-col items-center text-muted-foreground">
            <Grid className="h-10 w-10 mb-2" />
            <p>قريباً - تحليلات المحتوى</p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="sales">
        <div className="h-96 flex items-center justify-center bg-muted/10 rounded-lg border border-dashed">
          <div className="flex flex-col items-center text-muted-foreground">
            <Grid className="h-10 w-10 mb-2" />
            <p>قريباً - تحليلات المبيعات</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PerformanceTabs;
