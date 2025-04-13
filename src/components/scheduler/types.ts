
export interface CalendarPost {
  id: number;
  title: string;
  date: Date;
  platform: "instagram" | "facebook" | "tiktok";
  status: "draft" | "pending" | "scheduled" | "published";
}

export interface ScheduledPost {
  id: number;
  title: string;
  type: string;
  platform: string;
  date: string;
  time: string;
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

export interface PostStatus {
  scheduled: number;
  published: number;
  pending: number;
  draft: number;
}

export interface ProductionCost {
  id: number;
  campaignName: string;
  productionCost: number;
  marketingBudget: number;
  actualSpent: number;
  revenue: number;
  roi: number;
  impressions: number;
  conversions: number;
}

export interface ContentRecommendation {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  implementationDifficulty: "easy" | "medium" | "hard";
  expectedImpact: number; // percentage
}
