
import { useState, useCallback, useMemo } from "react";
import { useAnalyticsQuery } from "../../analytics/components/dashboard/hooks/useAnalyticsQuery";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export const useDashboardData = () => {
  const [period, setPeriod] = useState<string>("7days");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();
  const { t } = useTranslation();
  
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
  
  // تحسين أداء تغيير الفترة الزمنية باستخدام useCallback
  const handlePeriodChange = useCallback((newPeriod: string) => {
    if (newPeriod === period) return; // تجنب إعادة التحميل إذا لم تتغير الفترة
    
    setPeriod(newPeriod);
    
    // إظهار إشعار عند تغيير الفترة الزمنية
    toast({
      title: t("analytics.periodChanged", "تم تغيير الفترة الزمنية"),
      description: t("analytics.dataUpdated", `تم تحديث البيانات لعرض ${getTimePeriodLabel(newPeriod)}`),
      variant: "default",
    });
  }, [period, toast, t]);

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
      title: t("analytics.refreshing", "جاري تحديث البيانات"),
      description: t("analytics.refreshingDescription", "يتم تحديث البيانات التحليلية الآن"),
      variant: "default",
    });
  }, [refetch, toast, t]);

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
