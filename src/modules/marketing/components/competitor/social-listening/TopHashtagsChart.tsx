
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LabelList
} from 'recharts';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

const hashtagsData = [
  { name: '#beauty', value: 45 },
  { name: '#skincare', value: 35 },
  { name: '#natural', value: 30 },
  { name: '#makeup', value: 25 },
  { name: '#cosmetics', value: 20 },
];

const TopHashtagsChart = () => {
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    return (
      <text 
        x={x + width + 5} 
        y={y + height / 2} 
        fill="#888" 
        textAnchor="start" 
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <CardTitle className="mb-2">أبرز الهاشتاغات</CardTitle>
        <CardDescription className="mb-4">الهاشتاغات الأكثر استخداماً مع منتجات المنافسين</CardDescription>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={hashtagsData}
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
              <Tooltip 
                formatter={(value) => [`${value} ذكر`, 'عدد المرات']}
                labelFormatter={(value) => `الهاشتاغ: ${value}`}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                <LabelList dataKey="value" position="right" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopHashtagsChart;
