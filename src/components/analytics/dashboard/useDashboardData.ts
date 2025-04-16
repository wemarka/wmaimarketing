
import { useState, useCallback } from "react";
import { useAnalyticsData } from "./hooks/useAnalyticsData";
import { useToast } from "@/components/ui/use-toast";

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
  
  const { toast } = useToast();
  
  // This function now only handles UI state changes
  const handlePeriodChange = useCallback((newPeriod: string) => {
    setPeriod(newPeriod);
    
    toast({
      title: "تم تغيير الفترة الزمنية",
      description: `تم تحديث البيانات لعرض ${getTimePeriodLabel(newPeriod)}`,
      variant: "default",
    });
  }, [toast]);

  // Helper function to get period label
  const getTimePeriodLabel = (periodKey: string): string => {
    const labels: Record<string, string> = {
      "7days": "آخر 7 أيام",
      "30days": "آخر 30 يوم",
      "3months": "آخر 3 أشهر",
      "year": "آخر سنة"
    };
    
    return labels[periodKey] || periodKey;
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
    refreshData,
    getTimePeriodLabel
  };
};
