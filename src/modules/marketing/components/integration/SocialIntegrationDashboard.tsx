
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Settings, RefreshCw, Calendar, Activity } from 'lucide-react';
import IntegrationAnalytics from './IntegrationAnalytics';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const platformData = [
  { name: 'انستغرام', posts: 42, engagement: 3.8, followers: 12500, trend: 'up' as const },
  { name: 'فيسبوك', posts: 36, engagement: 2.1, followers: 8700, trend: 'stable' as const },
  { name: 'تويتر', posts: 64, engagement: 1.5, followers: 5200, trend: 'down' as const },
  { name: 'تيك توك', posts: 28, engagement: 4.2, followers: 15800, trend: 'up' as const },
];

const engagementData = [
  { day: 'الأحد', instagram: 82, facebook: 43, twitter: 35, tiktok: 93 },
  { day: 'الإثنين', instagram: 75, facebook: 51, twitter: 42, tiktok: 85 },
  { day: 'الثلاثاء', instagram: 98, facebook: 38, twitter: 47, tiktok: 110 },
  { day: 'الأربعاء', instagram: 105, facebook: 56, twitter: 39, tiktok: 145 },
  { day: 'الخميس', instagram: 115, facebook: 65, twitter: 52, tiktok: 160 },
  { day: 'الجمعة', instagram: 90, facebook: 48, twitter: 43, tiktok: 135 },
  { day: 'السبت', instagram: 120, facebook: 59, twitter: 61, tiktok: 170 },
];

const SocialIntegrationDashboard = () => {
  const [activeTab, setActiveTab] = React.useState('overview');
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-beauty-purple">إدارة منصات التواصل الاجتماعي</h1>
          <p className="text-muted-foreground mt-2">
            إدارة وتحليل جميع منصات التواصل الاجتماعي من مكان واحد
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
          <Button size="sm" className="flex items-center gap-1 bg-beauty-purple hover:bg-beauty-purple/90">
            <RefreshCw className="h-4 w-4" />
            تحديث البيانات
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview">النظرة العامة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="scheduler">جدولة المنشورات</TabsTrigger>
          <TabsTrigger value="settings">إعدادات المنصات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformData.map((platform) => (
              <PlatformCard 
                key={platform.name}
                name={platform.name}
                posts={platform.posts}
                engagement={platform.engagement}
                followers={platform.followers}
                trend={platform.trend}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-beauty-purple" />
                  التفاعل اليومي
                </CardTitle>
                <CardDescription>مقارنة التفاعل اليومي على مختلف المنصات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={engagementData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="instagram" name="انستغرام" stackId="a" fill="#E1306C" />
                      <Bar dataKey="facebook" name="فيسبوك" stackId="a" fill="#4267B2" />
                      <Bar dataKey="twitter" name="تويتر" stackId="a" fill="#1DA1F2" />
                      <Bar dataKey="tiktok" name="تيك توك" stackId="a" fill="#000000" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-beauty-purple" />
                  المنشورات القادمة
                </CardTitle>
                <CardDescription>آخر المنشورات المجدولة للنشر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  <UpcomingPostItem
                    title="إطلاق مجموعة منتجات الصيف"
                    platform="instagram"
                    date="2025-04-22"
                    time="14:30"
                  />
                  <UpcomingPostItem
                    title="نصائح العناية بالبشرة في رمضان"
                    platform="facebook"
                    date="2025-04-20"
                    time="10:00"
                  />
                  <UpcomingPostItem
                    title="كيف تختارين العطر المناسب؟"
                    platform="tiktok"
                    date="2025-04-19"
                    time="18:45"
                  />
                  <UpcomingPostItem
                    title="تخفيضات نهاية الأسبوع"
                    platform="twitter"
                    date="2025-04-18"
                    time="09:15"
                  />
                  <UpcomingPostItem
                    title="وصفات طبيعية للعناية بالشعر"
                    platform="instagram"
                    date="2025-04-18"
                    time="12:00"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <IntegrationAnalytics />
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="text-center py-20 text-muted-foreground">
            قريبًا - سيتم إضافة تحليلات مفصلة لكل منصة
          </div>
        </TabsContent>
        
        <TabsContent value="scheduler">
          <div className="text-center py-20 text-muted-foreground">
            قريبًا - سيتم إضافة أداة جدولة المنشورات لجميع المنصات
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="text-center py-20 text-muted-foreground">
            قريبًا - سيتم إضافة إعدادات متقدمة لكل منصة
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PlatformCard = ({ name, posts, engagement, followers, trend }: {
  name: string;
  posts: number;
  engagement: number;
  followers: number;
  trend: 'up' | 'down' | 'stable';
}) => {
  const getPlatformColor = () => {
    switch (name) {
      case 'انستغرام': return '#E1306C';
      case 'فيسبوك': return '#4267B2';
      case 'تويتر': return '#1DA1F2';
      case 'تيك توك': return '#000000';
      default: return '#6941C6';
    }
  };
  
  const getTrendBadge = () => {
    switch (trend) {
      case 'up': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+2.5%</Badge>;
      case 'down': return <Badge variant="outline" className="border-red-200 text-red-800">-1.2%</Badge>;
      case 'stable': return <Badge variant="outline" className="border-gray-200 text-gray-800">مستقر</Badge>;
      default: return null;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: getPlatformColor() }}
            />
            <CardTitle className="text-base font-medium">{name}</CardTitle>
          </div>
          {getTrendBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">المتابعين</span>
            <span className="text-lg font-bold">{followers.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">المنشورات</span>
            <span className="text-lg font-bold">{posts}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">معدل التفاعل</span>
            <span className="text-lg font-bold">{engagement}%</span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2 border-dashed" 
            style={{ borderColor: getPlatformColor(), color: getPlatformColor() }}
          >
            تفاصيل المنصة
            <ArrowUpRight className="ms-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface UpcomingPostItemProps {
  title: string;
  platform: string;
  date: string;
  time: string;
}

const UpcomingPostItem = ({ title, platform, date, time }: UpcomingPostItemProps) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'instagram': return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 flex items-center justify-center text-white font-bold">In</div>;
      case 'facebook': return <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">Fb</div>;
      case 'twitter': return <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">Tw</div>;
      case 'tiktok': return <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold">Tk</div>;
      default: return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
  };
  
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border">
      {getPlatformIcon()}
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-muted-foreground">{formatDate(date)} - {time}</span>
          <Badge variant="outline" className="text-beauty-purple border-beauty-purple/30">مجدول</Badge>
        </div>
      </div>
    </div>
  );
};

export default SocialIntegrationDashboard;
