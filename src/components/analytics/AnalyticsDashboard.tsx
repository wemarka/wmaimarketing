
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, MousePointerClick, DollarSign, AlertTriangle, RefreshCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import PostStatusTracker from "./PostStatusTracker";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

// استيراد المكونات من البنية الجديدة
import {
  OverviewChart,
  EngagementMetrics,
  PlatformBreakdown,
  StatisticCard,
} from "@/modules/analytics/components/dashboard";

// استخدام Hook المُحسّن للبيانات
import { useDashboardData } from "@/modules/dashboard/components/useDashboardData";

export const AnalyticsDashboard = () => {
  const {
    period,
    loading,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    isUsingFallbackData,
    handlePeriodChange,
    refreshData
  } = useDashboardData();
  const { t } = useTranslation();

  // تحسين عرض حالة التحميل
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin text-primary mr-2" />
        <span>{t("common.loading", "جاري تحميل بيانات التحليلات...")}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isUsingFallbackData && (
        <Alert variant="warning" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t("analytics.fallbackData.title", "استخدام البيانات الاحتياطية")}</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>
              {t(
                "analytics.fallbackData.description",
                "تعذر الاتصال بالخادم، نعرض لك بيانات مخزنة مسبقًا. سنحاول تحديثها فور استعادة الاتصال."
              )}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 flex items-center gap-1"
              onClick={refreshData}
            >
              <RefreshCw className="h-3 w-3" /> {t("common.retry", "إعادة المحاولة")}
            </Button>
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
        <Card className="md:col-span-3 relative">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t("dashboard.charts.overview.title", "نظرة عامة")}</span>
              {isUsingFallbackData && (
                <Badge variant="outline" className="text-amber-500 border-amber-500">
                  {t("analytics.cachedData", "بيانات مخزنة مؤقتًا")}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OverviewChart data={overviewData} />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 relative">
          <CardHeader>
            <CardTitle>{t("dashboard.charts.platforms.title", "المنصات")}</CardTitle>
          </CardHeader>
          <CardContent>
            <PlatformBreakdown data={platformData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.charts.engagement.title", "التفاعل")}</CardTitle>
          </CardHeader>
          <CardContent>
            <EngagementMetrics data={engagementData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.posts.tracker.title", "حالة المنشورات")}</CardTitle>
          </CardHeader>
          <CardContent>
            <PostStatusTracker />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
