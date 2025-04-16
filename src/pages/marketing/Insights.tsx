
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, BarChart, Calendar, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MarketingInsights = () => {
  return (
    <Layout>
      <Helmet>
        <title>الإحصاءات - سيركل</title>
      </Helmet>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <BarChart className="h-6 w-6" /> الإحصاءات
            </h1>
            <p className="text-muted-foreground">تحليل ورؤى تسويقية للحملات والأداء</p>
          </div>
          <Button variant="outline" className="shrink-0">
            <Download className="h-4 w-4 mr-2" />
            تصدير التقرير
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <h3 className="text-lg font-medium">الفترة الزمنية</h3>
              <div className="flex gap-3 w-full md:w-auto">
                <Select defaultValue="month">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="اختر الفترة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">الأسبوع الماضي</SelectItem>
                    <SelectItem value="month">الشهر الماضي</SelectItem>
                    <SelectItem value="quarter">الربع الماضي</SelectItem>
                    <SelectItem value="year">السنة الماضية</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="performance">الأداء</TabsTrigger>
                <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
                <TabsTrigger value="competitors">المنافسين</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">إجمالي الزيارات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">معدل التفاعل</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">معدل التحويل</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0%</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="performance">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد بيانات أداء متاحة</p>
                </div>
              </TabsContent>
              <TabsContent value="trends">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد بيانات اتجاهات متاحة</p>
                </div>
              </TabsContent>
              <TabsContent value="competitors">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد بيانات منافسين متاحة</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </Layout>
  );
};

export default MarketingInsights;
