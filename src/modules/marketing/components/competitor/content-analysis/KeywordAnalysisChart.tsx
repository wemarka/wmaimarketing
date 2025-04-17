
import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const keywordData = [
  { name: 'طبيعي', value: 35 },
  { name: 'عناية', value: 25 },
  { name: 'بشرة', value: 20 },
  { name: 'شعر', value: 15 },
  { name: 'أكثر', value: 5 },
];

const alternativeData = [
  { name: 'مرطب', value: 40 },
  { name: 'حماية', value: 30 },
  { name: 'تغذية', value: 20 },
  { name: 'زيوت', value: 10 },
];

const COLORS = ['#3a7a89', '#f59e0b', '#8b5cf6', '#ef4444', '#10b981'];

const KeywordAnalysisChart = () => {
  const [dataset, setDataset] = useState('primary');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const currentData = dataset === 'primary' ? keywordData : alternativeData;

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>تحليل الكلمات المفتاحية</CardTitle>
          <Select value={dataset} onValueChange={setDataset}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="اختر المجموعة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">المجموعة الأساسية</SelectItem>
              <SelectItem value="alternative">مجموعة بديلة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>تحليل الكلمات المفتاحية الأكثر استخداماً في محتوى المنافسين</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={activeIndex !== null ? 70 : 60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationDuration={300}
              >
                {currentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
                    stroke={activeIndex === index ? '#fff' : 'none'}
                    strokeWidth={activeIndex === index ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}%`, `الكلمة: ${name}`]} 
              />
              <Legend 
                verticalAlign="bottom" 
                align="center"
                layout="horizontal"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordAnalysisChart;
