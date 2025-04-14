
import { Json } from "@/integrations/supabase/types";
import { AnalyticsData, OverviewData, EngagementData, PlatformData, Post, PostInsights } from "../types";

export interface SocialAccountInsights {
  impressions?: number;
  engagement?: number;
  clicks?: number;
  conversions?: number;
  followers?: number;
  postCount?: number;
}

export interface SocialAccount {
  platform: string;
  insights: SocialAccountInsights | null;
}

export interface SupabaseSocialAccount {
  platform: string;
  insights: Json;
}

export interface PostWithInsights extends Post {
  insights?: PostInsights;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface AnalyticsState {
  period: string;
  loading: boolean;
  overviewData: OverviewData[];
  engagementData: EngagementData[];
  platformData: PlatformData[];
  analyticsData: AnalyticsData;
}
