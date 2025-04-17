
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SentimentAnalysisChart from './social-listening/SentimentAnalysisChart';
import MentionsTable from './social-listening/MentionsTable';
import TopHashtagsChart from './social-listening/TopHashtagsChart';

const SocialListening = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">المشاعر العامة</CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentAnalysisChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">الهاشتاجات الأكثر استخدامًا</CardTitle>
          </CardHeader>
          <CardContent>
            <TopHashtagsChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">المنصات النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <p className="text-muted-foreground">البيانات قيد التحميل...</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>ذكر العلامات التجارية</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="positive">إيجابية</TabsTrigger>
              <TabsTrigger value="neutral">محايدة</TabsTrigger>
              <TabsTrigger value="negative">سلبية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <MentionsTable sentiment="all" />
            </TabsContent>
            
            <TabsContent value="positive">
              <MentionsTable sentiment="positive" />
            </TabsContent>
            
            <TabsContent value="neutral">
              <MentionsTable sentiment="neutral" />
            </TabsContent>
            
            <TabsContent value="negative">
              <MentionsTable sentiment="negative" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialListening;
