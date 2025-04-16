
import { fetchWithRetry } from "@/lib/supabaseClient";
import { SupabaseSocialAccount, PostWithInsights, TimeRange } from "../types/dashboardTypes";
import { formatDateForChart, generateDailyDataPoints } from "../utils/analyticsUtils";
import { OverviewData, EngagementData, PlatformData } from "../types";

/**
 * Enhanced cache with expiry for better performance
 */
const cacheWithExpiry = {
  set: (key: string, value: any, ttl: number = 30 * 60 * 1000) => {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  get: (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value;
  }
};

/**
 * Fetches social accounts with caching and optimized network requests
 */
export const fetchSocialAccounts = async (userId: string) => {
  const cacheKey = `social_accounts_${userId}`;
  const cachedData = cacheWithExpiry.get(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
    const { data, error } = await fetchWithRetry<SupabaseSocialAccount[]>(
      "social_accounts",
      queryBuilder => queryBuilder
        .select("platform, insights")
        .eq("user_id", userId)
    );
      
    if (error) throw error;
    
    if (data) {
      cacheWithExpiry.set(cacheKey, data);
    }
    
    return data || [];
  } catch (error) {
    console.error("Error fetching social accounts:", error);
    return [];
  }
};

/**
 * Fetches posts with optimized caching and error handling
 */
export const fetchPosts = async (userId: string, timeRange: TimeRange) => {
  const cacheKey = `posts_${userId}_${timeRange.start}_${timeRange.end}`;
  const cachedData = cacheWithExpiry.get(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
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
    
    if (data) {
      cacheWithExpiry.set(cacheKey, data);
    }
    
    return data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

/**
 * Processes social account data with optimizations
 */
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
  
  // Early return for empty data
  if (!socialAccounts || socialAccounts.length === 0) {
    return {
      platforms,
      totalImpressions,
      totalEngagement,
      totalClicks,
      totalConversions,
      platformData: []
    };
  }
  
  // Process account data
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
  
  // Create formatted platform data
  const formattedPlatformData: PlatformData[] = Object.keys(platforms).map(platform => {
    const percentage = totalImpressions > 0 ? Math.round(platforms[platform] / totalImpressions * 100) : 0;
    
    // Platform-specific styling
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

/**
 * Processes post data with optimized algorithms
 */
export const processPostsData = (
  posts: PostWithInsights[], 
  timeRange: TimeRange
): {
  dailyData: OverviewData[],
  dailyEngagementData: EngagementData[]
} => {
  // Create daily data points
  const dailyData = generateDailyDataPoints(timeRange.start, timeRange.end);
  const dailyEngagementData = generateDailyDataPoints(timeRange.start, timeRange.end);
  
  // Early return for empty data
  if (!posts || posts.length === 0) {
    return { dailyData, dailyEngagementData };
  }
  
  // Optimize lookup with Map
  const dayMap = new Map();
  dailyData.forEach((day, index) => {
    dayMap.set(day.name, index);
  });
  
  // Process post data efficiently
  posts.forEach((post) => {
    const date = new Date(post.created_at);
    const dateStr = formatDateForChart(date);
    
    const dayIndex = dayMap.get(dateStr);
    
    if (dayIndex !== undefined && post.insights) {
      dailyData[dayIndex].impressions += (post.insights.impressions || 0);
      dailyData[dayIndex].engagement += (post.insights.engagement || 0);
      dailyData[dayIndex].clicks += (post.insights.clicks || 0);
      dailyData[dayIndex].revenue += (post.insights.revenue || 0);
      
      dailyEngagementData[dayIndex].likes += (post.insights.likes || 0);
      dailyEngagementData[dayIndex].comments += (post.insights.comments || 0);
      dailyEngagementData[dayIndex].shares += (post.insights.shares || 0);
    }
  });
  
  return { 
    dailyData, 
    dailyEngagementData 
  };
};
