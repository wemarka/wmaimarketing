
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Facebook, Twitter, Linkedin, ExternalLink, TrendingUp, Users, Eye, BarChart } from 'lucide-react';
import { socialMediaPerformanceData } from '@/modules/marketing/components/integration/mockData';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SocialMediaPerformance = () => {
  const getGrowthColor = (growth: number) => {
    if (growth >= 5) return "text-green-600";
    if (growth > 0) return "text-green-500";
    if (growth === 0) return "text-gray-500";
    if (growth > -3) return "text-amber-500";
    return "text-red-500";
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-5 w-5 text-pink-500" />;
      case 'facebook': return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'twitter': return <Twitter className="h-5 w-5 text-sky-500" />;
      case 'linkedin': return <Linkedin className="h-5 w-5 text-blue-700" />;
      case 'tiktok': return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 448 512" 
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
        </svg>
      );
      default: return <BarChart className="h-5 w-5" />;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'انستغرام';
      case 'facebook': return 'فيسبوك';
      case 'twitter': return 'تويتر';
      case 'linkedin': return 'لينكد إن';
      case 'tiktok': return 'تيك توك';
      default: return platform;
    }
  };

  const getBestPerformer = () => {
    return socialMediaPerformanceData.reduce((best, current) => {
      return current.engagement > best.engagement ? current : best;
    }, socialMediaPerformanceData[0]);
  };

  const bestPerformer = getBestPerformer();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>أداء منصات التواصل الاجتماعي</CardTitle>
        <CardDescription>مقارنة أداء المحتوى عبر مختلف المنصات</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="engagement">التفاعل</TabsTrigger>
            <TabsTrigger value="growth">النمو</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="mb-6 p-3 bg-muted/20 rounded-lg border border-dashed">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className={cn(
                  "bg-pink-50 text-pink-700 border-pink-200",
                  bestPerformer.platform === 'facebook' && "bg-blue-50 text-blue-700 border-blue-200",
                  bestPerformer.platform === 'twitter' && "bg-sky-50 text-sky-700 border-sky-200",
                  bestPerformer.platform === 'linkedin' && "bg-blue-100 text-blue-800 border-blue-200",
                  bestPerformer.platform === 'tiktok' && "bg-slate-50 text-slate-700 border-slate-200"
                )}>
                  {getPlatformName(bestPerformer.platform)}
                </Badge>
                <span className="text-sm font-medium">المنصة الأفضل أداءً</span>
              </div>
              <p className="text-sm text-muted-foreground">
                حقق {getPlatformName(bestPerformer.platform)} أعلى معدل تفاعل بنسبة {bestPerformer.engagement}% 
                ومعدل نمو {bestPerformer.growth}%
              </p>
            </div>
          
            <div className="space-y-4">
              {socialMediaPerformanceData.map((platform) => (
                <div key={platform.platform} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-3">
                    {getPlatformIcon(platform.platform)}
                    <div>
                      <div className="font-medium">{getPlatformName(platform.platform)}</div>
                      <div className="text-sm text-muted-foreground">
                        {platform.posts} منشور | {platform.followers.toLocaleString()} متابع
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                      <span className={cn("font-medium", getGrowthColor(platform.growth))}>
                        {platform.growth > 0 ? '+' : ''}{platform.growth}%
                      </span>
                      <TrendingUp className={cn("h-4 w-4", getGrowthColor(platform.growth))} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {platform.engagement}% تفاعل
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                عرض التقرير الكامل
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {socialMediaPerformanceData.map((platform) => (
                <div key={`${platform.platform}-engagement`} className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getPlatformIcon(platform.platform)}
                    <span className="font-medium">{getPlatformName(platform.platform)}</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">المشاهدات</span>
                      </div>
                      <span className="font-medium">{platform.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">نسبة التفاعل</span>
                      </div>
                      <span className="font-medium">{platform.engagement}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="growth">
            <div className="space-y-4">
              {socialMediaPerformanceData
                .sort((a, b) => b.growth - a.growth)
                .map((platform) => (
                  <div key={`${platform.platform}-growth`} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(platform.platform)}
                      <span>{getPlatformName(platform.platform)}</span>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            platform.growth >= 5 ? "bg-green-600" :
                            platform.growth > 0 ? "bg-green-400" :
                            platform.growth === 0 ? "bg-gray-400" :
                            platform.growth > -3 ? "bg-amber-400" : "bg-red-400"
                          )} 
                          style={{ width: `${Math.abs(platform.growth) * 5}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={cn(
                      "font-medium text-right min-w-[60px]",
                      getGrowthColor(platform.growth)
                    )}>
                      {platform.growth > 0 ? '+' : ''}{platform.growth}%
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">إجمالي المتابعين</span>
              </div>
              <span className="font-medium">
                {socialMediaPerformanceData.reduce((sum, platform) => sum + platform.followers, 0).toLocaleString()}
              </span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SocialMediaPerformance;
