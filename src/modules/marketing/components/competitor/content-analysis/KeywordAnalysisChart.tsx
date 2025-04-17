
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const keywordData = [
  { name: 'طبيعي', value: 35 },
  { name: 'عناية', value: 25 },
  { name: 'بشرة', value: 20 },
  { name: 'شعر', value: 15 },
  { name: 'أكثر', value: 5 },
];

const COLORS = ['#3a7a89', '#f59e0b', '#8b5cf6', '#ef4444', '#10b981'];

const KeywordAnalysisChart = () => {
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={keywordData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={50}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {keywordData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KeywordAnalysisChart;
