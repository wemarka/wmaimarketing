
import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";
import { EngagementDataPoint } from "./types";

interface EngagementChartProps {
  currentData: EngagementDataPoint[];
  compareMode: boolean;
  prevWeekData: EngagementDataPoint[];
  loading?: boolean;
}

const EngagementChart: React.FC<EngagementChartProps> = ({
  currentData,
  compareMode,
  prevWeekData,
  loading = false,
}) => {
  return (
    <div className="h-[300px]">
      {loading ? (
        <div className="h-full w-full flex items-center justify-center bg-slate-50 rounded-md">
          <div className="animate-pulse text-muted-foreground">جاري تحميل البيانات...</div>
        </div>
      ) : (
        <ChartContainer
          config={{
            instagram: { label: "انستجرام", color: "#E1306C" },
            facebook: { label: "فيسبوك", color: "#4267B2" },
            tiktok: { label: "تيك توك", color: "#000000" },
            instagram_prev: { label: "انستجرام (سابق)", color: "#F7CAD7" },
            facebook_prev: { label: "فيسبوك (سابق)", color: "#A4BDF1" },
            tiktok_prev: { label: "تيك توك (سابق)", color: "#CCCCCC" }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={currentData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis 
                tickFormatter={(value) => {
                  if (value >= 1000) {
                    return `${(value / 1000).toFixed(0)}K`;
                  }
                  return value;
                }}
              />
              <Tooltip />
              <Legend />
              
              {/* رسم بياني للفترة الحالية */}
              <Area
                type="monotone"
                dataKey="instagram"
                name="انستجرام"
                stroke="#E1306C"
                fill="#E1306C"
                fillOpacity={0.2}
                activeDot={{ r: 8 }}
              />
              <Area
                type="monotone"
                dataKey="facebook"
                name="فيسبوك"
                stroke="#4267B2"
                fill="#4267B2"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="tiktok"
                name="تيك توك"
                stroke="#000000"
                fill="#000000"
                fillOpacity={0.2}
              />
              
              {/* رسم بياني للفترة السابقة (إذا كان وضع المقارنة مفعل) */}
              {compareMode && prevWeekData.map((item, index) => {
                if (index < currentData.length) {
                  return {
                    ...currentData[index],
                    instagram_prev: prevWeekData[index].instagram,
                    facebook_prev: prevWeekData[index].facebook,
                    tiktok_prev: prevWeekData[index].tiktok
                  };
                }
                return null;
              }).filter(Boolean).map((item, index) => (
                <React.Fragment key={index}>
                  <Area
                    type="monotone"
                    dataKey="instagram_prev"
                    name="انستجرام (سابق)"
                    stroke="#E1306C"
                    fill="#E1306C"
                    fillOpacity={0.1}
                    strokeDasharray="3 3"
                  />
                  <Area
                    type="monotone"
                    dataKey="facebook_prev"
                    name="فيسبوك (سابق)"
                    stroke="#4267B2"
                    fill="#4267B2"
                    fillOpacity={0.1}
                    strokeDasharray="3 3"
                  />
                  <Area
                    type="monotone"
                    dataKey="tiktok_prev"
                    name="تيك توك (سابق)"
                    stroke="#000000"
                    fill="#000000"
                    fillOpacity={0.1}
                    strokeDasharray="3 3"
                  />
                </React.Fragment>
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </div>
  );
};

export default EngagementChart;
