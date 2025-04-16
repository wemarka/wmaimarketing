
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useCreateActivity } from "@/hooks/useCreateActivity";
import { 
  fetchSocialAccounts,
  fetchPosts, 
  processSocialAccountsData, 
  processPostsData 
} from "./services/analyticsService";
import { 
  getTimeRangeForPeriod, 
  calculateChangePercentages 
} from "./utils/analyticsUtils";
import {
  getFallbackAnalyticsData,
  getFallbackOverviewData,
  getFallbackPlatformData,
  getFallbackEngagementData
} from "./utils/fallbackData";
import { AnalyticsData, OverviewData, EngagementData, PlatformData } from "./types";

export const useAnalyticsData = (period: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [overviewData, setOverviewData] = useState<OverviewData[]>([]);
  const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
  const [platformData, setPlatformData] = useState<PlatformData[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    period: period,
    impressions: 0,
    engagement: 0,
    clicks: 0,
    conversions: 0,
    change: {
      impressions: 0,
      engagement: 0,
      clicks: 0,
      conversions: 0
    }
  });
  
  // Add state to track if fallback data is being used
  const [isUsingFallbackData, setIsUsingFallbackData] = useState<boolean>(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const { logActivity } = useCreateActivity();
  
  // Add the refresh function that was missing
  const refreshData = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Reset fallback data state
      setIsUsingFallbackData(false);
      
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
      
      if (formattedPlatformData.length === 0) {
        setPlatformData(getFallbackPlatformData());
      } else {
        setPlatformData(formattedPlatformData);
      }
      
      // Get time range for the selected period
      const timeRange = getTimeRangeForPeriod(period);
      
      // Fetch posts data
      const posts = await fetchPosts(user.id, timeRange);
      
      // Process posts data
      const { dailyData, dailyEngagementData } = processPostsData(posts, timeRange);
      
      setOverviewData(dailyData);
      setEngagementData(dailyEngagementData);
      
      // Calculate change percentages
      const changePercentages = calculateChangePercentages(
        totalImpressions, 
        totalEngagement / totalImpressions * 100, 
        totalClicks / totalImpressions * 100, 
        totalConversions
      );
      
      // Set analytics data
      setAnalyticsData({
        period,
        impressions: totalImpressions || 44300,
        engagement: totalEngagement > 0 && totalImpressions > 0 ? 
          parseFloat((totalEngagement / totalImpressions * 100).toFixed(1)) : 5.2,
        clicks: totalClicks > 0 && totalImpressions > 0 ?
          parseFloat((totalClicks / totalImpressions * 100).toFixed(1)) : 2.8,
        conversions: totalConversions || 1560,
        change: changePercentages
      });

      logActivity("analytics_data_fetched", "تم جلب بيانات التحليلات بنجاح");
      
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب بيانات التحليلات",
        variant: "destructive"
      });
      
      logActivity("analytics_data_error", "حدث خطأ أثناء جلب بيانات التحليلات");
      
      // Set fallback data and mark as using fallback
      setAnalyticsData(getFallbackAnalyticsData(period));
      setOverviewData(getFallbackOverviewData());
      setPlatformData(getFallbackPlatformData());
      setEngagementData(getFallbackEngagementData());
      setIsUsingFallbackData(true);
    } finally {
      setLoading(false);
    }
  }, [period, user, toast, logActivity]);
  
  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return {
    loading,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    isUsingFallbackData,
    refreshData
  };
};
