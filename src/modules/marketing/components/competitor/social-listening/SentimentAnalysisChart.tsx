
import React from 'react';
import { Doughnut } from 'recharts';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const sentimentData = [
  { name: 'إيجابي', value: 60, color: '#10b981' },
  { name: 'محايد', value: 30, color: '#f59e0b' },
  { name: 'سلبي', value: 10, color: '#ef4444' },
];

const SentimentAnalysisChart = () => {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sentimentData}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            paddingAngle={5}
            dataKey="value"
          >
            {sentimentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentAnalysisChart;
