
import { useState } from "react";
import { AnalyticsData, OverviewData, EngagementData, PlatformData } from "./types";

export const useDashboardData = () => {
  const [period, setPeriod] = useState<string>("7days");

  // Sample data for charts
  const overviewData: OverviewData[] = [
    { name: "Apr 7", impressions: 420, engagement: 140, clicks: 32, revenue: 1200 },
    { name: "Apr 8", impressions: 380, engagement: 120, clicks: 28, revenue: 980 },
    { name: "Apr 9", impressions: 510, engagement: 180, clicks: 35, revenue: 1500 },
    { name: "Apr 10", impressions: 620, engagement: 220, clicks: 42, revenue: 2100 },
    { name: "Apr 11", impressions: 750, engagement: 280, clicks: 55, revenue: 2800 },
    { name: "Apr 12", impressions: 830, engagement: 310, clicks: 60, revenue: 3200 },
    { name: "Apr 13", impressions: 920, engagement: 350, clicks: 68, revenue: 3900 },
  ];

  const engagementData: EngagementData[] = [
    { name: "Apr 7", likes: 140, comments: 32, shares: 18 },
    { name: "Apr 8", likes: 120, comments: 28, shares: 15 },
    { name: "Apr 9", likes: 180, comments: 35, shares: 24 },
    { name: "Apr 10", likes: 220, comments: 42, shares: 31 },
    { name: "Apr 11", likes: 280, comments: 55, shares: 40 },
    { name: "Apr 12", likes: 310, comments: 60, shares: 45 },
    { name: "Apr 13", likes: 350, comments: 68, shares: 52 },
  ];

  const platformData: PlatformData[] = [
    { platform: 'Instagram', percentage: 64, iconColor: 'bg-pink-100 text-pink-600' },
    { platform: 'Facebook', percentage: 26, iconColor: 'bg-blue-100 text-blue-600' },
    { platform: 'TikTok', percentage: 10, iconColor: 'bg-gray-100 text-gray-700' }
  ];

  const mockAnalyticsData: AnalyticsData = {
    period: "7days",
    impressions: 4238,
    engagement: 5.2,
    clicks: 2.8,
    conversions: 156,
    change: {
      impressions: 12,
      engagement: 2.4,
      clicks: -0.5,
      conversions: 8
    }
  };

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(mockAnalyticsData);

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    // In a real application, we would fetch new data based on the period
    // For now, we'll just use the mock data
    setAnalyticsData({ ...mockAnalyticsData, period: newPeriod });
  };

  return {
    period,
    setPeriod,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    handlePeriodChange
  };
};
