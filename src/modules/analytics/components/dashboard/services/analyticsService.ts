import { supabase } from "@/integrations/supabase/client";
import { fetchWithRetry } from "@/lib/supabaseClient";
import { SupabaseSocialAccount, PostWithInsights, TimeRange } from "../types/dashboardTypes";
import { formatDateForChart, generateDailyDataPoints } from "../utils/analyticsUtils";
import { OverviewData, EngagementData, PlatformData } from "../types";

export const fetchSocialAccounts = async (userId: string) => {
  const { data, error } = await fetchWithRetry<SupabaseSocialAccount[]>(
    "social_accounts",
    queryBuilder => queryBuilder
      .select("platform, insights")
      .eq("user_id", userId)
  );
    
  if (error) throw error;
  
  return data || [];
};

export const fetchPosts = async (userId: string, timeRange: TimeRange) => {
  const { data, error } = await fetchWithRetry<PostWithInsights[]>(
    "posts",
    queryBuilder => queryBuilder
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", timeRange.start)
      .lte("created_at", timeRange.end)
      .order("created_at", { ascending: true })
  );
    
  if (error) throw error;
  
  return data || [];
};

export const processSocialAccountsData = (
  socialAccounts: SupabaseSocialAccount[]
): { 
  platforms: Record<string, number>, 
  totalImpressions: number,
  totalEngagement: number,
  totalClicks: number,
  totalConversions: number,
  platformData: PlatformData[]
} => {
  const platforms: Record<string, number> = {};
  let totalImpressions = 0;
  let totalEngagement = 0;
  let totalClicks = 0;
  let totalConversions = 0;
  
  if (socialAccounts && socialAccounts.length > 0) {
    socialAccounts.forEach((account) => {
      const platform = account.platform;
      
      if (!platforms[platform]) {
        platforms[platform] = 0;
      }
      
      if (account.insights && typeof account.insights === 'object') {
        const insights = account.insights as Record<string, number>;
        const impressions = insights.impressions || 0;
        
        platforms[platform] += impressions;
        totalImpressions += impressions;
        
        if (insights.engagement) totalEngagement += insights.engagement;
        if (insights.clicks) totalClicks += insights.clicks;
        if (insights.conversions) totalConversions += insights.conversions;
      }
    });
  }
  
  const formattedPlatformData: PlatformData[] = Object.keys(platforms).map(platform => {
    const percentage = totalImpressions > 0 ? Math.round(platforms[platform] / totalImpressions * 100) : 0;
    
    let iconColor = 'bg-gray-100 text-gray-700';
    if (platform.toLowerCase() === 'instagram') {
      iconColor = 'bg-pink-100 text-pink-600';
    } else if (platform.toLowerCase() === 'facebook') {
      iconColor = 'bg-blue-100 text-blue-600';
    } else if (platform.toLowerCase() === 'tiktok') {
      iconColor = 'bg-slate-100 text-slate-700';
    }
    
    return {
      platform,
      percentage,
      iconColor
    };
  });
  
  return { 
    platforms, 
    totalImpressions, 
    totalEngagement, 
    totalClicks, 
    totalConversions,
    platformData: formattedPlatformData
  };
};

export const processPostsData = (
  posts: PostWithInsights[], 
  timeRange: TimeRange
): {
  dailyData: OverviewData[],
  dailyEngagementData: EngagementData[]
} => {
  const dailyData = generateDailyDataPoints(timeRange.start, timeRange.end);
  const dailyEngagementData = generateDailyDataPoints(timeRange.start, timeRange.end);
  
  if (posts && posts.length > 0) {
    posts.forEach((post) => {
      const date = new Date(post.created_at);
      const dateStr = formatDateForChart(date);
      
      const dayIndex = dailyData.findIndex(day => day.name === dateStr);
      if (dayIndex >= 0 && post.insights) {
        dailyData[dayIndex].impressions += (post.insights.impressions || 0);
        dailyData[dayIndex].engagement += (post.insights.engagement || 0);
        dailyData[dayIndex].clicks += (post.insights.clicks || 0);
        dailyData[dayIndex].revenue += (post.insights.revenue || 0);
        
        dailyEngagementData[dayIndex].likes += (post.insights.likes || 0);
        dailyEngagementData[dayIndex].comments += (post.insights.comments || 0);
        dailyEngagementData[dayIndex].shares += (post.insights.shares || 0);
      }
    });
  }
  
  return { 
    dailyData, 
    dailyEngagementData 
  };
};
