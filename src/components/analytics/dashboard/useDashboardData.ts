
import { useState } from "react";
import { AnalyticsData, OverviewData, EngagementData, PlatformData } from "./types";

export const useDashboardData = () => {
  const [period, setPeriod] = useState<string>("7days");

  // Realistic data for charts with proper date formatting
  const overviewData: OverviewData[] = [
    { name: "4/7", impressions: 4200, engagement: 1400, clicks: 320, revenue: 12000 },
    { name: "4/8", impressions: 3800, engagement: 1200, clicks: 280, revenue: 9800 },
    { name: "4/9", impressions: 5100, engagement: 1800, clicks: 350, revenue: 15000 },
    { name: "4/10", impressions: 6200, engagement: 2200, clicks: 420, revenue: 21000 },
    { name: "4/11", impressions: 7500, engagement: 2800, clicks: 550, revenue: 28000 },
    { name: "4/12", impressions: 8300, engagement: 3100, clicks: 600, revenue: 32000 },
    { name: "4/13", impressions: 9200, engagement: 3500, clicks: 680, revenue: 39000 },
  ];

  const engagementData: EngagementData[] = [
    { name: "4/7", likes: 1400, comments: 320, shares: 180 },
    { name: "4/8", likes: 1200, comments: 280, shares: 150 },
    { name: "4/9", likes: 1800, comments: 350, shares: 240 },
    { name: "4/10", likes: 2200, comments: 420, shares: 310 },
    { name: "4/11", likes: 2800, comments: 550, shares: 400 },
    { name: "4/12", likes: 3100, comments: 600, shares: 450 },
    { name: "4/13", likes: 3500, comments: 680, shares: 520 },
  ];

  const platformData: PlatformData[] = [
    { platform: 'Instagram', percentage: 64, iconColor: 'bg-pink-100 text-pink-600' },
    { platform: 'Facebook', percentage: 26, iconColor: 'bg-blue-100 text-blue-600' },
    { platform: 'TikTok', percentage: 10, iconColor: 'bg-gray-100 text-gray-700' }
  ];

  // Analytics data with more realistic values
  const analyticsData: AnalyticsData = {
    period: "7days",
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

  // Period data mapping to simulate different time periods
  const periodData: Record<string, AnalyticsData> = {
    "7days": analyticsData,
    "30days": {
      ...analyticsData,
      period: "30days",
      impressions: 187500,
      conversions: 6840,
      change: {
        impressions: 8.5,
        engagement: 1.8,
        clicks: 0.3,
        conversions: 5.2
      }
    },
    "3months": {
      ...analyticsData,
      period: "3months",
      impressions: 580200,
      conversions: 21450,
      change: {
        impressions: 15.2,
        engagement: 3.1,
        clicks: 1.2,
        conversions: 10.5
      }
    },
    "year": {
      ...analyticsData,
      period: "year",
      impressions: 2350000,
      conversions: 87600,
      change: {
        impressions: 35.8,
        engagement: 8.2,
        clicks: 4.5,
        conversions: 22.7
      }
    }
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    // Return data based on the selected period
    return periodData[newPeriod] || analyticsData;
  };

  return {
    period,
    setPeriod,
    overviewData,
    engagementData,
    platformData,
    analyticsData: periodData[period],
    handlePeriodChange
  };
};
