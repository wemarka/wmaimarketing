
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

const sentimentData = [
  { name: 'إيجابي', value: 60, color: '#10b981' },
  { name: 'محايد', value: 30, color: '#f59e0b' },
  { name: 'سلبي', value: 10, color: '#ef4444' },
];

const SentimentAnalysisChart = () => {
  const totalSentiments = sentimentData.reduce((acc, item) => acc + item.value, 0);
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <CardTitle className="mb-2">تحليل المشاعر</CardTitle>
        <CardDescription className="mb-4">توزيع المشاعر في المحادثات الاجتماعية</CardDescription>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} (${((value as number) / totalSentiments * 100).toFixed(0)}%)`, 'النسبة']} />
              <Legend verticalAlign="bottom" align="center" layout="horizontal" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 mt-4 text-center">
          {sentimentData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-medium">{item.name}</span>
              <span className="text-sm text-muted-foreground">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysisChart;
