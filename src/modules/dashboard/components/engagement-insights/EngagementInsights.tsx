
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import PeriodSelector from "./PeriodSelector";
import EngagementChart from "./EngagementChart";
import PlatformStatsCards from "./PlatformStatsCards";
import { engagementData, prevWeekData, calculateTotals } from "./engagementData";
import { EngagementDataPoint, PlatformTotals } from "./types";

const EngagementInsights: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<string>("week");
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Calculate totals for the current and previous periods
  const currentTotals: PlatformTotals = calculateTotals(engagementData);
  const prevTotals: PlatformTotals = calculateTotals(prevWeekData);
  
  // Change data based on selected time range
  const getCurrentData = (): EngagementDataPoint[] => {
    if (timeRange === "week") return engagementData;
    if (timeRange === "month") return engagementData.concat(engagementData);
    if (timeRange === "day") return engagementData.slice(0, 3);
    if (timeRange === "quarter") return engagementData.concat(engagementData).concat(engagementData);
    if (timeRange === "year") return engagementData.concat(engagementData).concat(engagementData).concat(engagementData);
    return engagementData;
  };

  const currentData = getCurrentData();
  
  // تحديث الفترة الزمنية
  const handleTimeRangeChange = (value: string) => {
    setLoading(true);
    setTimeRange(value);
    
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
      toast({
        title: t("dashboard.engagementInsights.periodChanged", "تم تغيير الفترة الزمنية"),
        description: t("dashboard.engagementInsights.dataUpdated", "تم تحديث بيانات التفاعل")
      });
    }, 500);
  };

  // Effect to handle initial load animation
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{t("dashboard.engagementInsights.title", "تحليل التفاعل")}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {t("dashboard.engagementInsights.subtitle", "مستوى تفاعل الجمهور عبر المنصات")}
          </p>
        </div>
        <PeriodSelector 
          value={timeRange}
          onChange={handleTimeRangeChange}
          compareMode={compareMode}
          onCompareModeToggle={() => setCompareMode(!compareMode)}
        />
      </CardHeader>
      <CardContent>
        <EngagementChart 
          currentData={currentData}
          compareMode={compareMode}
          prevWeekData={prevWeekData}
          loading={loading}
        />
        
        <PlatformStatsCards 
          currentTotals={currentTotals}
          prevTotals={prevTotals}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default EngagementInsights;
