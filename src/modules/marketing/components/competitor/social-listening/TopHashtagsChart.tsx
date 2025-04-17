
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
} from 'recharts';

const hashtagsData = [
  { name: '#beauty', value: 45 },
  { name: '#skincare', value: 35 },
  { name: '#natural', value: 30 },
  { name: '#makeup', value: 25 },
  { name: '#cosmetics', value: 20 },
];

const TopHashtagsChart = () => {
  return (
    <div className="h-48">
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
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopHashtagsChart;
