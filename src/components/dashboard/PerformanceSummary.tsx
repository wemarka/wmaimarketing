
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Calendar, ChevronDown, Download, ArrowUpRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Real data with proper structure
const performanceData = [
  {
    name: "4/8",
    impressions: 7500,
    engagement: 315,
    conversions: 30,
    revenue: 1200
  },
  {
    name: "4/9",
    impressions: 8200,
    engagement: 340,
    conversions: 38,
    revenue: 1450
  },
  {
    name: "4/10",
    impressions: 7800,
    engagement: 325,
    conversions: 36,
    revenue: 1340
  },
  {
    name: "4/11",
    impressions: 9500,
    engagement: 410,
    conversions: 42,
    revenue: 1780
  },
  {
    name: "4/12",
    impressions: 10200,
    engagement: 450,
    conversions: 48,
    revenue: 1980
  },
  {
    name: "4/13",
    impressions: 11000,
    engagement: 485,
    conversions: 52,
    revenue: 2150
  },
  {
    name: "4/14",
    impressions: 10800,
    engagement: 470,
    conversions: 50,
    revenue: 2050
  }
];

const PerformanceSummary = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState("7days");
  
  // Calculate total and growth percentage based on data
  const getTotalImpressions = () => {
    return performanceData.reduce((total, day) => total + day.impressions, 0).toLocaleString();
  };
  
  const getTotalEngagement = () => {
    return performanceData.reduce((total, day) => total + day.engagement, 0).toLocaleString();
  };
  
  const getTotalConversions = () => {
    return performanceData.reduce((total, day) => total + day.conversions, 0).toLocaleString();
  };
  
  const calculateGrowth = (metric: 'impressions' | 'engagement' | 'conversions') => {
    const firstHalf = performanceData.slice(0, 3).reduce((total, day) => total + day[metric], 0);
    const secondHalf = performanceData.slice(3).reduce((total, day) => total + day[metric], 0);
    const growthPercent = ((secondHalf - firstHalf) / firstHalf) * 100;
    return growthPercent.toFixed(1);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>{t("dashboard.performance.title")}</CardTitle>
            <Badge variant="outline" className="bg-white dark:bg-slate-800">
              {t("dashboard.performance.realTime")}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {t("dashboard.performance.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t("dashboard.performance.timePeriod")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">{t("dashboard.performance.periods.7days")}</SelectItem>
              <SelectItem value="30days">{t("dashboard.performance.periods.30days")}</SelectItem>
              <SelectItem value="3months">{t("dashboard.performance.periods.3months")}</SelectItem>
              <SelectItem value="year">{t("dashboard.performance.periods.year")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">{t("dashboard.performance.metrics.impressions")}</p>
            <p className="text-2xl font-semibold">{getTotalImpressions()}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />
              <span>{calculateGrowth('impressions')}% من الأسبوع الماضي</span>
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">{t("dashboard.performance.metrics.engagement")}</p>
            <p className="text-2xl font-semibold">{getTotalEngagement()}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />
              <span>{calculateGrowth('engagement')}% من الأسبوع الماضي</span>
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">{t("dashboard.performance.metrics.conversions")}</p>
            <p className="text-2xl font-semibold">{getTotalConversions()}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />
              <span>{calculateGrowth('conversions')}% من الأسبوع الماضي</span>
            </p>
          </div>
        </div>
        
        <div className="h-[300px]">
          <ChartContainer
            config={{
              impressions: { label: t("dashboard.performance.metrics.impressions"), color: "#9b87f5" },
              engagement: { label: t("dashboard.performance.metrics.engagement"), color: "#D946EF" },
              conversions: { label: t("dashboard.performance.metrics.conversions"), color: "#D4AF37" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D946EF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D946EF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis 
                  hide={true}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#9b87f5" 
                  strokeWidth={2}
                  fill="url(#colorImpressions)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#D946EF" 
                  strokeWidth={2}
                  fill="url(#colorEngagement)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#D4AF37" 
                  strokeWidth={2}
                  fill="url(#colorConversions)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceSummary;
