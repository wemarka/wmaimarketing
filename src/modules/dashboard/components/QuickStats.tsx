
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, ShoppingCart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
  progress: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  color,
  progress
}) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center",
            color
          )}>
            {icon}
          </div>
          <div className={cn(
            "text-sm font-medium flex items-center",
            isPositive ? "text-green-600" : "text-red-600"
          )}>
            {isPositive ? "+" : "-"}{change}
          </div>
        </div>
        
        <div className="mb-2">
          <h3 className="text-xl font-bold">{value}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span>التقدم</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </CardContent>
    </Card>
  );
};

const QuickStats: React.FC = () => {
  return (
    <Tabs defaultValue="today" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">لمحة سريعة</h2>
        <TabsList>
          <TabsTrigger value="today">اليوم</TabsTrigger>
          <TabsTrigger value="week">الأسبوع</TabsTrigger>
          <TabsTrigger value="month">الشهر</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="today" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="المبيعات"
            value="5,360 ريال"
            change="12%"
            isPositive={true}
            icon={<ShoppingCart className="h-5 w-5 text-emerald-800" />}
            color="bg-emerald-100"
            progress={75}
          />
          <StatCard
            title="الزوار"
            value="1,240"
            change="8%"
            isPositive={true}
            icon={<Users className="h-5 w-5 text-blue-800" />}
            color="bg-blue-100"
            progress={65}
          />
          <StatCard
            title="التفاعلات"
            value="652"
            change="5%"
            isPositive={false}
            icon={<TrendingUp className="h-5 w-5 text-purple-800" />}
            color="bg-purple-100"
            progress={45}
          />
          <StatCard
            title="النقرات"
            value="482"
            change="15%"
            isPositive={true}
            icon={<BarChart3 className="h-5 w-5 text-amber-800" />}
            color="bg-amber-100"
            progress={82}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="week" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="المبيعات"
            value="28,540 ريال"
            change="24%"
            isPositive={true}
            icon={<ShoppingCart className="h-5 w-5 text-emerald-800" />}
            color="bg-emerald-100"
            progress={88}
          />
          <StatCard
            title="الزوار"
            value="6,345"
            change="16%"
            isPositive={true}
            icon={<Users className="h-5 w-5 text-blue-800" />}
            color="bg-blue-100"
            progress={72}
          />
          <StatCard
            title="التفاعلات"
            value="2,986"
            change="8%"
            isPositive={true}
            icon={<TrendingUp className="h-5 w-5 text-purple-800" />}
            color="bg-purple-100"
            progress={65}
          />
          <StatCard
            title="النقرات"
            value="1,850"
            change="4%"
            isPositive={false}
            icon={<BarChart3 className="h-5 w-5 text-amber-800" />}
            color="bg-amber-100"
            progress={58}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="month" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="المبيعات"
            value="105,720 ريال"
            change="35%"
            isPositive={true}
            icon={<ShoppingCart className="h-5 w-5 text-emerald-800" />}
            color="bg-emerald-100"
            progress={92}
          />
          <StatCard
            title="الزوار"
            value="24,651"
            change="28%"
            isPositive={true}
            icon={<Users className="h-5 w-5 text-blue-800" />}
            color="bg-blue-100"
            progress={85}
          />
          <StatCard
            title="التفاعلات"
            value="12,486"
            change="18%"
            isPositive={true}
            icon={<TrendingUp className="h-5 w-5 text-purple-800" />}
            color="bg-purple-100"
            progress={78}
          />
          <StatCard
            title="النقرات"
            value="8,354"
            change="22%"
            isPositive={true}
            icon={<BarChart3 className="h-5 w-5 text-amber-800" />}
            color="bg-amber-100"
            progress={75}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default QuickStats;
