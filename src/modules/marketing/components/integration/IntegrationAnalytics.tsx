
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const analyticsData = [
  { date: '2025-01', instagram: 120, facebook: 150, twitter: 60, tiktok: 200 },
  { date: '2025-02', instagram: 145, facebook: 132, twitter: 71, tiktok: 240 },
  { date: '2025-03', instagram: 162, facebook: 120, twitter: 85, tiktok: 280 },
  { date: '2025-04', instagram: 170, facebook: 142, twitter: 95, tiktok: 310 },
  { date: '2025-05', instagram: 190, facebook: 160, twitter: 112, tiktok: 350 },
  { date: '2025-06', instagram: 230, facebook: 180, twitter: 125, tiktok: 390 },
];

const IntegrationAnalytics = () => {
  return (
    <Card className="shadow-lg border-beauty-purple/10">
      <CardHeader className="bg-gradient-to-r from-beauty-purple/10 to-beauty-lightpurple/10">
        <CardTitle className="text-xl">تحليلات التكامل</CardTitle>
        <CardDescription>
          تحليل أداء المنصات المتكاملة ومقارنة النتائج
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={analyticsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`;
                }}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => {
                  const date = new Date(value);
                  const month = date.toLocaleString('ar-SA', { month: 'long' });
                  return `${month} ${date.getFullYear()}`;
                }}
                formatter={(value, name) => {
                  const platforms = {
                    instagram: 'انستغرام',
                    facebook: 'فيسبوك',
                    twitter: 'تويتر',
                    tiktok: 'تيك توك'
                  };
                  return [`${value} تفاعل`, platforms[name as keyof typeof platforms]];
                }}
              />
              <Legend
                formatter={(value) => {
                  const platforms = {
                    instagram: 'انستغرام',
                    facebook: 'فيسبوك',
                    twitter: 'تويتر',
                    tiktok: 'تيك توك'
                  };
                  return platforms[value as keyof typeof platforms];
                }}
              />
              <Line type="monotone" dataKey="instagram" stroke="#E1306C" strokeWidth={2} />
              <Line type="monotone" dataKey="facebook" stroke="#4267B2" strokeWidth={2} />
              <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} />
              <Line type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatCard title="انستغرام" value="230" change="+21%" positive={true} color="#E1306C" />
          <StatCard title="فيسبوك" value="180" change="+12.5%" positive={true} color="#4267B2" />
          <StatCard title="تويتر" value="125" change="+13.6%" positive={true} color="#1DA1F2" />
          <StatCard title="تيك توك" value="390" change="+11.4%" positive={true} color="#000000" />
        </div>
      </CardContent>
    </Card>
  );
};

const StatCard = ({ title, value, change, positive, color }: { 
  title: string; 
  value: string; 
  change: string;
  positive: boolean;
  color: string;
}) => {
  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`text-xs mt-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </div>
    </div>
  );
};

export default IntegrationAnalytics;
