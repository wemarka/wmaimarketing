
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const marketShareData = [
  { name: 'علامتك التجارية', value: 25, color: '#3a7a89' },
  { name: 'المنافس الأول', value: 35, color: '#f59e0b' },
  { name: 'المنافس الثاني', value: 20, color: '#ef4444' },
  { name: 'المنافس الثالث', value: 10, color: '#8b5cf6' },
  { name: 'آخرون', value: 10, color: '#94a3b8' },
];

const growthTrendData = [
  { month: 'يناير', your_brand: 3.2, competitor1: 2.5, competitor2: 1.8, competitor3: 0.5 },
  { month: 'فبراير', your_brand: 3.5, competitor1: 2.3, competitor2: 2.0, competitor3: 0.7 },
  { month: 'مارس', your_brand: 3.8, competitor1: 2.1, competitor2: 2.2, competitor3: 0.8 },
  { month: 'أبريل', your_brand: 4.2, competitor1: 2.0, competitor2: 2.3, competitor3: 1.0 },
  { month: 'مايو', your_brand: 4.5, competitor1: 2.2, competitor2: 2.1, competitor3: 1.2 },
  { month: 'يونيو', your_brand: 4.8, competitor1: 2.3, competitor2: 2.0, competitor3: 1.1 },
];

const segmentData = {
  age: [
    { name: '18-24', your_brand: 15, competitor1: 25, competitor2: 20 },
    { name: '25-34', your_brand: 35, competitor1: 30, competitor2: 25 },
    { name: '35-44', your_brand: 25, competitor1: 20, competitor2: 30 },
    { name: '45-54', your_brand: 15, competitor1: 15, competitor2: 15 },
    { name: '55+', your_brand: 10, competitor1: 10, competitor2: 10 },
  ],
  region: [
    { name: 'المنطقة الشرقية', your_brand: 30, competitor1: 20, competitor2: 25 },
    { name: 'المنطقة الغربية', your_brand: 25, competitor1: 35, competitor2: 20 },
    { name: 'المنطقة الشمالية', your_brand: 15, competitor1: 15, competitor2: 20 },
    { name: 'المنطقة الجنوبية', your_brand: 15, competitor1: 10, competitor2: 15 },
    { name: 'المنطقة الوسطى', your_brand: 15, competitor1: 20, competitor2: 20 },
  ]
};

const MarketShare = () => {
  const [segmentType, setSegmentType] = useState('age');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>حصة السوق</CardTitle>
            <CardDescription>التوزيع الحالي لحصص السوق</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShareData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {marketShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>اتجاهات النمو</CardTitle>
            <CardDescription>النمو الشهري لحصة السوق (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="your_brand" name="علامتك التجارية" fill="#3a7a89" />
                  <Bar dataKey="competitor1" name="المنافس الأول" fill="#f59e0b" />
                  <Bar dataKey="competitor2" name="المنافس الثاني" fill="#ef4444" />
                  <Bar dataKey="competitor3" name="المنافس الثالث" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>تقسيم الفئات</CardTitle>
              <CardDescription>توزيع حصة السوق حسب الفئات المختلفة</CardDescription>
            </div>
            <Select value={segmentType} onValueChange={setSegmentType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر نوع التقسيم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="age">الفئة العمرية</SelectItem>
                <SelectItem value="region">المنطقة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentData[segmentType as 'age' | 'region']} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="your_brand" name="علامتك التجارية" fill="#3a7a89" />
                <Bar dataKey="competitor1" name="المنافس الأول" fill="#f59e0b" />
                <Bar dataKey="competitor2" name="المنافس الثاني" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketShare;
