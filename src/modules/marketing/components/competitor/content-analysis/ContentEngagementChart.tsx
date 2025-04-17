
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const engagementData = [
  { name: 'يناير', competitor1: 65, competitor2: 45, your_brand: 55 },
  { name: 'فبراير', competitor1: 59, competitor2: 49, your_brand: 58 },
  { name: 'مارس', competitor1: 80, competitor2: 55, your_brand: 60 },
  { name: 'أبريل', competitor1: 81, competitor2: 56, your_brand: 65 },
  { name: 'مايو', competitor1: 56, competitor2: 40, your_brand: 70 },
  { name: 'يونيو', competitor1: 55, competitor2: 50, your_brand: 68 },
];

const ContentEngagementChart = () => {
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={engagementData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Line type="monotone" dataKey="your_brand" name="علامتك التجارية" stroke="#3a7a89" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="competitor1" name="المنافس 1" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="competitor2" name="المنافس 2" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContentEngagementChart;
