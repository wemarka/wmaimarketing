
import { useState, useCallback, useMemo } from "react";
import { useAnalyticsQuery } from "@/modules/analytics/components/dashboard/hooks/useAnalyticsQuery";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";

export const useDashboardData = () => {
  const [period, setPeriod] = useState<string>("7days");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();
  
  // استخدام الـ Hook المُحسّن الذي يعتمد على React Query
  const { 
    overviewData, 
    engagementData,
    platformData,
    analyticsData,
    isLoading,
    isError,
    refetch,
    isUsingFallbackData
  } = useAnalyticsQuery(period);
  
  // تحسين أداء تغيير الفترة الزمنية باستخدام useCallback لتجنب إعادة الإنشاء
  const handlePeriodChange = useCallback((newPeriod: string) => {
    if (newPeriod === period) return; // تجنب إعادة التحميل إذا لم تتغير الفترة
    
    setPeriod(newPeriod);
    
    // إظهار إشعار عند تغيير الفترة الزمنية
    toast({
      title: "تم تغيير الفترة الزمنية",
      description: `تم تحديث البيانات لعرض ${getTimePeriodLabel(newPeriod)}`,
      variant: "default",
    });
  }, [period, toast]);

  // استخدام useMemo لتجنب إعادة حساب الترجمات في كل تقديم
  const timePeriodLabels = useMemo(() => ({
    "7days": "آخر 7 أيام",
    "30days": "آخر 30 يوم",
    "3months": "آخر 3 أشهر",
    "year": "آخر سنة"
  }), []);
  
  // دالة مساعدة لعرض وصف الفترة الزمنية بالعربية
  const getTimePeriodLabel = useCallback((periodKey: string): string => {
    return timePeriodLabels[periodKey as keyof typeof timePeriodLabels] || periodKey;
  }, [timePeriodLabels]);
  
  // تحسين وظيفة إعادة تحميل البيانات باستخدام useCallback
  const refreshData = useCallback(() => {
    refetch();
    toast({
      title: "جاري تحديث البيانات",
      description: "يتم تحديث البيانات التحليلية الآن",
      variant: "default",
    });
  }, [refetch, toast]);

  return {
    period,
    loading: isLoading,
    isError,
    isUsingFallbackData,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    handlePeriodChange,
    refreshData,
    isMobile,
    getTimePeriodLabel
  };
};
