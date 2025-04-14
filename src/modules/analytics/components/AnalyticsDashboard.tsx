
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDashboardData } from "@/modules/analytics/components/dashboard/useDashboardData";

// Import components from the module structure
import {
  OverviewChart,
  EngagementMetrics,
  PlatformBreakdown,
  StatisticCard
} from "@/modules/analytics/components/dashboard";

const AnalyticsDashboard = () => {
  const {
    period,
    loading,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    handlePeriodChange
  } = useDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">لوحة التحكم التحليلية</h2>
          <p className="text-muted-foreground">نظرة عامة على أداء المحتوى والحملات</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">آخر 7 أيام</SelectItem>
              <SelectItem value="30days">آخر 30 يوم</SelectItem>
              <SelectItem value="3months">آخر 3 أشهر</SelectItem>
              <SelectItem value="year">آخر سنة</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">تصدير البيانات</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <StatisticCard
          title="المشاهدات"
          value={analyticsData.impressions.toString()}
          change={analyticsData.change.impressions.toString()}
          positive={analyticsData.change.impressions > 0}
          loading={loading}
        />
        <StatisticCard
          title="نسبة التفاعل"
          value={`${analyticsData.engagement}%`}
          change={analyticsData.change.engagement.toString()}
          positive={analyticsData.change.engagement > 0}
          loading={loading}
        />
        <StatisticCard
          title="نسبة النقرات"
          value={`${analyticsData.clicks}%`}
          change={analyticsData.change.clicks.toString()}
          positive={analyticsData.change.clicks > 0}
          loading={loading}
        />
        <StatisticCard
          title="التحويلات"
          value={analyticsData.conversions.toString()}
          change={analyticsData.change.conversions.toString()}
          positive={analyticsData.change.conversions > 0}
          loading={loading}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>نظرة عامة على الأداء</CardTitle>
          </CardHeader>
          <CardContent>
            <OverviewChart data={overviewData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>توزيع المنصات</CardTitle>
          </CardHeader>
          <CardContent>
            <PlatformBreakdown data={platformData} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>مقاييس التفاعل</CardTitle>
        </CardHeader>
        <CardContent>
          <EngagementMetrics data={engagementData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
