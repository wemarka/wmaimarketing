
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Eye, ExternalLink } from "lucide-react";

interface TopPerformingContentProps {
  limit?: number;
}

const contentData = [
  {
    id: '1',
    title: 'كيفية العناية بالبشرة الجافة في فصل الشتاء',
    company: 'شركة الجمال الطبيعي',
    platform: 'انستجرام',
    type: 'مقالة',
    engagement: 2456,
    comments: 158,
    views: 12500,
    datePosted: '2023-12-10',
    image: 'https://picsum.photos/seed/1/200/200'
  },
  {
    id: '2',
    title: 'مقارنة بين أفضل 5 منتجات للعناية بالشعر',
    company: 'صالون الجمال المتكامل',
    platform: 'فيسبوك',
    type: 'فيديو',
    engagement: 1870,
    comments: 212,
    views: 9800,
    datePosted: '2023-12-05',
    image: 'https://picsum.photos/seed/2/200/200'
  },
  {
    id: '3',
    title: 'تجربتي مع مكياج العلامة التجارية الجديدة',
    company: 'متجر مستحضرات التجميل العالمية',
    platform: 'يوتيوب',
    type: 'مراجعة',
    engagement: 3100,
    comments: 325,
    views: 18200,
    datePosted: '2023-12-01',
    image: 'https://picsum.photos/seed/3/200/200'
  },
  {
    id: '4',
    title: 'نصائح سريعة للحصول على بشرة نضرة في 5 دقائق',
    company: 'شركة الجمال الطبيعي',
    platform: 'تيك توك',
    type: 'نصائح سريعة',
    engagement: 5600,
    comments: 98,
    views: 35000,
    datePosted: '2023-11-28',
    image: 'https://picsum.photos/seed/4/200/200'
  },
  {
    id: '5',
    title: 'الروتين الصباحي للعناية بالبشرة الدهنية',
    company: 'متجر مستحضرات التجميل العالمية',
    platform: 'انستجرام',
    type: 'روتين',
    engagement: 2100,
    comments: 176,
    views: 14300,
    datePosted: '2023-11-25',
    image: 'https://picsum.photos/seed/5/200/200'
  },
  {
    id: '6',
    title: 'أحدث صيحات المكياج لموسم الشتاء',
    company: 'صالون الجمال المتكامل',
    platform: 'فيسبوك',
    type: 'تريند',
    engagement: 1950,
    comments: 143,
    views: 12800,
    datePosted: '2023-11-22',
    image: 'https://picsum.photos/seed/6/200/200'
  },
  {
    id: '7',
    title: 'كيفية اختيار العطر المناسب لشخصيتك',
    company: 'متجر الجمال الفاخر',
    platform: 'يوتيوب',
    type: 'دليل',
    engagement: 2800,
    comments: 256,
    views: 17500,
    datePosted: '2023-11-18',
    image: 'https://picsum.photos/seed/7/200/200'
  },
  {
    id: '8',
    title: 'أفضل منتجات العناية بالبشرة تحت 100 ريال',
    company: 'شركة الجمال الطبيعي',
    platform: 'انستجرام',
    type: 'مراجعة',
    engagement: 3400,
    comments: 289,
    views: 22000,
    datePosted: '2023-11-15',
    image: 'https://picsum.photos/seed/8/200/200'
  },
  {
    id: '9',
    title: 'ماسكات طبيعية للعناية بالشعر التالف',
    company: 'صالون الجمال المتكامل',
    platform: 'تيك توك',
    type: 'نصائح DIY',
    engagement: 4200,
    comments: 178,
    views: 28500,
    datePosted: '2023-11-12',
    image: 'https://picsum.photos/seed/9/200/200'
  },
  {
    id: '10',
    title: 'تحديات الجمال: تطبيق المكياج في أقل من دقيقتين',
    company: 'متجر مستحضرات التجميل العالمية',
    platform: 'انستجرام',
    type: 'تحدي',
    engagement: 6800,
    comments: 412,
    views: 45000,
    datePosted: '2023-11-10',
    image: 'https://picsum.photos/seed/10/200/200'
  }
];

const TopPerformingContent = ({ limit = 5 }: TopPerformingContentProps) => {
  const limitedData = contentData.slice(0, limit);
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'انستجرام': return 'bg-pink-100 text-pink-800';
      case 'فيسبوك': return 'bg-blue-100 text-blue-800';
      case 'يوتيوب': return 'bg-red-100 text-red-800';
      case 'تيك توك': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>أفضل المحتويات أداءً</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {limitedData.map((content, index) => (
            <div key={content.id} className="flex gap-4 items-center border-b pb-4 last:border-0">
              <div className="font-bold text-lg text-muted-foreground">{index + 1}</div>
              <div className="w-16 h-16 relative rounded-md overflow-hidden">
                <img src={content.image} alt={content.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{content.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{content.company}</Badge>
                      <Badge variant="secondary" className={getPlatformColor(content.platform)}>
                        {content.platform}
                      </Badge>
                      <Badge>{content.type}</Badge>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {content.engagement.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {content.comments.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {content.views.toLocaleString()}
                  </div>
                  <div>
                    {new Date(content.datePosted).toLocaleDateString('ar-SA')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformingContent;
