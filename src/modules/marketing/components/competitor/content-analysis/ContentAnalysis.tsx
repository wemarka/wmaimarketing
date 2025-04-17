
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import KeywordAnalysisChart from './KeywordAnalysisChart';
import ContentTypeDistribution from './ContentTypeDistribution';
import TopPerformingContent from './TopPerformingContent';
import ContentCalendar from './ContentCalendar';
import { Button } from "@/components/ui/button";
import { Download, Calendar, RefreshCw } from "lucide-react";

const ContentAnalysis = () => {
  const [competitor, setCompetitor] = useState("all");
  const [timeframe, setTimeframe] = useState("month");
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold">تحليل المحتوى</h2>
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
          <TabsTrigger value="keywords">الكلمات المفتاحية</TabsTrigger>
          <TabsTrigger value="calendar">تقويم المحتوى</TabsTrigger>
          <TabsTrigger value="top">أفضل المحتويات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">48</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">إجمالي المنشورات</p>
                <p className="text-xs text-green-600 mt-1">+8.5% من الشهر الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">3.2%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">معدل التفاعل</p>
                <p className="text-xs text-green-600 mt-1">+0.3% من الشهر الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">12</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">منشورات مميزة</p>
                <p className="text-xs text-amber-600 mt-1">-2 من الشهر الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">4.8</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">معدل النشر اليومي</p>
                <p className="text-xs text-green-600 mt-1">+0.5 من الشهر الماضي</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <KeywordAnalysisChart />
            <ContentTypeDistribution />
          </div>
          
          <TopPerformingContent limit={5} />
        </TabsContent>
        
        <TabsContent value="keywords" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <KeywordAnalysisChart />
            <Card className="h-full">
              <CardHeader>
                <CardTitle>تطور الكلمات المفتاحية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">سيتم تطوير هذه الميزة قريبًا.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>جدول النشر</CardTitle>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                عرض بالأسبوع
              </Button>
            </CardHeader>
            <CardContent>
              <ContentCalendar />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="top" className="space-y-6 mt-6">
          <TopPerformingContent limit={10} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentAnalysis;
