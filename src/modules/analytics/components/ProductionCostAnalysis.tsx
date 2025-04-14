
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, LineChart } from "@/components/ui/chart";
import { DateRangePicker } from "@/components/ui/date-range-picker";

const ProductionCostAnalysis = () => {
  const [contentType, setContentType] = useState("all");
  const [period, setPeriod] = useState("month");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">تحليل تكاليف الإنتاج</h2>
          <p className="text-muted-foreground">تحليل تفصيلي لتكاليف إنتاج المحتوى</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="نوع المحتوى" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المحتويات</SelectItem>
              <SelectItem value="photo">الصور</SelectItem>
              <SelectItem value="video">الفيديو</SelectItem>
              <SelectItem value="design">التصاميم</SelectItem>
              <SelectItem value="copywriting">كتابة المحتوى</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker />
          <Button variant="outline">تصدير البيانات</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>ملخص التكاليف</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">إجمالي التكاليف</p>
              <p className="text-2xl font-bold">78,450 ر.س</p>
              <p className="text-xs text-green-500">-5.2% عن الفترة السابقة</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">متوسط تكلفة المحتوى</p>
              <p className="text-2xl font-bold">1,250 ر.س</p>
              <p className="text-xs text-green-500">-120 ر.س عن الفترة السابقة</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">عدد المحتويات المنتجة</p>
              <p className="text-2xl font-bold">62</p>
              <p className="text-xs text-green-500">+8 عن الفترة السابقة</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">نسبة العائد على التكلفة</p>
              <p className="text-2xl font-bold">3.4x</p>
              <p className="text-xs text-green-500">+0.2x عن الفترة السابقة</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="by-type">
        <TabsList>
          <TabsTrigger value="by-type">حسب النوع</TabsTrigger>
          <TabsTrigger value="by-platform">حسب المنصة</TabsTrigger>
          <TabsTrigger value="by-campaign">حسب الحملة</TabsTrigger>
          <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="by-type" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع التكاليف حسب نوع المحتوى</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PieChart />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>مقارنة تكاليف أنواع المحتوى</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل تكاليف الإنتاج حسب النوع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-right border-b">
                      <th className="p-2 font-medium">نوع المحتوى</th>
                      <th className="p-2 font-medium">عدد القطع</th>
                      <th className="p-2 font-medium">إجمالي التكلفة</th>
                      <th className="p-2 font-medium">متوسط التكلفة</th>
                      <th className="p-2 font-medium">أعلى تكلفة</th>
                      <th className="p-2 font-medium">أقل تكلفة</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">الصور</td>
                      <td className="p-2">24</td>
                      <td className="p-2">18,750 ر.س</td>
                      <td className="p-2">780 ر.س</td>
                      <td className="p-2">1,500 ر.س</td>
                      <td className="p-2">450 ر.س</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">الفيديو</td>
                      <td className="p-2">12</td>
                      <td className="p-2">42,300 ر.س</td>
                      <td className="p-2">3,525 ر.س</td>
                      <td className="p-2">8,000 ر.س</td>
                      <td className="p-2">1,800 ر.س</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">التصاميم</td>
                      <td className="p-2">18</td>
                      <td className="p-2">10,800 ر.س</td>
                      <td className="p-2">600 ر.س</td>
                      <td className="p-2">1,200 ر.س</td>
                      <td className="p-2">350 ر.س</td>
                    </tr>
                    <tr>
                      <td className="p-2">كتابة المحتوى</td>
                      <td className="p-2">8</td>
                      <td className="p-2">6,400 ر.س</td>
                      <td className="p-2">800 ر.س</td>
                      <td className="p-2">1,200 ر.س</td>
                      <td className="p-2">500 ر.س</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="by-platform" className="space-y-6 mt-6">
          {/* محتوى تحليلات التكلفة حسب المنصة */}
        </TabsContent>
        
        <TabsContent value="by-campaign" className="space-y-6 mt-6">
          {/* محتوى تحليلات التكلفة حسب الحملة */}
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 mt-6">
          {/* محتوى تحليلات اتجاهات التكلفة */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductionCostAnalysis;
