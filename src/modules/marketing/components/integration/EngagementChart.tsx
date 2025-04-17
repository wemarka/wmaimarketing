
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface EngagementChartProps {
  data: {
    day: string;
    instagram: number;
    facebook: number;
    twitter: number;
    tiktok: number;
  }[];
}

const EngagementChart = ({ data }: EngagementChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-beauty-purple" />
          التفاعل اليومي
        </CardTitle>
        <CardDescription>مقارنة التفاعل اليومي على مختلف المنصات</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="instagram" name="انستغرام" stackId="a" fill="#E1306C" />
              <Bar dataKey="facebook" name="فيسبوك" stackId="a" fill="#4267B2" />
              <Bar dataKey="twitter" name="تويتر" stackId="a" fill="#1DA1F2" />
              <Bar dataKey="tiktok" name="تيك توك" stackId="a" fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;
