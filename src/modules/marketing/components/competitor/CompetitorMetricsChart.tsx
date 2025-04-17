
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Metric {
  category: string;
  your_brand: number;
  competitor1: number;
  competitor2: number;
  competitor3: number;
}

interface CompetitorMetricsChartProps {
  metrics: Metric[];
}

const CompetitorMetricsChart = ({ metrics }: CompetitorMetricsChartProps) => {
  const [metricType, setMetricType] = useState('all');
  
  const filteredMetrics = metricType === 'all' 
    ? metrics 
    : metrics.filter(metric => metric.category === metricType);
  
  const categories = Array.from(new Set(metrics.map(metric => metric.category)));
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={metricType} onValueChange={setMetricType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر المقياس" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المقاييس</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredMetrics}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="your_brand" name="علامتك التجارية" fill="#3a7a89" />
            <Bar dataKey="competitor1" name="المنافس 1" fill="#f59e0b" />
            <Bar dataKey="competitor2" name="المنافس 2" fill="#8b5cf6" />
            <Bar dataKey="competitor3" name="المنافس 3" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompetitorMetricsChart;
