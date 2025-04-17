
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { PlatformTrend } from '../PlatformCard';

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
