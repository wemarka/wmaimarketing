
import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { date: '01-01', positive: 20, neutral: 15, negative: 5, total: 40 },
  { date: '01-02', positive: 25, neutral: 10, negative: 8, total: 43 },
  { date: '01-03', positive: 30, neutral: 12, negative: 3, total: 45 },
  { date: '01-04', positive: 40, neutral: 18, negative: 2, total: 60 },
  { date: '01-05', positive: 35, neutral: 15, negative: 7, total: 57 },
  { date: '01-06', positive: 45, neutral: 20, negative: 5, total: 70 },
  { date: '01-07', positive: 60, neutral: 25, negative: 3, total: 88 },
  { date: '01-08', positive: 50, neutral: 22, negative: 10, total: 82 },
  { date: '01-09', positive: 55, neutral: 18, negative: 8, total: 81 },
  { date: '01-10', positive: 70, neutral: 20, negative: 5, total: 95 },
  { date: '01-11', positive: 80, neutral: 15, negative: 7, total: 102 },
  { date: '01-12', positive: 65, neutral: 23, negative: 2, total: 90 },
];

const MentionsTrendChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => {
            const labels = {
              positive: 'إيجابي',
              neutral: 'محايد',
              negative: 'سلبي',
              total: 'الإجمالي'
            };
            return [value, labels[name as keyof typeof labels]];
          }}
        />
        <Legend 
          formatter={(value) => {
            const labels = {
              positive: 'إيجابي',
              neutral: 'محايد',
              negative: 'سلبي',
              total: 'الإجمالي'
            };
            return labels[value as keyof typeof labels];
          }}
        />
        <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" strokeWidth={2} fillOpacity={0.1} />
        <Area type="monotone" dataKey="positive" stroke="#10b981" fill="#10b981" fillOpacity={0.6} stackId="1" />
        <Area type="monotone" dataKey="neutral" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} stackId="1" />
        <Area type="monotone" dataKey="negative" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} stackId="1" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MentionsTrendChart;
