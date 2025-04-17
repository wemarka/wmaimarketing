
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';

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
  const [chartType, setChartType] = useState<'all' | 'top'>('all');
  
  const getFilteredData = () => {
    if (chartType === 'top') {
      // Get only the top 3 platforms by average engagement
      const averages = {
        instagram: data.reduce((sum, point) => sum + point.instagram, 0) / data.length,
        facebook: data.reduce((sum, point) => sum + point.facebook, 0) / data.length,
        twitter: data.reduce((sum, point) => sum + point.twitter, 0) / data.length,
        linkedin: data.reduce((sum, point) => sum + point.linkedin, 0) / data.length,
        tiktok: data.reduce((sum, point) => sum + point.tiktok, 0) / data.length,
      };
      
      const platforms = Object.entries(averages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([platform]) => platform);
      
      return data.map(point => {
        const newPoint: any = { day: point.day };
        platforms.forEach(platform => {
          newPoint[platform] = point[platform as keyof typeof point];
        });
        return newPoint;
      });
    }
    
    return data;
  };

  const getPlatformColor = (platform: string) => {
    switch(platform) {
      case 'instagram': return '#E1306C';
      case 'facebook': return '#4267B2';
      case 'twitter': return '#1DA1F2';
      case 'linkedin': return '#0077B5';
      case 'tiktok': return '#000000';
      default: return '#CCCCCC';
    }
  };

  const getPlatformName = (platform: string) => {
    switch(platform) {
      case 'instagram': return 'انستغرام';
      case 'facebook': return 'فيسبوك';
      case 'twitter': return 'تويتر';
      case 'linkedin': return 'لينكد إن';
      case 'tiktok': return 'تيك توك';
      default: return platform;
    }
  };

  const chartData = getFilteredData();
  const platforms = chartType === 'all' 
    ? ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok']
    : Object.keys(chartData[0]).filter(key => key !== 'day');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base">تحليل التفاعل</CardTitle>
          <CardDescription>معدلات التفاعل اليومية عبر منصات التواصل الاجتماعي</CardDescription>
        </div>
        <Select value={chartType} onValueChange={(value) => setChartType(value as 'all' | 'top')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="عرض المنصات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المنصات</SelectItem>
            <SelectItem value="top">أفضل 3 منصات</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
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
              <Tooltip formatter={(value, name) => [value, getPlatformName(name)]} />
              <Legend formatter={(value) => getPlatformName(value)} />
              {platforms.map(platform => (
                <Bar 
                  key={platform}
                  dataKey={platform} 
                  name={platform}
                  fill={getPlatformColor(platform)} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;
