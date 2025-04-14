
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { ResponsiveContainer, ComposedChart, AreaChart, BarChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";

const CampaignPerformance = () => {
  const [period, setPeriod] = useState("30days");
  const [campaignType, setCampaignType] = useState("all");

  // Mock data for charts
  const lineChartData = [
    { name: "يناير", views: 4000, engagement: 2400, amt: 2400 },
    { name: "فبراير", views: 3000, engagement: 1398, amt: 2210 },
    { name: "مارس", views: 2000, engagement: 9800, amt: 2290 },
    { name: "أبريل", views: 2780, engagement: 3908, amt: 2000 },
    { name: "مايو", views: 1890, engagement: 4800, amt: 2181 },
    { name: "يونيو", views: 2390, engagement: 3800, amt: 2500 },
    { name: "يوليو", views: 3490, engagement: 4300, amt: 2100 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">أداء الحملات</h2>
          <p className="text-muted-foreground">تحليل شامل للحملات التسويقية</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={campaignType} onValueChange={setCampaignType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="نوع الحملة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحملات</SelectItem>
              <SelectItem value="product">حملات المنتجات</SelectItem>
              <SelectItem value="brand">حملات العلامة التجارية</SelectItem>
              <SelectItem value="seasonal">حملات موسمية</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">اختيار التاريخ</Button>
          <Button variant="outline">تصدير البيانات</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ملخص الحملات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">إجمالي الحملات</p>
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-green-500">+3 عن الشهر الماضي</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">متوسط المشاهدات</p>
              <p className="text-2xl font-bold">23,450</p>
              <p className="text-xs text-green-500">+12% عن الشهر الماضي</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">متوسط التفاعل</p>
              <p className="text-2xl font-bold">4.7%</p>
              <p className="text-xs text-red-500">-0.3% عن الشهر الماضي</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">عائد الاستثمار</p>
              <p className="text-2xl font-bold">2.4x</p>
              <p className="text-xs text-green-500">+0.2x عن الشهر الماضي</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">الأداء العام</TabsTrigger>
          <TabsTrigger value="engagement">التفاعل</TabsTrigger>
          <TabsTrigger value="conversion">معدلات التحويل</TabsTrigger>
          <TabsTrigger value="roi">العائد على الاستثمار</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>أداء الحملات عبر الوقت</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="views" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="engagement" fill="#82ca9d" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أفضل الحملات أداءً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="views" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>مقارنة أداء الحملات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="views" fill="#8884d8" stroke="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-6 mt-6">
          {/* محتوى تحليلات التفاعل */}
        </TabsContent>
        
        <TabsContent value="conversion" className="space-y-6 mt-6">
          {/* محتوى تحليلات التحويل */}
        </TabsContent>
        
        <TabsContent value="roi" className="space-y-6 mt-6">
          {/* محتوى تحليلات العائد على الاستثمار */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignPerformance;
