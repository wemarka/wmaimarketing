
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

// Mock data for the social media performance
const socialPerformanceData = [
  { name: 'Instagram', value: 45, color: '#E1306C' },
  { name: 'Facebook', value: 25, color: '#4267B2' },
  { name: 'TikTok', value: 20, color: '#000000' },
  { name: 'Twitter', value: 10, color: '#1DA1F2' },
];

const socialTrendsData = [
  { day: 'الأحد', instagram: 150, facebook: 100, tiktok: 120, twitter: 80 },
  { day: 'الإثنين', instagram: 180, facebook: 110, tiktok: 130, twitter: 70 },
  { day: 'الثلاثاء', instagram: 170, facebook: 120, tiktok: 160, twitter: 90 },
  { day: 'الأربعاء', instagram: 190, facebook: 105, tiktok: 140, twitter: 85 },
  { day: 'الخميس', instagram: 220, facebook: 115, tiktok: 170, twitter: 95 },
  { day: 'الجمعة', instagram: 200, facebook: 130, tiktok: 150, twitter: 100 },
  { day: 'السبت', instagram: 240, facebook: 125, tiktok: 190, twitter: 110 },
];

const SocialMediaPerformance: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>توزيع التفاعل على المنصات</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={socialPerformanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {socialPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  layout="horizontal" 
                  formatter={(value) => <span className="text-sm">{value}</span>}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'نسبة التفاعل']} 
                  labelFormatter={() => ''} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>اتجاهات التفاعل الأسبوعية</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={socialTrendsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="instagram" stroke="#E1306C" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="facebook" stroke="#4267B2" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaPerformance;
