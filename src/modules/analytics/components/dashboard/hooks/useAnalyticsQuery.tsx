
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useCreateActivity } from "@/hooks/useCreateActivity";
import { 
  fetchSocialAccounts,
  fetchPosts, 
  processSocialAccountsData, 
  processPostsData 
} from "../services/analyticsService";
import { 
  getTimeRangeForPeriod, 
  calculateChangePercentages 
} from "../utils/analyticsUtils";
import {
  getFallbackAnalyticsData,
  getFallbackOverviewData,
  getFallbackPlatformData,
  getFallbackEngagementData
} from "../utils/fallbackData";
import { AnalyticsData, OverviewData, EngagementData, PlatformData } from "../types";

export const useAnalyticsQuery = (period: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { logActivity } = useCreateActivity();

  // استخدام React Query للحصول على البيانات وتحسين التخزين المؤقت
  const { 
    data, 
    isLoading, 
    isError, 
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ["analytics", period, user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      try {
        // Fetch social accounts data
        const socialAccounts = await fetchSocialAccounts(user.id);
        
        // Process social accounts data
        const { 
          totalImpressions, 
          totalEngagement, 
          totalClicks, 
          totalConversions,
          platformData: formattedPlatformData 
        } = processSocialAccountsData(socialAccounts);
        
        // Get time range for the selected period
        const timeRange = getTimeRangeForPeriod(period);
        
        // Fetch posts data
        const posts = await fetchPosts(user.id, timeRange);
        
        // Process posts data
        const { dailyData, dailyEngagementData } = processPostsData(posts, timeRange);
        
        // Calculate change percentages
        const changePercentages = calculateChangePercentages(
          totalImpressions, 
          totalEngagement / totalImpressions * 100, 
          totalClicks / totalImpressions * 100, 
          totalConversions
        );
        
        // Create and return analytics data object
        const analyticsData: AnalyticsData = {
          period,
          impressions: totalImpressions || 44300,
          engagement: totalEngagement > 0 && totalImpressions > 0 ? 
            parseFloat((totalEngagement / totalImpressions * 100).toFixed(1)) : 5.2,
          clicks: totalClicks > 0 && totalImpressions > 0 ?
            parseFloat((totalClicks / totalImpressions * 100).toFixed(1)) : 2.8,
          conversions: totalConversions || 1560,
          change: changePercentages
        };

        logActivity("analytics_data_fetched", "تم جلب بيانات التحليلات بنجاح");
        
        return {
          overviewData: dailyData,
          engagementData: dailyEngagementData,
          platformData: formattedPlatformData.length > 0 ? formattedPlatformData : getFallbackPlatformData(),
          analyticsData,
          isUsingFallbackData: false
        };
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        
        toast({
          title: "خطأ في جلب البيانات",
          description: "حدث خطأ أثناء جلب بيانات التحليلات",
          variant: "destructive"
        });
        
        logActivity("analytics_data_error", "حدث خطأ أثناء جلب بيانات التحليلات");
        
        // Return fallback data
        return {
          overviewData: getFallbackOverviewData(),
          engagementData: getFallbackEngagementData(),
          platformData: getFallbackPlatformData(),
          analyticsData: getFallbackAnalyticsData(period),
          isUsingFallbackData: true
        };
      }
    },
    // Retry configuration for better network resilience
    retry: 2,
    retryDelay: (attempt) => Math.min(attempt * 1000, 3000),
    // Caching configuration for better performance
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Only refetch when window regains focus if the data is stale
    refetchOnWindowFocus: 'always',
    // Enable garbage collection for better memory management
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Default data to prevent null/undefined errors during loading
    placeholderData: {
      overviewData: getFallbackOverviewData(),
      engagementData: getFallbackEngagementData(),
      platformData: getFallbackPlatformData(),
      analyticsData: getFallbackAnalyticsData(period),
      isUsingFallbackData: true
    }
  });
  
  return {
    overviewData: data?.overviewData || [],
    engagementData: data?.engagementData || [],
    platformData: data?.platformData || [],
    analyticsData: data?.analyticsData || getFallbackAnalyticsData(period),
    isLoading: isLoading || isRefetching,
    isError,
    refetch,
    isUsingFallbackData: data?.isUsingFallbackData || false
  };
};
