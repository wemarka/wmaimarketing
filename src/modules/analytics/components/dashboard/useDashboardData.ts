
import { useState, useCallback } from "react";
import { useAnalyticsQuery } from "./hooks/useAnalyticsQuery";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export const useDashboardData = () => {
  const [period, setPeriod] = useState<string>("7days");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();
  const { t } = useTranslation();
  
  // استخدام الـ Hook الجديد الذي يعتمد على React Query
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
  
  // هذه الدالة تتعامل مع تغييرات حالة واجهة المستخدم وإعادة جلب البيانات عند التغيير
  const handlePeriodChange = useCallback((newPeriod: string) => {
    setPeriod(newPeriod);
    
    // إظهار إشعار عند تغيير الفترة الزمنية
    toast({
      title: t("analytics.periodChanged", "تم تغيير الفترة الزمنية"),
      description: t("analytics.dataUpdated", `تم تحديث البيانات لعرض ${getTimePeriodLabel(newPeriod)}`),
      variant: "default",
    });
  }, [toast, t]);

  // دالة مساعدة لعرض وصف الفترة الزمنية بالعربية
  const getTimePeriodLabel = (periodKey: string): string => {
    const labels: Record<string, string> = {
      "7days": "آخر 7 أيام",
      "30days": "آخر 30 يوم",
      "3months": "آخر 3 أشهر",
      "year": "آخر سنة"
    };
    
    return labels[periodKey] || periodKey;
  };
  
  // دالة لإعادة تحميل البيانات
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
