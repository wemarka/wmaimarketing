
import { useState } from "react";
import { useAnalyticsData } from "./useAnalyticsData";
import { AnalyticsState } from "./types/dashboardTypes";

export const useDashboardData = () => {
  const [period, setPeriod] = useState<string>("7days");
  
  // Use the updated hook for data fetching
  const { 
    loading,
    overviewData, 
    engagementData,
    platformData,
    analyticsData,
    isUsingFallbackData,
    refreshData
  } = useAnalyticsData(period);
  
  // This function now only handles UI state changes
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  return {
    period,
    loading,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    isUsingFallbackData,
    handlePeriodChange,
    refreshData
  };
};
