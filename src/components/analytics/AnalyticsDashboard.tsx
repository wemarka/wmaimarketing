
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Area
} from "recharts";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  Eye, 
  MousePointerClick, 
  ShoppingBag, 
  TrendingUp,
  BellRing,
  Share
} from "lucide-react";
import { AnalyticsData, PlatformData } from "../scheduler/types";

// Sample data for charts
const overviewData = [
  { name: "Apr 7", impressions: 420, engagement: 140, clicks: 32, revenue: 1200 },
  { name: "Apr 8", impressions: 380, engagement: 120, clicks: 28, revenue: 980 },
  { name: "Apr 9", impressions: 510, engagement: 180, clicks: 35, revenue: 1500 },
  { name: "Apr 10", impressions: 620, engagement: 220, clicks: 42, revenue: 2100 },
  { name: "Apr 11", impressions: 750, engagement: 280, clicks: 55, revenue: 2800 },
  { name: "Apr 12", impressions: 830, engagement: 310, clicks: 60, revenue: 3200 },
  { name: "Apr 13", impressions: 920, engagement: 350, clicks: 68, revenue: 3900 },
];

const engagementData = [
  { name: "Apr 7", likes: 140, comments: 32, shares: 18 },
  { name: "Apr 8", likes: 120, comments: 28, shares: 15 },
  { name: "Apr 9", likes: 180, comments: 35, shares: 24 },
  { name: "Apr 10", likes: 220, comments: 42, shares: 31 },
  { name: "Apr 11", likes: 280, comments: 55, shares: 40 },
  { name: "Apr 12", likes: 310, comments: 60, shares: 45 },
  { name: "Apr 13", likes: 350, comments: 68, shares: 52 },
];

const platformData: PlatformData[] = [
  { platform: 'Instagram', percentage: 64, iconColor: 'bg-pink-100 text-pink-600' },
  { platform: 'Facebook', percentage: 26, iconColor: 'bg-blue-100 text-blue-600' },
  { platform: 'TikTok', percentage: 10, iconColor: 'bg-gray-100 text-gray-700' }
];

const mockAnalyticsData: AnalyticsData = {
  period: "7days",
  impressions: 4238,
  engagement: 5.2,
  clicks: 2.8,
  conversions: 156,
  change: {
    impressions: 12,
    engagement: 2.4,
    clicks: -0.5,
    conversions: 8
  }
};

const AnalyticsDashboard: React.FC = () => {
  const [period, setPeriod] = useState<string>("7days");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(mockAnalyticsData);

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    // In a real application, we would fetch new data based on the period
    // For now, we'll just use the mock data
    setAnalyticsData({ ...mockAnalyticsData, period: newPeriod });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="mb-1">لوحة التحليلات والتقارير</h1>
          <p className="text-muted-foreground max-w-2xl">
            تتبع أداء التسويق وفهم ما يؤثر على جمهورك المستهدف
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="حدد الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">آخر 7 أيام</SelectItem>
              <SelectItem value="30days">آخر 30 يوم</SelectItem>
              <SelectItem value="3months">آخر 3 أشهر</SelectItem>
              <SelectItem value="year">هذه السنة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي المشاهدات</p>
                <p className="text-2xl font-semibold">{analyticsData.impressions.toLocaleString()}</p>
                <div className={`flex items-center mt-1 ${analyticsData.change.impressions >= 0 ? 'text-green-600' : 'text-red-600'} text-sm`}>
                  {analyticsData.change.impressions >= 0 ? 
                    <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  }
                  <span>{Math.abs(analyticsData.change.impressions)}% من الأسبوع الماضي</span>
                </div>
              </div>
              <div className="bg-beauty-pink/20 p-2 rounded-md">
                <Eye className="h-5 w-5 text-beauty-pink" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">معدل التفاعل</p>
                <p className="text-2xl font-semibold">{analyticsData.engagement}%</p>
                <div className={`flex items-center mt-1 ${analyticsData.change.engagement >= 0 ? 'text-green-600' : 'text-red-600'} text-sm`}>
                  {analyticsData.change.engagement >= 0 ? 
                    <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  }
                  <span>{Math.abs(analyticsData.change.engagement)}% من الأسبوع الماضي</span>
                </div>
              </div>
              <div className="bg-beauty-purple/20 p-2 rounded-md">
                <Share className="h-5 w-5 text-beauty-purple" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">معدل النقر</p>
                <p className="text-2xl font-semibold">{analyticsData.clicks}%</p>
                <div className={`flex items-center mt-1 ${analyticsData.change.clicks >= 0 ? 'text-green-600' : 'text-red-600'} text-sm`}>
                  {analyticsData.change.clicks >= 0 ? 
                    <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  }
                  <span>{Math.abs(analyticsData.change.clicks)}% من الأسبوع الماضي</span>
                </div>
              </div>
              <div className="bg-beauty-gold/20 p-2 rounded-md">
                <MousePointerClick className="h-5 w-5 text-beauty-gold" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">التحويلات</p>
                <p className="text-2xl font-semibold">{analyticsData.conversions}</p>
                <div className={`flex items-center mt-1 ${analyticsData.change.conversions >= 0 ? 'text-green-600' : 'text-red-600'} text-sm`}>
                  {analyticsData.change.conversions >= 0 ? 
                    <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  }
                  <span>{Math.abs(analyticsData.change.conversions)}% من الأسبوع الماضي</span>
                </div>
              </div>
              <div className="bg-blue-100 p-2 rounded-md">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>نمو الجمهور</CardTitle>
            <CardDescription>المشاهدات اليومية خلال الأيام السبعة الماضية</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer 
              config={{
                impressions: { label: "المشاهدات", color: "#9b87f5" },
                engagement: { label: "التفاعل", color: "#D946EF" },
                clicks: { label: "النقرات", color: "#D4AF37" },
                revenue: { label: "الإيرادات", color: "#0EA5E9" }
              }}
              className="h-[300px]"
            >
              <ComposedChart data={overviewData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="impressions" 
                  fill="#9b87f5" 
                  stroke="#9b87f5" 
                  fillOpacity={0.3}
                />
                <Bar 
                  yAxisId="left"
                  dataKey="engagement" 
                  fill="#D946EF" 
                  radius={[4, 4, 0, 0]} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0EA5E9" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>تقسيم المنصات</CardTitle>
            <CardDescription>أداء المحتوى حسب المنصة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {platformData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className={`flex items-center gap-2 ${item.iconColor}`}>
                      <div className={item.iconColor.split(' ')[0] + " p-1 rounded-full"}>
                        {item.platform === 'Instagram' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4">
                            <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                          </svg>
                        )}
                        {item.platform === 'Facebook' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-4 w-4">
                            <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                          </svg>
                        )}
                        {item.platform === 'TikTok' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4">
                            <path fill="currentColor" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                          </svg>
                        )}
                      </div>
                      <span>{item.platform}</span>
                    </div>
                    <span className="font-medium">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.platform === 'Instagram' ? 'bg-pink-500' : 
                        item.platform === 'Facebook' ? 'bg-blue-500' : 'bg-gray-700'
                      }`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>مقاييس التفاعل</CardTitle>
          <CardDescription>الإعجابات والتعليقات والمشاركات على مدار الوقت</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">الرسم البياني</TabsTrigger>
              <TabsTrigger value="detail">التفاصيل</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart">
              <ChartContainer
                config={{
                  likes: { label: "الإعجابات", color: "#9b87f5" },
                  comments: { label: "التعليقات", color: "#FFD6E0" },
                  shares: { label: "المشاركات", color: "#D4AF37" }
                }}
                className="h-[400px]"
              >
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="likes" stackId="a" fill="#9b87f5" name="الإعجابات" />
                  <Bar dataKey="comments" stackId="a" fill="#FFD6E0" name="التعليقات" />
                  <Bar dataKey="shares" stackId="a" fill="#D4AF37" name="المشاركات" />
                </BarChart>
              </ChartContainer>
            </TabsContent>
            
            <TabsContent value="detail">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-right p-3">التاريخ</th>
                      <th className="text-right p-3">الإعجابات</th>
                      <th className="text-right p-3">التعليقات</th>
                      <th className="text-right p-3">المشاركات</th>
                      <th className="text-right p-3">المجموع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {engagementData.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{item.likes}</td>
                        <td className="p-3">{item.comments}</td>
                        <td className="p-3">{item.shares}</td>
                        <td className="p-3 font-medium">{item.likes + item.comments + item.shares}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
