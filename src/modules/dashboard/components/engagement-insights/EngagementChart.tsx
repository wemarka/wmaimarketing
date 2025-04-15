
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { EngagementDataPoint } from "./types";

interface EngagementChartProps {
  currentData: EngagementDataPoint[];
  prevWeekData?: EngagementDataPoint[];
  compareMode?: boolean;
  loading?: boolean;
}

const EngagementChart: React.FC<EngagementChartProps> = ({ 
  currentData, 
  prevWeekData = [], 
  compareMode = false, 
  loading = false 
}) => {
  // Combine current and previous data for comparison mode
  const combinedData = compareMode 
    ? currentData.map((item, index) => {
        const prevItem = prevWeekData[index] || { day: '', instagram: 0, facebook: 0, tiktok: 0 };
        return {
          name: item.day,
          instagram: item.instagram,
          facebook: item.facebook,
          tiktok: item.tiktok,
          prevInstagram: prevItem.instagram,
          prevFacebook: prevItem.facebook,
          prevTiktok: prevItem.tiktok,
        };
      })
    : currentData.map((item) => ({
        name: item.day,
        instagram: item.instagram,
        facebook: item.facebook,
        tiktok: item.tiktok,
      }));
    
  if (loading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <div className="space-y-2 w-full">
          <Skeleton className="h-[300px] w-full rounded-xl bg-muted/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full py-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={combinedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tickMargin={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tickMargin={10}
          />
          <Tooltip />
          <Legend />
          
          {/* Current period lines */}
          <Line 
            type="monotone" 
            dataKey="instagram" 
            name="Instagram" 
            stroke="#C13584" 
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="facebook" 
            name="Facebook" 
            stroke="#4267B2" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="tiktok" 
            name="TikTok" 
            stroke="#000000" 
            strokeWidth={2}
          />
          
          {/* Previous period lines (only visible in compare mode) */}
          {compareMode && (
            <>
              <Line 
                type="monotone" 
                dataKey="prevInstagram" 
                name="Instagram (سابق)" 
                stroke="#C13584" 
                strokeWidth={1.5}
                strokeDasharray="5 5"
                opacity={0.7}
              />
              <Line 
                type="monotone" 
                dataKey="prevFacebook" 
                name="Facebook (سابق)" 
                stroke="#4267B2" 
                strokeWidth={1.5}
                strokeDasharray="5 5"
                opacity={0.7}
              />
              <Line 
                type="monotone" 
                dataKey="prevTiktok" 
                name="TikTok (سابق)" 
                stroke="#000000" 
                strokeWidth={1.5}
                strokeDasharray="5 5"
                opacity={0.7}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;
