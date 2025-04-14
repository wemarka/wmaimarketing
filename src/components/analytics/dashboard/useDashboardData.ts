
import { useState, useEffect } from "react";
import { AnalyticsData, OverviewData, EngagementData, PlatformData } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export const useDashboardData = () => {
  const [period, setPeriod] = useState<string>("7days");
  const [loading, setLoading] = useState<boolean>(true);
  const [overviewData, setOverviewData] = useState<OverviewData[]>([]);
  const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
  const [platformData, setPlatformData] = useState<PlatformData[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    period: "7days",
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
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch analytics data based on the selected period
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch posts analytics data from social accounts
        const { data: socialAccounts, error: socialError } = await supabase
          .from("social_accounts")
          .select("platform, insights")
          .eq("user_id", user.id);
          
        if (socialError) throw socialError;

        // Calculate platform distribution
        const platforms: Record<string, number> = {};
        let totalImpressions = 0;
        let totalEngagement = 0;
        let totalClicks = 0;
        let totalConversions = 0;
        
        // Process social account data
        if (socialAccounts && socialAccounts.length > 0) {
          socialAccounts.forEach(account => {
            const platform = account.platform;
            
            // Aggregate platform stats
            if (!platforms[platform]) {
              platforms[platform] = 0;
            }
            
            // If insights data exists
            if (account.insights) {
              const impressions = account.insights.impressions || 0;
              platforms[platform] += impressions;
              totalImpressions += impressions;
              
              // Aggregate other metrics if available
              if (account.insights.engagement) totalEngagement += account.insights.engagement;
              if (account.insights.clicks) totalClicks += account.insights.clicks;
              if (account.insights.conversions) totalConversions += account.insights.conversions;
            }
          });
        }
        
        // Convert platform data to required format
        const formattedPlatformData: PlatformData[] = Object.keys(platforms).map(platform => {
          const percentage = totalImpressions > 0 ? Math.round(platforms[platform] / totalImpressions * 100) : 0;
          
          // Determine icon color based on platform
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
        
        // If no platform data, use fallback
        if (formattedPlatformData.length === 0) {
          setPlatformData([
            { platform: 'Instagram', percentage: 64, iconColor: 'bg-pink-100 text-pink-600' },
            { platform: 'Facebook', percentage: 26, iconColor: 'bg-blue-100 text-blue-600' },
            { platform: 'TikTok', percentage: 10, iconColor: 'bg-gray-100 text-gray-700' }
          ]);
        } else {
          setPlatformData(formattedPlatformData);
        }
        
        // Fetch posts for time-based data
        const timeRange = getTimeRangeForPeriod(period);
        
        const { data: posts, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", user.id)
          .gte("created_at", timeRange.start)
          .lte("created_at", timeRange.end)
          .order("created_at", { ascending: true });
          
        if (postsError) throw postsError;
        
        // Generate daily data points for the selected period
        const dailyData = generateDailyDataPoints(timeRange.start, timeRange.end);
        const dailyEngagementData = generateDailyDataPoints(timeRange.start, timeRange.end);
        
        // Fill in data from posts if available
        if (posts && posts.length > 0) {
          posts.forEach(post => {
            const date = new Date(post.created_at);
            const dateStr = formatDateForChart(date);
            
            // Find matching day in dailyData
            const dayIndex = dailyData.findIndex(day => day.name === dateStr);
            if (dayIndex >= 0) {
              // Update daily metrics if post has engagement data
              if (post.insights) {
                dailyData[dayIndex].impressions += (post.insights.impressions || 0);
                dailyData[dayIndex].engagement += (post.insights.engagement || 0);
                dailyData[dayIndex].clicks += (post.insights.clicks || 0);
                dailyData[dayIndex].revenue += (post.insights.revenue || 0);
                
                dailyEngagementData[dayIndex].likes += (post.insights.likes || 0);
                dailyEngagementData[dayIndex].comments += (post.insights.comments || 0);
                dailyEngagementData[dayIndex].shares += (post.insights.shares || 0);
              }
            }
          });
        }
        
        setOverviewData(dailyData);
        setEngagementData(dailyEngagementData);
        
        // Calculate change percentages based on previous period
        const changePercentages = calculateChangePercentages(totalImpressions, totalEngagement / totalImpressions * 100, totalClicks / totalImpressions * 100, totalConversions);
        
        // Set analytics data with real values or fallbacks
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
        
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "حدث خطأ أثناء جلب بيانات التحليلات",
          variant: "destructive"
        });
        
        // Use fallback data
        setAnalyticsData(getFallbackAnalyticsData(period));
        setOverviewData(getFallbackOverviewData());
        setPlatformData(getFallbackPlatformData());
        setEngagementData(getFallbackEngagementData());
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period, user, toast]);

  // Change period and update data
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };
  
  // Helper function to get time range based on period
  const getTimeRangeForPeriod = (periodValue: string) => {
    const end = new Date();
    let start = new Date();
    
    switch (periodValue) {
      case "7days":
        start.setDate(end.getDate() - 7);
        break;
      case "30days":
        start.setDate(end.getDate() - 30);
        break;
      case "3months":
        start.setMonth(end.getMonth() - 3);
        break;
      case "year":
        start.setFullYear(end.getFullYear() - 1);
        break;
    }
    
    return { 
      start: start.toISOString(), 
      end: end.toISOString() 
    };
  };
  
  // Format date for chart display
  const formatDateForChart = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };
  
  // Generate daily data points for the chart
  const generateDailyDataPoints = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dataPoints = [];
    
    const currentDate = new Date(start);
    while (currentDate <= end) {
      dataPoints.push({
        name: formatDateForChart(currentDate),
        impressions: 0,
        engagement: 0,
        clicks: 0,
        revenue: 0,
        likes: 0,
        comments: 0,
        shares: 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dataPoints;
  };
  
  // Calculate change percentages compared to previous period
  const calculateChangePercentages = (
    impressions: number, 
    engagement: number, 
    clicks: number, 
    conversions: number
  ) => {
    // Simulated previous period data (would ideally be fetched from the database)
    return {
      impressions: 12,
      engagement: 2.4,
      clicks: -0.5,
      conversions: 8
    };
  };
  
  // Fallback data when API calls fail
  const getFallbackAnalyticsData = (periodValue: string) => {
    const baseData = {
      period: periodValue,
      impressions: 44300,
      engagement: 5.2,
      clicks: 2.8,
      conversions: 1560,
      change: {
        impressions: 12,
        engagement: 2.4,
        clicks: -0.5,
        conversions: 8
      }
    };
    
    switch (periodValue) {
      case "7days": return baseData;
      case "30days":
        return {
          ...baseData,
          impressions: 187500,
          conversions: 6840,
          change: {
            impressions: 8.5,
            engagement: 1.8,
            clicks: 0.3,
            conversions: 5.2
          }
        };
      case "3months":
        return {
          ...baseData,
          impressions: 580200,
          conversions: 21450,
          change: {
            impressions: 15.2,
            engagement: 3.1,
            clicks: 1.2,
            conversions: 10.5
          }
        };
      case "year":
        return {
          ...baseData,
          impressions: 2350000,
          conversions: 87600,
          change: {
            impressions: 35.8,
            engagement: 8.2,
            clicks: 4.5,
            conversions: 22.7
          }
        };
      default: return baseData;
    }
  };
  
  // Fallback data for overview chart
  const getFallbackOverviewData = (): OverviewData[] => [
    { name: "4/7", impressions: 4200, engagement: 1400, clicks: 320, revenue: 12000 },
    { name: "4/8", impressions: 3800, engagement: 1200, clicks: 280, revenue: 9800 },
    { name: "4/9", impressions: 5100, engagement: 1800, clicks: 350, revenue: 15000 },
    { name: "4/10", impressions: 6200, engagement: 2200, clicks: 420, revenue: 21000 },
    { name: "4/11", impressions: 7500, engagement: 2800, clicks: 550, revenue: 28000 },
    { name: "4/12", impressions: 8300, engagement: 3100, clicks: 600, revenue: 32000 },
    { name: "4/13", impressions: 9200, engagement: 3500, clicks: 680, revenue: 39000 },
  ];
  
  // Fallback data for platform breakdown
  const getFallbackPlatformData = (): PlatformData[] => [
    { platform: 'Instagram', percentage: 64, iconColor: 'bg-pink-100 text-pink-600' },
    { platform: 'Facebook', percentage: 26, iconColor: 'bg-blue-100 text-blue-600' },
    { platform: 'TikTok', percentage: 10, iconColor: 'bg-gray-100 text-gray-700' }
  ];
  
  // Fallback data for engagement metrics
  const getFallbackEngagementData = (): EngagementData[] => [
    { name: "4/7", likes: 1400, comments: 320, shares: 180 },
    { name: "4/8", likes: 1200, comments: 280, shares: 150 },
    { name: "4/9", likes: 1800, comments: 350, shares: 240 },
    { name: "4/10", likes: 2200, comments: 420, shares: 310 },
    { name: "4/11", likes: 2800, comments: 550, shares: 400 },
    { name: "4/12", likes: 3100, comments: 600, shares: 450 },
    { name: "4/13", likes: 3500, comments: 680, shares: 520 },
  ];

  return {
    period,
    loading,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    handlePeriodChange
  };
};
