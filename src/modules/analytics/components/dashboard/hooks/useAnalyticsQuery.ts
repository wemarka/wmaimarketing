
import { useQuery } from "@tanstack/react-query";
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
  isUsingFallbackData: boolean;
}

export const useAnalyticsQuery = (period: string): AnalyticsQueryResult => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { logActivity } = useCreateActivity();
  const queryConfig = useQueryConfig("analyticsData");

  // توليد مفاتيح التخزين المؤقت بناءً على المستخدم والفترة
  const getCacheKey = (dataType: string) => {
    if (!user) return null;
    return `analytics_${dataType}_${user.id}_${period}`;
  };
  
  // استخدام React Query لتخزين البيانات في الذاكرة المؤقتة بكفاءة
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
        // تحسين التخزين المؤقت للبيانات
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
        
        // تخزين النتائج في ذاكرة التخزين المؤقت لتجربة أفضل دون اتصال
        setCachedData(`analytics_overview_${user.id}_${period}`, dailyData);
        setCachedData(`analytics_engagement_${user.id}_${period}`, dailyEngagementData);
        
        logActivity("analytics_data_fetched", "تم جلب بيانات التحليلات بنجاح").catch(console.error);
        
        return {
          overviewData: dailyData,
          engagementData: dailyEngagementData,
          platformData,
          analyticsData,
          usingFallbackData
        };
      } catch (error) {
        // محاولة استرجاع البيانات من التخزين المؤقت أولاً
        const cachedOverviewData = getCachedData<OverviewData[]>(getCacheKey("overview") || "") || getFallbackOverviewData();
        const cachedEngagementData = getCachedData<EngagementData[]>(getCacheKey("engagement") || "") || getFallbackEngagementData();
        const cachedPlatformData = getCachedData<PlatformData[]>(getCacheKey("platform") || "") || getFallbackPlatformData();
        
        // إظهار إشعار فقط إذا كان الخطأ في الموارد
        const errorType = getErrorType(error);
        if (errorType === ErrorType.RESOURCE_ERROR) {
          handleSupabaseError(error, "fetching analytics data");
        } else {
          console.error("Error fetching analytics data:", error);
        }
        
        // تسجيل النشاط مع التقاط أي أخطاء إضافية
        logActivity("analytics_data_error", "حدث خطأ أثناء جلب بيانات التحليلات").catch(console.error);
        
        usingFallbackData = true;
        
        // إرجاع البيانات المخزنة مؤقتًا أو البيانات الاحتياطية
        return {
          overviewData: cachedOverviewData,
          engagementData: cachedEngagementData,
          platformData: cachedPlatformData,
          analyticsData: getFallbackAnalyticsData(period),
          usingFallbackData
        };
      }
    },
    // استخدام إعدادات التكوين المحسنة
    ...queryConfig,
    enabled: !!user,
    placeholderData: previousData => previousData
  });
  
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
