
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Users, TrendingUp, BarChart3, ShoppingCart } from "lucide-react";
import PerformanceHeader from "@/modules/dashboard/components/performance/PerformanceHeader";
import PerformanceTabs from "@/modules/dashboard/components/performance/PerformanceTabs";
import PerformanceOverview from "@/modules/dashboard/components/performance/PerformanceOverview";
import SocialMediaPerformance from "@/modules/dashboard/components/performance/SocialMediaPerformance";

const DashboardPerformance = () => {
  // Mock data for demonstration
  const performanceData = [
    {
      title: "المشاهدات",
      value: "45.2K",
      previousValue: "37.8K",
      changePercentage: 19.6,
      icon: <Users className="h-4 w-4 text-blue-600" />,
      indicatorColor: "bg-blue-600",
      sparklineData: [
        { value: 40 }, { value: 35 }, { value: 50 }, { value: 45 }, 
        { value: 55 }, { value: 60 }, { value: 65 }
      ],
      tooltip: "إجمالي عدد المشاهدات خلال الأسبوع الماضي"
    },
    {
      title: "معدل التفاعل",
      value: "5.7%",
      previousValue: "4.3%",
      changePercentage: 32.6,
      icon: <TrendingUp className="h-4 w-4 text-green-600" />,
      indicatorColor: "bg-green-600",
      sparklineData: [
        { value: 4.1 }, { value: 4.5 }, { value: 4.8 }, { value: 5.2 }, 
        { value: 5.0 }, { value: 5.4 }, { value: 5.7 }
      ],
      tooltip: "نسبة التفاعل من إجمالي المشاهدات"
    },
    {
      title: "النقرات",
      value: "3.4K",
      previousValue: "2.9K",
      changePercentage: 17.2,
      icon: <BarChart3 className="h-4 w-4 text-purple-600" />,
      indicatorColor: "bg-purple-600",
      sparklineData: [
        { value: 2.8 }, { value: 3.0 }, { value: 2.9 }, { value: 3.2 }, 
        { value: 3.1 }, { value: 3.3 }, { value: 3.4 }
      ],
      tooltip: "عدد النقرات على الروابط والإجراءات"
    },
    {
      title: "التحويلات",
      value: "432",
      previousValue: "387",
      changePercentage: 11.6,
      icon: <ShoppingCart className="h-4 w-4 text-amber-600" />,
      indicatorColor: "bg-amber-600",
      sparklineData: [
        { value: 380 }, { value: 395 }, { value: 405 }, { value: 410 }, 
        { value: 415 }, { value: 425 }, { value: 432 }
      ],
      tooltip: "عدد العملاء الذين أكملوا عملية الشراء"
    }
  ];

  return (
    <Layout>
      <div className="p-6">
        <PerformanceHeader 
          title="تحليل الأداء"
          subtitle="تتبع وتحليل مؤشرات أداء حساباتك خلال الفترة السابقة"
        />
        
        <PerformanceTabs>
          <PerformanceOverview performanceData={performanceData} />
        </PerformanceTabs>
        
        <div className="mt-8">
          <SocialMediaPerformance />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPerformance;
