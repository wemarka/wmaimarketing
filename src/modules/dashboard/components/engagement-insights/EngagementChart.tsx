
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
              <defs>
                <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E1306C" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#E1306C" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4267B2" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4267B2" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorTiktok" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#000000" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
              <XAxis dataKey="day" stroke="#888888" fontSize={12} tickMargin={10} />
              <YAxis 
                tickFormatter={(value) => {
                  if (value >= 1000) {
                    return `${(value / 1000).toFixed(0)}K`;
                  }
                  return value;
                }}
                stroke="#888888"
                fontSize={12}
                tickMargin={10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  padding: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #eaeaea'
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
              />
              <Legend 
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{ paddingTop: '10px' }}
              />
              
              {/* رسم بياني للفترة الحالية */}
              <Area
                type="monotone"
                dataKey="instagram"
                name="انستجرام"
                stroke="#E1306C"
                fill="url(#colorInstagram)"
                fillOpacity={1}
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
              />
              <Area
                type="monotone"
                dataKey="facebook"
                name="فيسبوك"
                stroke="#4267B2"
                fill="url(#colorFacebook)"
                fillOpacity={1}
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
                animationBegin={300}
              />
              <Area
                type="monotone"
                dataKey="tiktok"
                name="تيك توك"
                stroke="#000000"
                fill="url(#colorTiktok)"
                fillOpacity={1}
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
                animationBegin={600}
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
                    strokeWidth={1.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="facebook_prev"
                    name="فيسبوك (سابق)"
                    stroke="#4267B2"
                    fill="#4267B2"
                    fillOpacity={0.1}
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="tiktok_prev"
                    name="تيك توك (سابق)"
                    stroke="#000000"
                    fill="#000000"
                    fillOpacity={0.1}
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
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
