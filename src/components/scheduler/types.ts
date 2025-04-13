
export interface CalendarPost {
  id: number;
  title: string;
  date: Date;
  platform: "instagram" | "facebook" | "tiktok";
  status: "draft" | "pending" | "scheduled" | "published";
}

export interface SocialAccount {
  id: string;
  platform: "instagram" | "facebook" | "tiktok" | "twitter";
  accountName: string;
  profileName: string;
  status: "pending" | "connected" | "error";
  insights: {
    followers: number;
    engagement: number;
    postCount: number;
  }
}

export interface ApprovalItem {
  id: number;
  title: string;
  submittedBy: string;
  submittedAt: string;
  type: string;
  reviewers: {
    name: string;
    status: "pending" | "approved" | "rejected";
  }[];
}

export interface ContentItem {
  id: number;
  title: string;
  type: string;
  campaign: string;
  product: string;
  status: string;
  created: string;
  scheduled: string | null;
}

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

export interface PostPerformance {
  id: number;
  title: string;
  platform: "instagram" | "facebook" | "tiktok" | "twitter";
  date: string;
  impressions: number;
  engagement: number;
  clicks: number;
  conversions: number;
}

export interface CampaignPerformance {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  impressions: number;
  engagement: number;
  conversions: number;
  roi: number;
}

export interface ProductPerformance {
  id: number;
  name: string;
  impressions: number;
  engagement: number;
  clicks: number;
  conversions: number;
  revenue: number;
}
