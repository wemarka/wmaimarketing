
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { ChartContainer } from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";

// بيانات تجريبية للرسم البياني
const engagementData = [
  { day: "السبت", instagram: 1500, facebook: 900, tiktok: 2200 },
  { day: "الأحد", instagram: 1800, facebook: 1200, tiktok: 2800 },
  { day: "الاثنين", instagram: 2000, facebook: 1100, tiktok: 3100 },
  { day: "الثلاثاء", instagram: 1700, facebook: 800, tiktok: 2600 },
  { day: "الأربعاء", instagram: 2200, facebook: 1300, tiktok: 3300 },
  { day: "الخميس", instagram: 2500, facebook: 1600, tiktok: 3800 },
  { day: "الجمعة", instagram: 2300, facebook: 1400, tiktok: 3500 },
];

// بيانات للأسبوع الماضي (للمقارنة)
const prevWeekData = [
  { day: "السبت", instagram: 1200, facebook: 700, tiktok: 1800 },
  { day: "الأحد", instagram: 1500, facebook: 900, tiktok: 2200 },
  { day: "الاثنين", instagram: 1700, facebook: 850, tiktok: 2600 },
  { day: "الثلاثاء", instagram: 1400, facebook: 600, tiktok: 2100 },
  { day: "الأربعاء", instagram: 1900, facebook: 1000, tiktok: 2800 },
  { day: "الخميس", instagram: 2100, facebook: 1200, tiktok: 3200 },
  { day: "الجمعة", instagram: 1950, facebook: 1100, tiktok: 3000 },
];

const EngagementInsights = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<string>("week");
  const [compareMode, setCompareMode] = useState<boolean>(false);
  
  // حساب إجمالي التفاعلات لكل منصة
  const calculateTotals = (data: typeof engagementData) => {
    return {
      instagram: data.reduce((sum, item) => sum + item.instagram, 0),
      facebook: data.reduce((sum, item) => sum + item.facebook, 0),
      tiktok: data.reduce((sum, item) => sum + item.tiktok, 0),
    };
  };
  
  const currentTotals = calculateTotals(engagementData);
  const prevTotals = calculateTotals(prevWeekData);
  
  // حساب نسبة النمو بين الفترتين
  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(1);
  };

  // تغيير بيانات الرسم البياني حسب الفترة المختارة
  const currentData = timeRange === "week" ? engagementData : 
    timeRange === "month" ? engagementData.concat(engagementData) : engagementData.slice(0, 3);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{t("dashboard.engagementInsights.title", "تحليل التفاعل")}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {t("dashboard.engagementInsights.subtitle", "مستوى تفاعل الجمهور عبر المنصات")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select 
            defaultValue={timeRange} 
            onValueChange={(value) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder={t("dashboard.timeRanges.week", "أسبوع")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">{t("dashboard.timeRanges.day", "يوم")}</SelectItem>
              <SelectItem value="week">{t("dashboard.timeRanges.week", "أسبوع")}</SelectItem>
              <SelectItem value="month">{t("dashboard.timeRanges.month", "شهر")}</SelectItem>
            </SelectContent>
          </Select>
          
          <Badge 
            variant={compareMode ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCompareMode(!compareMode)}
          >
            {t("dashboard.compare", "مقارنة")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              instagram: { label: "انستجرام", color: "#E1306C" },
              facebook: { label: "فيسبوك", color: "#4267B2" },
              tiktok: { label: "تيك توك", color: "#000000" },
              instagram_prev: { label: "انستجرام (سابق)", color: "#F7CAD7" },
              facebook_prev: { label: "فيسبوك (سابق)", color: "#A4BDF1" },
              tiktok_prev: { label: "تيك توك (سابق)", color: "#CCCCCC" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={currentData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis 
                  tickFormatter={(value) => {
                    if (value >= 1000) {
                      return `${(value / 1000).toFixed(0)}K`;
                    }
                    return value;
                  }}
                />
                <Tooltip />
                <Legend />
                
                {/* رسم بياني للفترة الحالية */}
                <Area
                  type="monotone"
                  dataKey="instagram"
                  name="انستجرام"
                  stroke="#E1306C"
                  fill="#E1306C"
                  fillOpacity={0.2}
                  activeDot={{ r: 8 }}
                />
                <Area
                  type="monotone"
                  dataKey="facebook"
                  name="فيسبوك"
                  stroke="#4267B2"
                  fill="#4267B2"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="tiktok"
                  name="تيك توك"
                  stroke="#000000"
                  fill="#000000"
                  fillOpacity={0.2}
                />
                
                {/* رسم بياني للفترة السابقة (إذا كان وضع المقارنة مفعل) */}
                {compareMode && prevWeekData.map((item, index) => {
                  if (index < currentData.length) {
                    return {
                      ...currentData[index],
                      instagram_prev: prevWeekData[index].instagram,
                      facebook_prev: prevWeekData[index].facebook,
                      tiktok_prev: prevWeekData[index].tiktok
                    };
                  }
                  return null;
                }).filter(Boolean).map((item, index) => (
                  <React.Fragment key={index}>
                    <Area
                      type="monotone"
                      dataKey="instagram_prev"
                      name="انستجرام (سابق)"
                      stroke="#E1306C"
                      fill="#E1306C"
                      fillOpacity={0.1}
                      strokeDasharray="3 3"
                    />
                    <Area
                      type="monotone"
                      dataKey="facebook_prev"
                      name="فيسبوك (سابق)"
                      stroke="#4267B2"
                      fill="#4267B2"
                      fillOpacity={0.1}
                      strokeDasharray="3 3"
                    />
                    <Area
                      type="monotone"
                      dataKey="tiktok_prev"
                      name="تيك توك (سابق)"
                      stroke="#000000"
                      fill="#000000"
                      fillOpacity={0.1}
                      strokeDasharray="3 3"
                    />
                  </React.Fragment>
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card className="bg-pink-50 border-pink-100">
            <CardContent className="p-4">
              <h3 className="text-pink-700 font-medium mb-1">انستجرام</h3>
              <div className="text-2xl font-bold">{(currentTotals.instagram / 1000).toFixed(1)}K</div>
              <div className={`text-xs mt-1 flex items-center ${
                Number(calculateGrowth(currentTotals.instagram, prevTotals.instagram)) > 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {Number(calculateGrowth(currentTotals.instagram, prevTotals.instagram)) > 0 ? '↑' : '↓'}
                {Math.abs(Number(calculateGrowth(currentTotals.instagram, prevTotals.instagram)))}%
                <span className="text-muted-foreground mr-1">من الفترة السابقة</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4">
              <h3 className="text-blue-700 font-medium mb-1">فيسبوك</h3>
              <div className="text-2xl font-bold">{(currentTotals.facebook / 1000).toFixed(1)}K</div>
              <div className={`text-xs mt-1 flex items-center ${
                Number(calculateGrowth(currentTotals.facebook, prevTotals.facebook)) > 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {Number(calculateGrowth(currentTotals.facebook, prevTotals.facebook)) > 0 ? '↑' : '↓'}
                {Math.abs(Number(calculateGrowth(currentTotals.facebook, prevTotals.facebook)))}%
                <span className="text-muted-foreground mr-1">من الفترة السابقة</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-50 border-slate-100">
            <CardContent className="p-4">
              <h3 className="text-slate-700 font-medium mb-1">تيك توك</h3>
              <div className="text-2xl font-bold">{(currentTotals.tiktok / 1000).toFixed(1)}K</div>
              <div className={`text-xs mt-1 flex items-center ${
                Number(calculateGrowth(currentTotals.tiktok, prevTotals.tiktok)) > 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {Number(calculateGrowth(currentTotals.tiktok, prevTotals.tiktok)) > 0 ? '↑' : '↓'}
                {Math.abs(Number(calculateGrowth(currentTotals.tiktok, prevTotals.tiktok)))}%
                <span className="text-muted-foreground mr-1">من الفترة السابقة</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementInsights;
