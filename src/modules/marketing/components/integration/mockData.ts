
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { WebhookEventLogItemProps } from './WebhookEventLogItem';
import { PlatformTrend } from './PlatformCard';

export const platformData = [
  {
    name: "انستغرام",
    icon: Instagram,
    posts: 124,
    engagement: 4.8,
    followers: '12.5K',
    trend: 'up' as PlatformTrend
  },
  {
    name: "فيسبوك",
    icon: Facebook,
    posts: 86,
    engagement: 2.7,
    followers: '8.3K',
    trend: 'up' as PlatformTrend
  },
  {
    name: "تويتر",
    icon: Twitter,
    posts: 210,
    engagement: 3.1,
    followers: '5.2K',
    trend: 'up' as PlatformTrend
  },
  {
    name: "لينكد إن",
    icon: Linkedin,
    posts: 42,
    engagement: 1.9,
    followers: '3.6K',
    trend: 'down' as PlatformTrend
  },
  {
    name: "تيك توك",
    icon: Linkedin, // Using Linkedin as a placeholder, would need proper TikTok icon
    posts: 156,
    engagement: 5.3,
    followers: '15.8K',
    trend: 'up' as PlatformTrend
  }
];

// Renamed 'name' to 'day' and added 'tiktok' field
export const engagementData = [
  { day: 'الأحد', instagram: 120, facebook: 80, twitter: 60, linkedin: 20, tiktok: 180 },
  { day: 'الإثنين', instagram: 140, facebook: 100, twitter: 80, linkedin: 30, tiktok: 210 },
  { day: 'الثلاثاء', instagram: 170, facebook: 120, twitter: 90, linkedin: 40, tiktok: 230 },
  { day: 'الأربعاء', instagram: 190, facebook: 130, twitter: 100, linkedin: 50, tiktok: 255 },
  { day: 'الخميس', instagram: 220, facebook: 150, twitter: 120, linkedin: 60, tiktok: 280 },
  { day: 'الجمعة', instagram: 170, facebook: 110, twitter: 90, linkedin: 40, tiktok: 200 },
  { day: 'السبت', instagram: 150, facebook: 90, twitter: 70, linkedin: 30, tiktok: 190 },
];

// Modified to match UpcomingPostItemProps: Converted scheduledTime to date and time
export const upcomingPostsData = [
  { 
    id: '1',
    title: 'إطلاق المنتج الجديد', 
    platform: 'instagram', 
    date: '2025-04-18',
    time: '09:00',
    status: 'scheduled'
  },
  { 
    id: '2',
    title: 'نصائح للعناية بالبشرة في الصيف', 
    platform: 'facebook', 
    date: '2025-04-19',
    time: '11:30',
    status: 'draft'
  },
  { 
    id: '3', 
    title: 'حملة الخصومات', 
    platform: 'twitter',
    date: '2025-04-20',
    time: '15:00', 
    status: 'scheduled'
  },
  { 
    id: '4',
    title: 'المنتجات الأكثر مبيعاً', 
    platform: 'linkedin', 
    date: '2025-04-21',
    time: '10:00',
    status: 'scheduled'
  },
  { 
    id: '5',
    title: 'مقاطع فيديو قصيرة للمنتجات', 
    platform: 'tiktok', 
    date: '2025-04-21',
    time: '16:30',
    status: 'scheduled'
  },
];

export const tabItems = [
  { id: 'overview', label: 'نظرة عامة' },
  { id: 'analytics', label: 'التحليلات' },
  { id: 'webhooks', label: 'الويب هوك' },
  { id: 'settings', label: 'الإعدادات' }
];

// Added mockWebhookEvents
export const mockWebhookEvents: WebhookEventLogItemProps[] = [
  {
    id: '1',
    event: 'نشر محتوى',
    status: 'success',
    platform: 'instagram',
    timestamp: '2025-04-17T15:23:45',
    details: 'تم نشر المحتوى بنجاح على منصة Instagram',
    destination: 'https://example.com/webhook'
  },
  {
    id: '2', 
    event: 'تسجيل مستخدم',
    status: 'success',
    platform: 'facebook',
    timestamp: '2025-04-17T14:17:22',
    destination: 'https://example.com/webhook'
  },
  {
    id: '3',
    event: 'تحديث محتوى',
    status: 'error',
    platform: 'twitter',
    timestamp: '2025-04-17T12:05:11',
    details: 'فشل تحديث المحتوى بسبب خطأ في الاتصال',
    destination: 'https://example.com/webhook'
  },
  {
    id: '4',
    event: 'نشر محتوى',
    status: 'pending',
    platform: 'linkedin',
    timestamp: '2025-04-16T23:41:39',
    destination: 'https://example.com/webhook'
  },
  {
    id: '5',
    event: 'إنشاء حملة إعلانية',
    status: 'success',
    platform: 'instagram',
    timestamp: '2025-04-16T16:22:05',
    destination: 'https://example.com/webhook'
  },
  {
    id: '6',
    event: 'نشر فيديو',
    status: 'success',
    platform: 'tiktok',
    timestamp: '2025-04-17T18:10:25',
    details: 'تم نشر الفيديو بنجاح على منصة TikTok',
    destination: 'https://example.com/webhook'
  }
];

// Added new data for social media performance analysis
export const socialMediaPerformanceData = [
  {
    platform: 'instagram',
    views: 82500,
    engagement: 5.2,
    followers: 12500,
    growth: 3.8,
    posts: 124
  },
  {
    platform: 'facebook',
    views: 45700,
    engagement: 2.7,
    followers: 8300,
    growth: 1.5,
    posts: 86
  },
  {
    platform: 'twitter',
    views: 38200,
    engagement: 3.1,
    followers: 5200,
    growth: 2.3,
    posts: 210
  },
  {
    platform: 'linkedin',
    views: 15400,
    engagement: 1.9,
    followers: 3600,
    growth: -0.5,
    posts: 42
  },
  {
    platform: 'tiktok',
    views: 95600,
    engagement: 6.5,
    followers: 15800,
    growth: 8.2,
    posts: 156
  }
];
