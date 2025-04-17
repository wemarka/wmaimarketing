
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export const platformData = [
  {
    name: "انستغرام",
    icon: Instagram,
    posts: 124,
    engagement: '4.8%',
    followers: '12.5K',
    trend: '+5.2%'
  },
  {
    name: "فيسبوك",
    icon: Facebook,
    posts: 86,
    engagement: '2.7%',
    followers: '8.3K',
    trend: '+1.8%'
  },
  {
    name: "تويتر",
    icon: Twitter,
    posts: 210,
    engagement: '3.1%',
    followers: '5.2K',
    trend: '+3.4%'
  },
  {
    name: "لينكد إن",
    icon: Linkedin,
    posts: 42,
    engagement: '1.9%',
    followers: '3.6K',
    trend: '+0.7%'
  }
];

export const engagementData = [
  { name: 'الأحد', instagram: 120, facebook: 80, twitter: 60, linkedin: 20 },
  { name: 'الإثنين', instagram: 140, facebook: 100, twitter: 80, linkedin: 30 },
  { name: 'الثلاثاء', instagram: 170, facebook: 120, twitter: 90, linkedin: 40 },
  { name: 'الأربعاء', instagram: 190, facebook: 130, twitter: 100, linkedin: 50 },
  { name: 'الخميس', instagram: 220, facebook: 150, twitter: 120, linkedin: 60 },
  { name: 'الجمعة', instagram: 170, facebook: 110, twitter: 90, linkedin: 40 },
  { name: 'السبت', instagram: 150, facebook: 90, twitter: 70, linkedin: 30 },
];

export const upcomingPostsData = [
  { 
    id: '1',
    title: 'إطلاق المنتج الجديد', 
    platform: 'instagram', 
    scheduledTime: '2025-04-18T09:00:00',
    status: 'scheduled'
  },
  { 
    id: '2',
    title: 'نصائح للعناية بالبشرة في الصيف', 
    platform: 'facebook', 
    scheduledTime: '2025-04-19T11:30:00',
    status: 'draft'
  },
  { 
    id: '3', 
    title: 'حملة الخصومات', 
    platform: 'twitter',
    scheduledTime: '2025-04-20T15:00:00', 
    status: 'scheduled'
  },
  { 
    id: '4',
    title: 'المنتجات الأكثر مبيعاً', 
    platform: 'linkedin', 
    scheduledTime: '2025-04-21T10:00:00',
    status: 'scheduled'
  },
];

export const tabItems = [
  { id: 'overview', label: 'نظرة عامة' },
  { id: 'analytics', label: 'التحليلات' },
  { id: 'webhooks', label: 'الويب هوك' },
  { id: 'settings', label: 'الإعدادات' }
];
