
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Share, MousePointerClick, ShoppingBag } from "lucide-react";
import { useDashboardData } from "./dashboard/useDashboardData";
import StatisticCard from "./dashboard/StatisticCard";
import OverviewChart from "./dashboard/OverviewChart";
import PlatformBreakdown from "./dashboard/PlatformBreakdown";
import EngagementMetrics from "./dashboard/EngagementMetrics";

const AnalyticsDashboard: React.FC = () => {
  const {
    period,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    handlePeriodChange
  } = useDashboardData();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="mb-1">لوحة التحليلات والتقارير</h1>
          <p className="text-muted-foreground max-w-2xl">
            تتبع أداء التسويق وفهم ما يؤثر على جمهورك المستهدف
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="حدد الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">آخر 7 أيام</SelectItem>
              <SelectItem value="30days">آخر 30 يوم</SelectItem>
              <SelectItem value="3months">آخر 3 أشهر</SelectItem>
              <SelectItem value="year">هذه السنة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatisticCard 
          title="إجمالي المشاهدات"
          value={analyticsData.impressions.toLocaleString()}
          change={analyticsData.change.impressions}
          icon={<Eye className="h-5 w-5 text-beauty-pink" />}
          iconBgClass="bg-beauty-pink/20"
        />
        
        <StatisticCard 
          title="معدل التفاعل"
          value={`${analyticsData.engagement}%`}
          change={analyticsData.change.engagement}
          icon={<Share className="h-5 w-5 text-beauty-purple" />}
          iconBgClass="bg-beauty-purple/20"
        />
        
        <StatisticCard 
          title="معدل النقر"
          value={`${analyticsData.clicks}%`}
          change={analyticsData.change.clicks}
          icon={<MousePointerClick className="h-5 w-5 text-beauty-gold" />}
          iconBgClass="bg-beauty-gold/20"
        />
        
        <StatisticCard 
          title="التحويلات"
          value={analyticsData.conversions}
          change={analyticsData.change.conversions}
          icon={<ShoppingBag className="h-5 w-5 text-blue-600" />}
          iconBgClass="bg-blue-100"
        />
      </div>
      
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <OverviewChart data={overviewData} />
        <PlatformBreakdown data={platformData} />
      </div>
      
      <EngagementMetrics data={engagementData} />
    </div>
  );
};

export default AnalyticsDashboard;
