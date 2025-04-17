
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { socialMediaPerformanceData } from './mockData';

const tiktokData = [
  { day: 'الأحد', views: 5800, likes: 450, shares: 120, comments: 85 },
  { day: 'الإثنين', views: 7200, likes: 520, shares: 150, comments: 95 },
  { day: 'الثلاثاء', views: 8500, likes: 630, shares: 180, comments: 110 },
  { day: 'الأربعاء', views: 9300, likes: 720, shares: 210, comments: 135 },
  { day: 'الخميس', views: 10200, likes: 850, shares: 240, comments: 160 },
  { day: 'الجمعة', views: 7800, likes: 580, shares: 190, comments: 125 },
  { day: 'السبت', views: 6500, likes: 490, shares: 160, comments: 105 },
];

const demographicsData = [
  { age: '13-17', percentage: 22 },
  { age: '18-24', percentage: 38 },
  { age: '25-34', percentage: 27 },
  { age: '35-44', percentage: 9 },
  { age: '45+', percentage: 4 },
];

const TikTokAnalytics: React.FC = () => {
  return (
    <Card className="border-t-4 border-t-black">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music-2">
                <circle cx="8" cy="18" r="4"/>
                <path d="M12 18V2l7 4"/>
              </svg>
              تحليلات تيك توك
            </CardTitle>
            <CardDescription>
              مؤشرات الأداء وتحليل الجمهور على منصة تيك توك
            </CardDescription>
          </div>
          <span className="text-xs bg-black text-white px-2 py-1 rounded-full">الأكثر نموًا</span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engagement" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="engagement">التفاعل</TabsTrigger>
            <TabsTrigger value="demographics">الديموغرافيا</TabsTrigger>
            <TabsTrigger value="content">المحتوى</TabsTrigger>
          </TabsList>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={tiktokData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="views" name="المشاهدات" stroke="#222222" fill="#222222" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="likes" name="الإعجابات" stroke="#fe2c55" fill="#fe2c55" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="shares" name="المشاركات" stroke="#25f4ee" fill="#25f4ee" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(socialMediaPerformanceData.find(p => p.platform === 'tiktok') || {})
                .filter(([key]) => key !== 'platform')
                .map(([key, value]) => {
                  const getTitle = (k: string) => {
                    switch (k) {
                      case 'views': return 'المشاهدات';
                      case 'engagement': return 'نسبة التفاعل';
                      case 'followers': return 'المتابعون';
                      case 'growth': return 'معدل النمو';
                      case 'posts': return 'المنشورات';
                      default: return k;
                    }
                  };
                  
                  return (
                    <div key={key} className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="text-sm text-muted-foreground">{getTitle(key)}</div>
                      <div className="text-2xl font-bold mt-1">
                        {key === 'engagement' || key === 'growth' 
                          ? `${value}%` 
                          : typeof value === 'number' 
                            ? value.toLocaleString() 
                            : value.toString()}
                      </div>
                      {key === 'growth' && (value as number) > 0 && (
                        <div className="text-xs text-green-500 mt-1">&#9650; {(value as number).toFixed(1)}%</div>
                      )}
                    </div>
                  );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="demographics">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={demographicsData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} unit="%" />
                  <YAxis dataKey="age" type="category" width={80} />
                  <Tooltip formatter={(value) => [`${value}%`, 'النسبة المئوية']} />
                  <Legend />
                  <Bar dataKey="percentage" name="النسبة المئوية" fill="#fe2c55" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">تحليل الجمهور</h4>
              <p className="text-sm text-muted-foreground">
                تُظهر البيانات أن الفئة العمرية 18-24 تشكل النسبة الأكبر من الجمهور (38%)، 
                مما يشير إلى أهمية استهداف هذه الفئة في حملاتك التسويقية على منصة تيك توك.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  <path d="M5 3v4"/>
                  <path d="M19 17v4"/>
                  <path d="M3 5h4"/>
                  <path d="M17 19h4"/>
                </svg>
                <h3 className="mt-4 text-lg font-medium">تحليلات المحتوى قريبًا</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  سيتم إضافة تحليلات تفصيلية للمحتوى قريبًا، لمساعدتك على تحسين استراتيجية المحتوى الخاصة بك
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TikTokAnalytics;
