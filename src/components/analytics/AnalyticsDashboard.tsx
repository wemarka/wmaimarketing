
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, MousePointerClick, DollarSign, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import PostStatusTracker from "./PostStatusTracker";
import { useTranslation } from "react-i18next";

// Import the components from the new modular structure
import {
  OverviewChart,
  EngagementMetrics,
  PlatformBreakdown,
  StatisticCard,
  useDashboardData
} from "@/modules/analytics/components/dashboard";

export const AnalyticsDashboard = () => {
  const {
    period,
    loading,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    isUsingFallbackData,
    handlePeriodChange
  } = useDashboardData();
  const { t } = useTranslation();

  if (loading) {
    return <div>{t("common.loading", "Loading analytics data...")}</div>;
  }

  return (
    <div className="space-y-4">
      {isUsingFallbackData && (
        <Alert variant="warning" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t("analytics.fallbackData.title", "استخدام البيانات الاحتياطية")}</AlertTitle>
          <AlertDescription>
            {t(
              "analytics.fallbackData.description",
              "تعذر الاتصال بالخادم، نعرض لك بيانات مخزنة مسبقًا. سنحاول تحديثها فور استعادة الاتصال."
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatisticCard
          title={t("dashboard.stats.impressions.title")}
          value={analyticsData.impressions.toLocaleString()}
          change={analyticsData.change.impressions.toString()}
          icon={<Eye className="h-5 w-5 text-blue-600" />}
          iconBgClass="bg-blue-100"
          positive={analyticsData.change.impressions >= 0}
        />
        
        <StatisticCard
          title={t("dashboard.stats.engagement.title")}
          value={`${analyticsData.engagement}%`}
          change={analyticsData.change.engagement.toString()}
          icon={<Heart className="h-5 w-5 text-pink-600" />}
          iconBgClass="bg-pink-100"
          positive={analyticsData.change.engagement >= 0}
        />
        
        <StatisticCard
          title={t("dashboard.stats.averageClicks.title")}
          value={`${analyticsData.clicks}%`}
          change={analyticsData.change.clicks.toString()}
          icon={<MousePointerClick className="h-5 w-5 text-amber-600" />}
          iconBgClass="bg-amber-100"
          positive={analyticsData.change.clicks >= 0}
        />
        
        <StatisticCard
          title={t("dashboard.stats.conversion.title")}
          value={analyticsData.conversions.toLocaleString()}
          change={analyticsData.change.conversions.toString()}
          icon={<DollarSign className="h-5 w-5 text-green-600" />}
          iconBgClass="bg-green-100"
          positive={analyticsData.change.conversions >= 0}
          showSpark={analyticsData.change.conversions > 5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <OverviewChart data={overviewData} />
        <PlatformBreakdown data={platformData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EngagementMetrics data={engagementData} />
        <PostStatusTracker />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
