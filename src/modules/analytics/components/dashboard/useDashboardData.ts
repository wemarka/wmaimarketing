
import { useState } from "react";
import { useAnalyticsQuery } from "./hooks/useAnalyticsQuery";

export const useDashboardData = () => {
  const [period, setPeriod] = useState<string>("7days");
  
  // استخدام الـ Hook الجديد الذي يعتمد على React Query
  const { 
    overviewData, 
    engagementData,
    platformData,
    analyticsData,
    isLoading: loading,
    isError
  } = useAnalyticsQuery(period);
  
  // هذه الدالة تتعامل فقط مع تغييرات حالة واجهة المستخدم
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  return {
    period,
    loading,
    isError,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    handlePeriodChange
  };
};
