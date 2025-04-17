
import React from 'react';
import { Activity, Instagram, Facebook, Twitter, Globe, Award } from 'lucide-react';

interface ActivityItem {
  id: string;
  competitor: string;
  action: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'website' | 'award';
  date: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    competitor: 'شركة الجمال الأولى',
    action: 'نشر منتج جديد',
    platform: 'instagram',
    date: '2025-04-15'
  },
  {
    id: '2',
    competitor: 'مستحضرات التجميل الطبيعية',
    action: 'حملة ترويجية جديدة',
    platform: 'facebook',
    date: '2025-04-14'
  },
  {
    id: '3',
    competitor: 'بيوتي ماركت',
    action: 'تحديث الموقع الإلكتروني',
    platform: 'website',
    date: '2025-04-13'
  },
  {
    id: '4',
    competitor: 'روز كوزمتيكس',
    action: 'فاز بجائزة أفضل منتج',
    platform: 'award',
    date: '2025-04-10'
  },
  {
    id: '5',
    competitor: 'شركة الجمال الأولى',
    action: 'إطلاق خط منتجات جديد',
    platform: 'twitter',
    date: '2025-04-08'
  }
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'instagram':
      return <Instagram className="h-4 w-4 text-rose-500" />;
    case 'facebook':
      return <Facebook className="h-4 w-4 text-blue-600" />;
    case 'twitter':
      return <Twitter className="h-4 w-4 text-sky-400" />;
    case 'website':
      return <Globe className="h-4 w-4 text-green-500" />;
    case 'award':
      return <Award className="h-4 w-4 text-amber-500" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const CompetitorActivityFeed = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
          <div className="bg-muted rounded-full p-2">
            {getPlatformIcon(activity.platform)}
          </div>
          <div className="flex-1">
            <p className="font-medium">{activity.competitor}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(activity.date).toLocaleDateString('ar-SA')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompetitorActivityFeed;
