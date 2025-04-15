
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Download } from "lucide-react";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AnalyticsTab = () => {
  const [activeMetric, setActiveMetric] = useState<string>("engagement");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">التحليلات</h2>
          <p className="text-muted-foreground">عرض ملخص للبيانات التحليلية</p>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2 border-beauty-purple/20 hover:bg-beauty-purple/5 text-beauty-purple">
          <Download className="h-4 w-4" />
          <span>صدّر التقرير</span>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 bg-background border border-muted rounded-lg p-1">
          <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple">
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="content" className="rounded-md data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple">
            أداء المحتوى
          </TabsTrigger>
          <TabsTrigger value="audience" className="rounded-md data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple">
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
              <p className="text-muted-foreground">
                معلومات تحليلية مفصلة عن أداء المحتوى المنشور على مختلف المنصات.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audience" className="mt-0 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الجمهور</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                معلومات تفصيلية عن خصائص وسلوك الجمهور المستهدف.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsTab;
