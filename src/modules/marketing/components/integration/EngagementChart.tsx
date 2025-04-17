
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EngagementChartProps {
  data: {
    day: string;
    instagram: number;
    facebook: number;
    twitter: number;
    linkedin: number;
    tiktok: number;
  }[];
}

const EngagementChart: React.FC<EngagementChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">تحليل التفاعل</CardTitle>
        <CardDescription>معدلات التفاعل اليومية عبر منصات التواصل الاجتماعي</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="instagram" name="انستغرام" fill="#E1306C" />
              <Bar dataKey="facebook" name="فيسبوك" fill="#4267B2" />
              <Bar dataKey="twitter" name="تويتر" fill="#1DA1F2" />
              <Bar dataKey="linkedin" name="لينكد إن" fill="#0077B5" />
              <Bar dataKey="tiktok" name="تيك توك" fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;
