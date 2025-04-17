
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, BarChart2, RefreshCw } from "lucide-react";
import SentimentAnalysisChart from './SentimentAnalysisChart';
import TopHashtagsChart from './TopHashtagsChart';
import MentionsTrendChart from './MentionsTrendChart';
import InfluencersList from './InfluencersList';
import MentionsList from './MentionsList';

const SocialListening = () => {
  const [competitor, setCompetitor] = useState("all");
  const [timeframe, setTimeframe] = useState("month");
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold">الاستماع الاجتماعي</h2>
        <div className="flex flex-wrap gap-2">
          <Select value={competitor} onValueChange={setCompetitor}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر المنافس" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المنافسين</SelectItem>
              <SelectItem value="comp1">منافس 1</SelectItem>
              <SelectItem value="comp2">منافس 2</SelectItem>
              <SelectItem value="comp3">منافس 3</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">آخر أسبوع</SelectItem>
              <SelectItem value="month">آخر شهر</SelectItem>
              <SelectItem value="quarter">آخر 3 أشهر</SelectItem>
              <SelectItem value="year">سنة كاملة</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="mentions">الذكر في المحادثات</TabsTrigger>
          <TabsTrigger value="influencers">المؤثرون</TabsTrigger>
          <TabsTrigger value="analysis">تحليل متقدم</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">736</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">إجمالي الذكر</p>
                <p className="text-xs text-green-600 mt-1">+12.5% من الشهر الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">83%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">معدل المشاعر الإيجابية</p>
                <p className="text-xs text-green-600 mt-1">+5.3% من الشهر الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">128</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">عدد المؤثرين</p>
                <p className="text-xs text-amber-600 mt-1">-2.1% من الشهر الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">1.2M</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">إجمالي الوصول</p>
                <p className="text-xs text-green-600 mt-1">+18.7% من الشهر الماضي</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SentimentAnalysisChart />
            <TopHashtagsChart />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>اتجاه الذكر</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <MentionsTrendChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mentions" className="space-y-6 mt-6">
          <MentionsList />
        </TabsContent>
        
        <TabsContent value="influencers" className="space-y-6 mt-6">
          <InfluencersList />
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>التحليل المتقدم</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">تحليل متقدم للسمعة الاجتماعية، سيتم تطويره قريبًا.</p>
              <Button className="mt-4" disabled>
                <BarChart2 className="h-4 w-4 mr-2" />
                عرض التحليل المتقدم
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialListening;
