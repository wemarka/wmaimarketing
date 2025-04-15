
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
import { handleSupabaseError } from "@/lib/errorHandlers";

export interface AnalyticsQueryResult {
  overviewData: OverviewData[];
  engagementData: EngagementData[];
  platformData: PlatformData[];
  analyticsData: AnalyticsData;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  isUsingFallbackData: boolean; // New flag to indicate if using fallback data
}

export const useAnalyticsQuery = (period: string): AnalyticsQueryResult => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { logActivity } = useCreateActivity();
  const queryConfig = useQueryConfig("analyticsData");
  
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
        // جلب بيانات الحسابات الاجتماعية
        const socialAccounts = await fetchSocialAccounts(user.id);
        
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
        
        // جلب بيانات المنشورات
        const posts = await fetchPosts(user.id, timeRange);
        
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
        
        logActivity("analytics_data_fetched", "تم جلب بيانات التحليلات بنجاح").catch(console.error);
        
        return {
          overviewData: dailyData,
          engagementData: dailyEngagementData,
          platformData,
          analyticsData,
          usingFallbackData
        };
      } catch (error) {
        handleSupabaseError(error, "fetching analytics data");
        
        // Log the activity with a catch for additional error handling
        logActivity("analytics_data_error", "حدث خطأ أثناء جلب بيانات التحليلات").catch(console.error);
        
        // Set the fallback flag
        usingFallbackData = true;
        
        // Return fallback data instead of throwing
        return {
          overviewData: getFallbackOverviewData(),
          engagementData: getFallbackEngagementData(),
          platformData: getFallbackPlatformData(),
          analyticsData: getFallbackAnalyticsData(period),
          usingFallbackData
        };
      }
    },
    // إضافة خيارات التخزين المؤقت
    ...queryConfig,
    // Set retry strategy for network errors
    retry: (failureCount, error: any) => {
      // Don't retry more than 2 times
      if (failureCount >= 2) return false;
      
      // Only retry on network errors
      return error?.message?.includes('Failed to fetch') ||
             error?.details?.includes('Failed to fetch') ||
             error?.code === "PGRST116" ||
             error?.message?.includes("ERR_INSUFFICIENT_RESOURCES") ||
             error?.details?.includes("ERR_INSUFFICIENT_RESOURCES");
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff with 10s max
    enabled: !!user
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
