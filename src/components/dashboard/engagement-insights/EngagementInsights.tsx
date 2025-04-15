
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import PeriodSelector from "./PeriodSelector";
import EngagementChart from "./EngagementChart";
import PlatformStatsCards from "./PlatformStatsCards";
import { engagementData, prevWeekData, calculateTotals } from "./engagementData";

const EngagementInsights: React.FC = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<string>("week");
  const [compareMode, setCompareMode] = useState<boolean>(false);
  
  // Calculate totals for the current and previous periods
  const currentTotals = calculateTotals(engagementData);
  const prevTotals = calculateTotals(prevWeekData);
  
  // Change data based on selected time range
  const getCurrentData = () => {
    if (timeRange === "week") return engagementData;
    if (timeRange === "month") return engagementData.concat(engagementData);
    if (timeRange === "day") return engagementData.slice(0, 3);
    return engagementData;
  };

  const currentData = getCurrentData();

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
          onChange={setTimeRange}
          compareMode={compareMode}
          onCompareModeToggle={() => setCompareMode(!compareMode)}
        />
      </CardHeader>
      <CardContent>
        <EngagementChart 
          currentData={currentData}
          compareMode={compareMode}
          prevWeekData={prevWeekData}
        />
        
        <PlatformStatsCards 
          currentTotals={currentTotals}
          prevTotals={prevTotals}
        />
      </CardContent>
    </Card>
  );
};

export default EngagementInsights;
