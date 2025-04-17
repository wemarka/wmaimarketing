
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCompetitorData } from '@/modules/marketing/hooks/useCompetitorData';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const CompetitorComparison = () => {
  const { competitors, performanceData } = useCompetitorData();
  const [selectedCompetitors, setSelectedCompetitors] = useState(['competitor1', 'competitor2']);
  const [comparisonType, setComparisonType] = useState('performance');
  
  const handleCompetitorSelection = (index: number, value: string) => {
    const newSelected = [...selectedCompetitors];
    newSelected[index] = value;
    setSelectedCompetitors(newSelected);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>مقارنة المنافسين</CardTitle>
            <div className="flex gap-2 flex-wrap">
              {[0, 1].map((index) => (
                <Select
                  key={index}
                  value={selectedCompetitors[index]}
                  onValueChange={(value) => handleCompetitorSelection(index, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={`اختر المنافس ${index + 1}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {competitors.map((competitor) => (
                      <SelectItem key={competitor.id} value={competitor.id}>
                        {competitor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={comparisonType} onValueChange={setComparisonType} className="space-y-4">
            <TabsList>
              <TabsTrigger value="performance">الأداء العام</TabsTrigger>
              <TabsTrigger value="engagement">التفاعل</TabsTrigger>
              <TabsTrigger value="seo">تحسين محركات البحث</TabsTrigger>
              <TabsTrigger value="social">وسائل التواصل الاجتماعي</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar name="علامتك التجارية" dataKey="your_brand" stroke="#3a7a89" fill="#3a7a89" fillOpacity={0.3} />
                  {selectedCompetitors.map((compId, index) => (
                    <Radar
                      key={compId}
                      name={competitors.find(c => c.id === compId)?.name || `المنافس ${index + 1}`}
                      dataKey={compId}
                      stroke={index === 0 ? "#f59e0b" : "#ef4444"}
                      fill={index === 0 ? "#f59e0b" : "#ef4444"}
                      fillOpacity={0.3}
                    />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="engagement">
              <div className="text-center py-12 text-muted-foreground">
                بيانات التفاعل قيد التطوير
              </div>
            </TabsContent>
            
            <TabsContent value="seo">
              <div className="text-center py-12 text-muted-foreground">
                بيانات تحسين محركات البحث قيد التطوير
              </div>
            </TabsContent>
            
            <TabsContent value="social">
              <div className="text-center py-12 text-muted-foreground">
                بيانات وسائل التواصل الاجتماعي قيد التطوير
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorComparison;
