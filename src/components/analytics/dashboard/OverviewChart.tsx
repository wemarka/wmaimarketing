
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Bar,
  Line,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Download, CalendarDays, BarChart3 } from "lucide-react";
import { AIFeedbackMessage } from "@/components/dashboard/AIFeedbackMessage";

interface OverviewChartProps {
  data: any[];
}

// Custom tooltip formatter for rich display
const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-100">
      <p className="text-sm font-medium mb-2 text-slate-800">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-medium">
              {entry.name === "الإيرادات" 
                ? `${entry.value.toLocaleString()} ر.س` 
                : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Format Y-axis ticks to be more readable
const formatYAxisTick = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value;
};

const OverviewChart: React.FC<OverviewChartProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter" | "year">("week");
  
  return (
    <Card className="md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>نمو الجمهور</CardTitle>
          <CardDescription>المشاهدات اليومية خلال الأيام السبعة الماضية</CardDescription>
        </div>
        
        {/* Chart controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted/30 rounded-lg p-0.5">
            <Button 
              variant={timeRange === "week" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => setTimeRange("week")}
            >
              أسبوع
            </Button>
            <Button 
              variant={timeRange === "month" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => setTimeRange("month")}
            >
              شهر
            </Button>
            <Button 
              variant={timeRange === "quarter" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => setTimeRange("quarter")}
            >
              ربع سنة
            </Button>
          </div>
          
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-2 pt-0">
        {/* AI-powered feedback message */}
        <div className="mx-4 mb-4">
          <AIFeedbackMessage 
            performanceData={{
              current: 85000,
              previous: 72000,
              metric: "المشاهدات",
              sourceChannel: "فيسبوك"
            }}
          />
        </div>
        
        <ChartContainer 
          config={{
            impressions: { label: "المشاهدات", color: "#9b87f5" },
            engagement: { label: "التفاعل", color: "#D946EF" },
            clicks: { label: "النقرات", color: "#D4AF37" },
            revenue: { label: "الإيرادات", color: "#0EA5E9" }
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tickMargin={10} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left" 
                tickFormatter={formatYAxisTick}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tickFormatter={(value) => `${formatYAxisTick(value)} ر.س`}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="impressions" 
                fill="url(#colorImpressions)" 
                stroke="#9b87f5" 
                strokeWidth={2}
                fillOpacity={0.3}
              />
              <Bar 
                yAxisId="left"
                dataKey="engagement" 
                fill="#D946EF" 
                radius={[4, 4, 0, 0]} 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="#0EA5E9" 
                strokeWidth={2}
                dot={{ r: 4, fill: "#0EA5E9", stroke: "white", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#0EA5E9", stroke: "white", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OverviewChart;
