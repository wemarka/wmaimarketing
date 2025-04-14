
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Sample data
const marketingData = [
  { name: "Instagram", current: 7400, previous: 6200 },
  { name: "Facebook", current: 5100, previous: 4800 },
  { name: "TikTok", current: 4200, previous: 2800 },
  { name: "Email", current: 3500, previous: 3200 },
  { name: "Website", current: 2800, previous: 2500 }
];

const MarketingStats = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{t("dashboard.marketing.title")}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {t("dashboard.marketing.subtitle")}
          </p>
        </div>
        <Badge variant="outline">{t("dashboard.marketing.timeframe")}</Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          <ChartContainer
            config={{
              current: { label: t("dashboard.marketing.currentPeriod"), color: "#9b87f5" },
              previous: { label: t("dashboard.marketing.previousPeriod"), color: "#D6BCFA" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={marketingData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                <Bar 
                  dataKey="current" 
                  fill="#9b87f5" 
                  radius={[4, 4, 0, 0]} 
                  barSize={26} 
                />
                <Bar 
                  dataKey="previous" 
                  fill="#D6BCFA" 
                  radius={[4, 4, 0, 0]} 
                  barSize={26} 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {marketingData.map((item) => {
            const growthPercent = ((item.current - item.previous) / item.previous * 100).toFixed(1);
            const isPositive = item.current >= item.previous;
            
            return (
              <Card key={item.name} className="bg-slate-50 dark:bg-slate-900 border-none">
                <CardContent className="p-4">
                  <p className="text-xs font-medium">{item.name}</p>
                  <p className="text-xl font-semibold mt-1">{item.current.toLocaleString()}</p>
                  <p className={`text-xs mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{growthPercent}%
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingStats;
