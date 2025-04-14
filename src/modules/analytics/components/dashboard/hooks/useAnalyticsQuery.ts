
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
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

export interface AnalyticsQueryResult {
  overviewData: OverviewData[];
  engagementData: EngagementData[];
  platformData: PlatformData[];
  analyticsData: AnalyticsData;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
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
    }> => {
      if (!user) {
        throw new Error("المستخدم غير مسجل الدخول");
      }
      
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
      
      logActivity("analytics_data_fetched", "تم جلب بيانات التحليلات بنجاح");
      
      return {
        overviewData: dailyData,
        engagementData: dailyEngagementData,
        platformData,
        analyticsData
      };
    },
    // إضافة خيارات التخزين المؤقت
    ...queryConfig,
    // إضافة معالج للأخطاء
    meta: {
      onError: (error: any) => {
        console.error("Error fetching analytics data:", error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "حدث خطأ أثناء جلب بيانات التحليلات",
          variant: "destructive"
        });
        
        logActivity("analytics_data_error", "حدث خطأ أثناء جلب بيانات التحليلات");
      }
    },
    // استخدام البيانات الافتراضية في حالة حدوث خطأ
    enabled: !!user
  });
  
  // استخدام البيانات من React Query أو البيانات الاحتياطية في حالة حدوث خطأ
  return {
    overviewData: queryResult.data?.overviewData || getFallbackOverviewData(),
    engagementData: queryResult.data?.engagementData || getFallbackEngagementData(),
    platformData: queryResult.data?.platformData || getFallbackPlatformData(),
    analyticsData: queryResult.data?.analyticsData || getFallbackAnalyticsData(period),
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error as Error | null
  };
};
