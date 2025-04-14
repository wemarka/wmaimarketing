
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, PieChart } from "@/components/ui/chart";

const ProductPerformance = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("views");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">أداء المنتجات</h2>
          <p className="text-muted-foreground">تحليل مبيعات وتفاعل العملاء مع المنتجات</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="فئة المنتج" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              <SelectItem value="skincare">العناية بالبشرة</SelectItem>
              <SelectItem value="makeup">المكياج</SelectItem>
              <SelectItem value="haircare">العناية بالشعر</SelectItem>
              <SelectItem value="fragrances">العطور</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="views">المشاهدات</SelectItem>
              <SelectItem value="sales">المبيعات</SelectItem>
              <SelectItem value="engagement">التفاعل</SelectItem>
              <SelectItem value="conversion">معدل التحويل</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">تصدير البيانات</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>ملخص أداء المنتجات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">عدد المنتجات</p>
              <p className="text-2xl font-bold">86</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">إجمالي المشاهدات</p>
              <p className="text-2xl font-bold">142,380</p>
              <p className="text-xs text-green-500">+8% عن الشهر الماضي</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">معدل التحويل</p>
              <p className="text-2xl font-bold">3.2%</p>
              <p className="text-xs text-green-500">+0.4% عن الشهر الماضي</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">متوسط قيمة الطلب</p>
              <p className="text-2xl font-bold">168 ر.س</p>
              <p className="text-xs text-red-500">-12 ر.س عن الشهر الماضي</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="categories">الفئات</TabsTrigger>
          <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
          <TabsTrigger value="comparison">المقارنة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>أداء المنتجات عبر الزمن</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <LineChart />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أفضل 10 منتجات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>توزيع التفاعل حسب الفئة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PieChart />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6 mt-6">
          {/* محتوى تحليلات الفئات */}
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 mt-6">
          {/* محتوى تحليلات الاتجاهات */}
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-6 mt-6">
          {/* محتوى المقارنة */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductPerformance;
