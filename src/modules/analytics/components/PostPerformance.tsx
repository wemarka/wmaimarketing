
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, BarChart } from "@/components/ui/chart";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Eye, Heart, MessageSquare, Share2, TrendingUp } from "lucide-react";

const PostPerformance = () => {
  const [platform, setPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("engagement");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">أداء المنشورات</h2>
          <p className="text-muted-foreground">تحليل تفاعل الجمهور مع المحتوى المنشور</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input placeholder="بحث في المنشورات" className="w-[180px]" />
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
          <DateRangePicker />
          <Button variant="outline">تصدير البيانات</Button>
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
                  <LineChart />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>أداء المنشورات حسب المنصة</CardTitle>
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
          {/* محتوى تحليلات المنشورات */}
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-6 mt-6">
          {/* محتوى مقارنة المنشورات */}
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 mt-6">
          {/* محتوى تحليلات الاتجاهات */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostPerformance;
