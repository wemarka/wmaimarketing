
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const contentTypeData = [
  { name: 'صور', value: 45, color: '#3a7a89' },
  { name: 'فيديو', value: 30, color: '#8b5cf6' },
  { name: 'نص', value: 15, color: '#f59e0b' },
  { name: 'carousel', value: 10, color: '#ef4444' },
];

const ContentTypeDistribution = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>أنواع المحتوى</CardTitle>
        <CardDescription>توزيع أنواع المحتوى المنشور من قبل المنافسين</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={contentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {contentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend verticalAlign="bottom" align="center" layout="horizontal" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center mt-4">
          {contentTypeData.map((type, index) => (
            <div key={index} className="p-2 rounded-md" style={{ backgroundColor: `${type.color}20` }}>
              <div className="w-3 h-3 rounded-full mx-auto" style={{ backgroundColor: type.color }} />
              <p className="text-xs mt-1">{type.name}</p>
              <p className="font-medium">{type.value}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentTypeDistribution;
