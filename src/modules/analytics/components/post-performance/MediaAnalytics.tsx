
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarRange, TrendingUp, Users, BarChart, PieChart } from "lucide-react";
import { MediaTypePerformance } from "./MediaPerformanceCard";

const MediaAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-beauty-purple" />
            تحليل أداء المحتوى والوسائط
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="engagement" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="engagement">
                <Users className="h-4 w-4 mr-2" />
                التفاعل
              </TabsTrigger>
              <TabsTrigger value="platforms">
                <PieChart className="h-4 w-4 mr-2" />
                المنصات
              </TabsTrigger>
              <TabsTrigger value="schedule">
                <CalendarRange className="h-4 w-4 mr-2" />
                أوقات النشر
              </TabsTrigger>
            </TabsList>

            <TabsContent value="engagement" className="space-y-4">
              <h3 className="font-medium text-lg">أداء أنواع الوسائط</h3>
              <p className="text-muted-foreground">
                تحليل أداء أنواع المحتوى المختلفة بناءً على التفاعل والوصول
              </p>
              
              <MediaTypePerformance />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">معدل التفاعل حسب المنصة</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <BarChart className="h-16 w-16 text-muted-foreground/50" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">معدل النقر عبر أنواع المحتوى</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <PieChart className="h-16 w-16 text-muted-foreground/50" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="platforms" className="space-y-4">
              <h3 className="font-medium text-lg">تحليل الأداء حسب المنصة</h3>
              <p className="text-muted-foreground">
                مقارنة أداء المحتوى والتفاعل عبر منصات التواصل الاجتماعي المختلفة
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">مقارنة الوصول بين المنصات</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <BarChart className="h-16 w-16 text-muted-foreground/50" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">توزيع المتابعين عبر المنصات</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <PieChart className="h-16 w-16 text-muted-foreground/50" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <h3 className="font-medium text-lg">تحليل أفضل أوقات النشر</h3>
              <p className="text-muted-foreground">
                اكتشف الأوقات التي تحقق أعلى معدلات التفاعل والوصول لمنشوراتك
              </p>
              
              <div className="grid grid-cols-1 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">معدل التفاعل حسب اليوم والساعة</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <CalendarRange className="h-16 w-16 text-muted-foreground/50" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaAnalytics;
