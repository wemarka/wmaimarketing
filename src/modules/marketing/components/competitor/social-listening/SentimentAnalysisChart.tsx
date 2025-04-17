
import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';

const sentimentData = [
  { name: 'إيجابية', value: 60, color: '#10b981' },
  { name: 'محايدة', value: 30, color: '#f59e0b' },
  { name: 'سلبية', value: 10, color: '#ef4444' }
];

const SentimentAnalysisChart = () => {
  const total = sentimentData.reduce((acc, current) => acc + current.value, 0);
  
  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sentimentData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {sentimentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} (${((value as number) / total * 100).toFixed(1)}%)`, 'عدد المرات']} 
          />
          <Legend verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentAnalysisChart;
