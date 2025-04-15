
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useCreateActivity } from "@/hooks/useCreateActivity";
import { useQueryConfig } from "@/hooks/useQueryConfig";
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
import { 
  handleSupabaseError, 
  withFallback,
  getErrorType,
  ErrorType,
  setCachedData,
  getCachedData
} from "@/lib/errorHandlers";

export interface AnalyticsQueryResult {
  overviewData: OverviewData[];
  engagementData: EngagementData[];
  platformData: PlatformData[];
  analyticsData: AnalyticsData;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  isUsingFallbackData: boolean; // Flag to indicate if using fallback data
}

export const useAnalyticsQuery = (period: string): AnalyticsQueryResult => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { logActivity } = useCreateActivity();
  const queryConfig = useQueryConfig("analyticsData");

  // Generate cache keys based on user and period
  const getCacheKey = (dataType: string) => {
    if (!user) return null;
    return `analytics_${dataType}_${user.id}_${period}`;
  };
  
  // استخدام React Query لتخزين البيانات في الذاكرة المؤقتة
  const queryResult = useQuery({
    queryKey: ["analytics", period, user?.id],
    queryFn: async (): Promise<{
      overviewData: OverviewData[];
      engagementData: EngagementData[];
      platformData: PlatformData[];
      analyticsData: AnalyticsData;
      usingFallbackData: boolean;
    }> => {
      if (!user) {
        throw new Error("المستخدم غير مسجل الدخول");
      }
      
      let usingFallbackData = false;
      
      try {
        // Set up cache keys
        const accountsCacheKey = getCacheKey("accounts");
        const postsCacheKey = getCacheKey("posts");
        
        // جلب بيانات الحسابات الاجتماعية مع التخزين المؤقت
        const socialAccounts = await withFallback(
          fetchSocialAccounts(user.id),
          [],
          "fetching social accounts",
          accountsCacheKey
        );
        
        // معالجة بيانات الحسابات الاجتماعية
        const { 
          totalImpressions, 
          totalEngagement, 
          totalClicks, 
          totalConversions,
          platformData: formattedPlatformData
        } = processSocialAccountsData(socialAccounts);
        
        const platformData = formattedPlatformData.length === 0 
          ? getFallbackPlatformData() 
          : formattedPlatformData;
        
        // الحصول على النطاق الزمني للفترة المحددة
        const timeRange = getTimeRangeForPeriod(period);
        
        // جلب بيانات المنشورات مع التخزين المؤقت
        const posts = await withFallback(
          fetchPosts(user.id, timeRange),
          [],
          "fetching posts",
          postsCacheKey
        );
        
        // معالجة بيانات المنشورات
        const { dailyData, dailyEngagementData } = processPostsData(posts, timeRange);
        
        // حساب نسب التغيير
        const changePercentages = calculateChangePercentages(
          totalImpressions, 
          totalEngagement / totalImpressions * 100, 
          totalClicks / totalImpressions * 100, 
          totalConversions
        );
        
        // إعداد بيانات التحليلات
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
        
        // Store results in cache with longer TTL for better offline experience
        if (dailyData.length > 0) {
          setCachedData(`analytics_overview_${user.id}_${period}`, dailyData, 2 * 60 * 60 * 1000); // 2 hours
        }
        
        if (dailyEngagementData.length > 0) {
          setCachedData(`analytics_engagement_${user.id}_${period}`, dailyEngagementData, 2 * 60 * 60 * 1000);
        }
        
        logActivity("analytics_data_fetched", "تم جلب بيانات التحليلات بنجاح").catch(console.error);
        
        return {
          overviewData: dailyData,
          engagementData: dailyEngagementData,
          platformData,
          analyticsData,
          usingFallbackData
        };
      } catch (error) {
        // Try to get data from cache first
        const cachedOverviewData = getCachedData<OverviewData[]>(getCacheKey("overview") || "") || getFallbackOverviewData();
        const cachedEngagementData = getCachedData<EngagementData[]>(getCacheKey("engagement") || "") || getFallbackEngagementData();
        const cachedPlatformData = getCachedData<PlatformData[]>(getCacheKey("platform") || "") || getFallbackPlatformData();
        
        // Only show toast notification if it was a resource error
        const errorType = getErrorType(error);
        if (errorType === ErrorType.RESOURCE_ERROR) {
          handleSupabaseError(error, "fetching analytics data");
        } else {
          console.error("Error fetching analytics data:", error);
        }
        
        // Log the activity with a catch for additional error handling
        logActivity("analytics_data_error", "حدث خطأ أثناء جلب بيانات التحليلات").catch(console.error);
        
        // Set the fallback flag
        usingFallbackData = true;
        
        // Return cached or fallback data
        return {
          overviewData: cachedOverviewData,
          engagementData: cachedEngagementData,
          platformData: cachedPlatformData,
          analyticsData: getFallbackAnalyticsData(period),
          usingFallbackData
        };
      }
    },
    // إضافة خيارات التخزين المؤقت
    ...queryConfig,
    // Enhanced retry strategy for different types of errors
    retry: (failureCount, error: any) => {
      const errorType = getErrorType(error);
      
      // Don't retry auth errors as they won't resolve without user action
      if (errorType === ErrorType.AUTH_ERROR) return false;
      
      // For resource errors, retry more times but with longer delays
      if (errorType === ErrorType.RESOURCE_ERROR) {
        return failureCount < 3;
      }
      
      // For network errors, retry a few times
      if (errorType === ErrorType.NETWORK_ERROR) {
        return failureCount < 2;
      }
      
      // For other errors, just retry once
      return failureCount < 1;
    },
    retryDelay: attemptIndex => {
      // Exponential backoff with jitter for better distribution of retries
      const base = Math.min(1000 * 2 ** attemptIndex, 30000); // max 30 seconds
      const jitter = Math.random() * 1000; // add up to 1 second of jitter
      return base + jitter;
    },
    enabled: !!user,
    // Don't refetch on window focus to reduce unnecessary requests
    refetchOnWindowFocus: false,
    // Increase stale time to reduce unnecessary fetches
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
  
  // Return the query result with a flag indicating if we're using fallback data
  return {
    overviewData: queryResult.data?.overviewData || getFallbackOverviewData(),
    engagementData: queryResult.data?.engagementData || getFallbackEngagementData(),
    platformData: queryResult.data?.platformData || getFallbackPlatformData(),
    analyticsData: queryResult.data?.analyticsData || getFallbackAnalyticsData(period),
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error as Error | null,
    refetch: queryResult.refetch,
    isUsingFallbackData: queryResult.data?.usingFallbackData || queryResult.isError
  };
};
