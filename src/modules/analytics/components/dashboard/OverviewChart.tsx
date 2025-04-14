
import React from "react";
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
  Line
} from "recharts";

interface OverviewChartProps {
  data: any[];
}

const OverviewChart: React.FC<OverviewChartProps> = ({ data }) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>نمو الجمهور</CardTitle>
        <CardDescription>المشاهدات اليومية خلال الأيام السبعة الماضية</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer 
          config={{
            impressions: { label: "المشاهدات", color: "#9b87f5" },
            engagement: { label: "التفاعل", color: "#D946EF" },
            clicks: { label: "النقرات", color: "#D4AF37" },
            revenue: { label: "الإيرادات", color: "#0EA5E9" }
          }}
          className="h-[300px]"
        >
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="impressions" 
              fill="#9b87f5" 
              stroke="#9b87f5" 
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
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OverviewChart;
