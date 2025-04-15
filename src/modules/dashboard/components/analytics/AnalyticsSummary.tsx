
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, MousePointerClick, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useAnalyticsData } from "@/components/analytics/dashboard/hooks/useAnalyticsData";

const AnalyticsSummary = () => {
  const { loading, analyticsData } = useAnalyticsData("7days");

  const statsItems = [
    {
      title: "المشاهدات",
      value: loading ? "..." : analyticsData.impressions.toLocaleString(),
      change: loading ? "0" : analyticsData.change.impressions.toString(),
      icon: <Eye className="h-5 w-5 text-blue-600" />,
      iconBgClass: "bg-blue-100",
      positive: analyticsData.change.impressions >= 0,
    },
    {
      title: "نسبة التفاعل",
      value: loading ? "..." : `${analyticsData.engagement}%`,
      change: loading ? "0" : analyticsData.change.engagement.toString(),
      icon: <Heart className="h-5 w-5 text-pink-600" />,
      iconBgClass: "bg-pink-100",
      positive: analyticsData.change.engagement >= 0,
    },
    {
      title: "معدل النقرات",
      value: loading ? "..." : `${analyticsData.clicks}%`,
      change: loading ? "0" : analyticsData.change.clicks.toString(),
      icon: <MousePointerClick className="h-5 w-5 text-amber-600" />,
      iconBgClass: "bg-amber-100",
      positive: analyticsData.change.clicks >= 0,
    },
    {
      title: "التحويلات",
      value: loading ? "..." : analyticsData.conversions.toLocaleString(),
      change: loading ? "0" : analyticsData.change.conversions.toString(),
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      iconBgClass: "bg-green-100",
      positive: analyticsData.change.conversions >= 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsItems.map((item, index) => (
        <StatCard key={index} item={item} index={index} />
      ))}
    </div>
  );
};

interface StatCardProps {
  item: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    iconBgClass: string;
    positive: boolean;
  };
  index: number;
}

const StatCard = ({ item, index }: StatCardProps) => {
  const { title, value, change, icon, iconBgClass, positive } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden hover:shadow-md transition-all h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{title}</p>
              <p className="text-2xl font-semibold">{value}</p>
              <div className={`flex items-center mt-1 ${positive ? 'text-green-600' : 'text-red-600'} text-sm`}>
                {positive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-3 w-3">
                    <path d="M7 17l9-9"></path><path d="M17 17V8"></path><path d="M7 8h10"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-3 w-3">
                    <path d="M7 7l9 9"></path><path d="M16 7v9"></path><path d="M7 16h9"></path>
                  </svg>
                )}
                <span>{Math.abs(parseFloat(change))}% من الأسبوع الماضي</span>
              </div>
            </div>
            <div className={`p-2 rounded-md ${iconBgClass}`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalyticsSummary;
