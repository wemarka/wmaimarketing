
import { useState } from "react";
import { useAnalyticsData } from "./hooks/useAnalyticsData";
import { AnalyticsState } from "./types/dashboardTypes";

export const useDashboardData = () => {
  const [period, setPeriod] = useState<string>("7days");
  
  // Use the new hook for data fetching
  const { 
    loading,
    overviewData, 
    engagementData,
    platformData,
    analyticsData
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
    handlePeriodChange
  };
};
