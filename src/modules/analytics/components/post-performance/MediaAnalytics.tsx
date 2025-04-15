
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// نوع البيانات للوسائط
interface MediaAnalytics {
  type: string;
  count: number;
  engagementRate: number;
  clickRate: number;
  conversionRate: number;
  totalViews: number;
}

// البيانات الافتراضية للوسائط
const mediaData: MediaAnalytics[] = [
  {
    type: "صور",
    count: 42,
    engagementRate: 4.8,
    clickRate: 2.7,
    conversionRate: 1.2,
    totalViews: 24500
  },
  {
    type: "فيديو",
    count: 18,
    engagementRate: 6.2,
    clickRate: 3.5,
    conversionRate: 1.8,
    totalViews: 18700
  },
  {
    type: "كاروسيل",
    count: 12,
    engagementRate: 5.5,
    clickRate: 2.9,
    conversionRate: 1.5,
    totalViews: 12300
  },
  {
    type: "بدون وسائط",
    count: 8,
    engagementRate: 2.1,
    clickRate: 1.2,
    conversionRate: 0.6,
    totalViews: 5800
  }
];

// ألوان للرسوم البيانية
const COLORS = ['#9b87f5', '#D946EF', '#F59E0B', '#6366F1'];

const MediaAnalytics: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<string>("month");
  
  // بيانات للرسم البياني الشريطي
  const barChartData = mediaData.map(item => ({
    name: item.type,
    "نسبة التفاعل": item.engagementRate,
    "نسبة النقرات": item.clickRate,
    "نسبة التحويل": item.conversionRate
  }));
  
  // بيانات للرسم البياني الدائري
  const pieChartData = mediaData.map(item => ({
    name: item.type,
    value: item.totalViews
  }));
  
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">تحليل أداء الوسائط</CardTitle>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر الفترة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">آخر أسبوع</SelectItem>
            <SelectItem value="month">آخر شهر</SelectItem>
            <SelectItem value="quarter">آخر 3 أشهر</SelectItem>
            <SelectItem value="year">آخر سنة</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="engagement">التفاعل</TabsTrigger>
            <TabsTrigger value="types">أنواع الوسائط</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {mediaData.map((item, index) => (
                <Card key={index} className="bg-gray-50 dark:bg-gray-800/50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center rounded-lg p-2 mb-2`} 
                        style={{ backgroundColor: `${COLORS[index]}20`, color: COLORS[index] }}>
                        <span className="text-xl font-bold">{item.count}</span>
                      </div>
                      <h3 className="text-sm font-medium">{item.type}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.totalViews.toLocaleString()} مشاهدة</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">معدلات الأداء حسب نوع الوسائط</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={barChartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="نسبة التفاعل" fill="#9b87f5" />
                        <Bar dataKey="نسبة النقرات" fill="#D946EF" />
                        <Bar dataKey="نسبة التحويل" fill="#F59E0B" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">توزيع المشاهدات حسب نوع الوسائط</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => value.toLocaleString()} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="flex justify-center items-center p-8">
              <p className="text-muted-foreground">سيتم إضافة بيانات التفاعل التفصيلية قريباً</p>
            </div>
          </TabsContent>
          
          <TabsContent value="types" className="space-y-4">
            <div className="flex justify-center items-center p-8">
              <p className="text-muted-foreground">سيتم إضافة تفاصيل أنواع الوسائط قريباً</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MediaAnalytics;
