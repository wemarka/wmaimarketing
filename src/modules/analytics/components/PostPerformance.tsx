
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveContainer, BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line } from "recharts";
import { Eye, Heart, MessageSquare, Share2, TrendingUp, Filter, Download, RefreshCw } from "lucide-react";
import MediaAnalytics from "./post-performance/MediaAnalytics";

const PostPerformance = () => {
  const [platform, setPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("engagement");
  const [searchQuery, setSearchQuery] = useState("");
  const [timePeriod, setTimePeriod] = useState("month");
  
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
  
  const handleRefresh = () => {
    // في التطبيق الحقيقي، هنا سنقوم بإعادة جلب البيانات
    console.log("تحديث البيانات...");
  };
  
  const handleExport = () => {
    // في التطبيق الحقيقي، هنا سنقوم بتصدير البيانات
    console.log("تصدير البيانات...");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">أداء المنشورات</h2>
          <p className="text-muted-foreground">تحليل تفاعل الجمهور مع المحتوى المنشور</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input 
            placeholder="بحث في المنشورات" 
            className="w-[180px]" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="المنصة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المنصات</SelectItem>
              <SelectItem value="instagram">انستغرام</SelectItem>
              <SelectItem value="facebook">فيسبوك</SelectItem>
              <SelectItem value="tiktok">تيك توك</SelectItem>
              <SelectItem value="twitter">تويتر</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">آخر أسبوع</SelectItem>
              <SelectItem value="month">آخر شهر</SelectItem>
              <SelectItem value="quarter">آخر 3 أشهر</SelectItem>
              <SelectItem value="year">آخر سنة</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            تحديث
          </Button>
          <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>ملخص أداء المنشورات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المشاهدات</p>
                <p className="text-2xl font-bold">245,780</p>
                <p className="text-xs text-green-500">+12% عن الفترة السابقة</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الإعجابات</p>
                <p className="text-2xl font-bold">18,432</p>
                <p className="text-xs text-green-500">+8% عن الفترة السابقة</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">التعليقات</p>
                <p className="text-2xl font-bold">3,841</p>
                <p className="text-xs text-green-500">+15% عن الفترة السابقة</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Share2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المشاركات</p>
                <p className="text-2xl font-bold">2,156</p>
                <p className="text-xs text-red-500">-3% عن الفترة السابقة</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="stats">
        <TabsList>
          <TabsTrigger value="stats">الإحصائيات</TabsTrigger>
          <TabsTrigger value="posts">المنشورات</TabsTrigger>
          <TabsTrigger value="media">الوسائط</TabsTrigger>
          <TabsTrigger value="comparison">المقارنة</TabsTrigger>
          <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>تطور أداء المنشورات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>أداء المنشورات حسب المنصة</CardTitle>
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
                      <Bar dataKey="engagement" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>أفضل المنشورات أداءً</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-right border-b">
                      <th className="p-2 font-medium">العنوان</th>
                      <th className="p-2 font-medium">المنصة</th>
                      <th className="p-2 font-medium">التاريخ</th>
                      <th className="p-2 font-medium">المشاهدات</th>
                      <th className="p-2 font-medium">التفاعل</th>
                      <th className="p-2 font-medium">النقرات</th>
                      <th className="p-2 font-medium">التحويلات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">5 نصائح للعناية بالبشرة في الصيف</td>
                      <td className="p-2">انستغرام</td>
                      <td className="p-2">3 يونيو 2023</td>
                      <td className="p-2">15,432</td>
                      <td className="p-2">7.8%</td>
                      <td className="p-2">1,254</td>
                      <td className="p-2">128</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">كيفية استخدام كريم الأساس</td>
                      <td className="p-2">تيك توك</td>
                      <td className="p-2">12 يونيو 2023</td>
                      <td className="p-2">28,765</td>
                      <td className="p-2">9.2%</td>
                      <td className="p-2">2,145</td>
                      <td className="p-2">182</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">مجموعة الألوان الجديدة</td>
                      <td className="p-2">فيسبوك</td>
                      <td className="p-2">18 يونيو 2023</td>
                      <td className="p-2">12,543</td>
                      <td className="p-2">5.6%</td>
                      <td className="p-2">845</td>
                      <td className="p-2">76</td>
                    </tr>
                    <tr>
                      <td className="p-2">تجربتي مع منتجات العناية بالشعر</td>
                      <td className="p-2">انستغرام</td>
                      <td className="p-2">25 يونيو 2023</td>
                      <td className="p-2">18,954</td>
                      <td className="p-2">8.4%</td>
                      <td className="p-2">1,523</td>
                      <td className="p-2">143</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="posts" className="space-y-6 mt-6">
          <p className="text-muted-foreground text-center py-20">محتوى تحليلات المنشورات سيتم عرضه هنا</p>
        </TabsContent>
        
        <TabsContent value="media" className="mt-6">
          <MediaAnalytics />
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-6 mt-6">
          <p className="text-muted-foreground text-center py-20">محتوى مقارنة المنشورات سيتم عرضه هنا</p>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 mt-6">
          <p className="text-muted-foreground text-center py-20">محتوى تحليلات الاتجاهات سيتم عرضه هنا</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostPerformance;
