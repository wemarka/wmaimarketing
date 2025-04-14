
export interface AnalyticsData {
  period: string;
  impressions: number;
  engagement: number;
  clicks: number;
  conversions: number;
  change: {
    impressions: number;
    engagement: number;
    clicks: number;
    conversions: number;
  };
}

export interface PlatformData {
  platform: string;
  percentage: number;
  iconColor: string;
}

export interface OverviewData {
  name: string;
  impressions: number;
  engagement: number;
  clicks: number;
  revenue: number;
}

export interface EngagementData {
  name: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface SocialAccount {
  id: string;
  platform: string;
  accountName: string;
  profileName: string;
  status: string;
  insights: {
    followers: number;
    engagement: number;
    postCount: number;
  };
}

export interface PostInsights {
  impressions?: number;
  engagement?: number;
  clicks?: number;
  revenue?: number;
  likes?: number;
  comments?: number;
  shares?: number;
}

export interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  platform: string;
  status: string;
  scheduled_at: string;
  published_at?: string;
  media_url?: string[];
  campaign_id?: string;
  insights?: PostInsights;
}
