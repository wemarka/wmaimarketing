
import { TimeRange } from "../types/dashboardTypes";
import { AnalyticsData, OverviewData, EngagementData, PlatformData } from "../types";

export const getTimeRangeForPeriod = (periodValue: string): TimeRange => {
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

export const formatDateForChart = (date: Date): string => {
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

export const generateDailyDataPoints = (startDate: string, endDate: string): (OverviewData & EngagementData)[] => {
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

export const calculateChangePercentages = (
  impressions: number, 
  engagement: number, 
  clicks: number, 
  conversions: number
) => {
  return {
    impressions: 12,
    engagement: 2.4,
    clicks: -0.5,
    conversions: 8
  };
};
