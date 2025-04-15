
import React from "react";
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
import { BarChart3, Table } from "lucide-react";

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
          <TabsList className="mb-4 bg-background border border-muted rounded-lg p-1 w-fit">
            <TabsTrigger value="chart" className="rounded-md flex items-center gap-1.5 data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple">
              <BarChart3 className="h-4 w-4" />
              <span>الرسم البياني</span>
            </TabsTrigger>
            <TabsTrigger value="detail" className="rounded-md flex items-center gap-1.5 data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple">
              <Table className="h-4 w-4" />
              <span>التفاصيل</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="animate-fade-in">
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

          <TabsContent value="detail" className="animate-fade-in">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-beauty-purple/5 border-b">
                    <th className="text-right p-3 text-beauty-purple font-medium">التاريخ</th>
                    <th className="text-right p-3 text-beauty-purple font-medium">الإعجابات</th>
                    <th className="text-right p-3 text-beauty-purple font-medium">التعليقات</th>
                    <th className="text-right p-3 text-beauty-purple font-medium">المشاركات</th>
                    <th className="text-right p-3 text-beauty-purple font-medium">المجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-muted/20" : "bg-background"}>
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
