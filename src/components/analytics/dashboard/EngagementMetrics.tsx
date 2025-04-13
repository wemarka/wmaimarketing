
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface EngagementData {
  name: string;
  likes: number;
  comments: number;
  shares: number;
}

interface EngagementMetricsProps {
  data: EngagementData[];
}

const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>مقاييس التفاعل</CardTitle>
        <CardDescription>الإعجابات والتعليقات والمشاركات على مدار الوقت</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">الرسم البياني</TabsTrigger>
            <TabsTrigger value="detail">التفاصيل</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <ChartContainer
              config={{
                likes: { label: "الإعجابات", color: "#9b87f5" },
                comments: { label: "التعليقات", color: "#FFD6E0" },
                shares: { label: "المشاركات", color: "#D4AF37" }
              }}
              className="h-[400px]"
            >
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="likes" stackId="a" fill="#9b87f5" name="الإعجابات" />
                <Bar dataKey="comments" stackId="a" fill="#FFD6E0" name="التعليقات" />
                <Bar dataKey="shares" stackId="a" fill="#D4AF37" name="المشاركات" />
              </BarChart>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="detail">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-right p-3">التاريخ</th>
                    <th className="text-right p-3">الإعجابات</th>
                    <th className="text-right p-3">التعليقات</th>
                    <th className="text-right p-3">المشاركات</th>
                    <th className="text-right p-3">المجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.likes}</td>
                      <td className="p-3">{item.comments}</td>
                      <td className="p-3">{item.shares}</td>
                      <td className="p-3 font-medium">{item.likes + item.comments + item.shares}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;
