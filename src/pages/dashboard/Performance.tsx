
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Grid } from "lucide-react";
import { motion } from "framer-motion";
import PerformanceIndicator from "@/modules/dashboard/components/performance/PerformanceIndicator";
import { Users, TrendingUp, BarChart3, ShoppingCart } from "lucide-react";

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
      <Helmet>
        <title>تحليل الأداء - سيركل</title>
      </Helmet>
      
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">تحليل الأداء</h1>
          <p className="text-muted-foreground">تتبع وتحليل مؤشرات أداء حساباتك خلال الفترة السابقة</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {performanceData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PerformanceIndicator
                title={item.title}
                value={item.value}
                previousValue={item.previousValue}
                changePercentage={item.changePercentage}
                icon={item.icon}
                indicatorColor={item.indicatorColor}
                sparklineData={item.sparklineData}
                tooltip={item.tooltip}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Main performance chart section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>تحليل الأداء الأسبوعي</CardTitle>
              <CardDescription>تتبع تقدم المؤشرات الرئيسية خلال الأسبوع الماضي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] flex items-center justify-center bg-muted/10 rounded-lg border border-dashed">
                <div className="flex flex-col items-center text-muted-foreground">
                  <Grid className="h-10 w-10 mb-2" />
                  <p>مخطط الأداء التفصيلي</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Sidebar insights */}
          <Card>
            <CardHeader>
              <CardTitle>أهم الإحصائيات</CardTitle>
              <CardDescription>معلومات قد تهمك حول الأداء الحالي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <h4 className="font-medium">أفضل أيام الأسبوع</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">يوم الخميس يشهد أعلى معدل تفاعل بنسبة 7.2%</p>
                </div>
                
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    <h4 className="font-medium">أفضل المناطق</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">المملكة العربية السعودية والإمارات والكويت الأكثر تفاعلاً</p>
                </div>
                
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <h4 className="font-medium">أفضل المنصات</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">إنستغرام يتفوق على المنصات الأخرى بنسبة 42% من التفاعل</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPerformance;
