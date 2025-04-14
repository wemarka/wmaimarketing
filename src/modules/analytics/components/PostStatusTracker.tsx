
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, AlertCircle, XCircle, LoaderCircle, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PostStatusTracker = () => {
  const [viewType, setViewType] = useState<"cards" | "chart">("cards");
  
  // بيانات توضيحية للحالات
  const statuses = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />,
      label: "تم نشر 12 منشوراً",
      description: "تم النشر خلال آخر 7 أيام",
      bgClass: "bg-green-50 dark:bg-green-900/20",
      borderClass: "border-green-200 dark:border-green-900",
      count: 12
    },
    {
      icon: <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />,
      label: "8 منشورات مجدولة",
      description: "سيتم نشرها خلال الأسبوع القادم",
      bgClass: "bg-yellow-50 dark:bg-yellow-900/20",
      borderClass: "border-yellow-200 dark:border-yellow-900",
      count: 8
    },
    {
      icon: <LoaderCircle className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
      label: "5 منشورات في انتظار المراجعة",
      description: "بانتظار الاعتماد النهائي",
      bgClass: "bg-blue-50 dark:bg-blue-900/20",
      borderClass: "border-blue-200 dark:border-blue-900",
      count: 5
    },
    {
      icon: <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />,
      label: "2 منشورات مرفوضة",
      description: "تم رفضها بواسطة المراجع",
      bgClass: "bg-red-50 dark:bg-red-900/20",
      borderClass: "border-red-200 dark:border-red-900",
      count: 2
    }
  ];

  const totalPosts = statuses.reduce((sum, status) => sum + status.count, 0);

  // حساب النسب المئوية للرسم البياني
  const getPercentage = (count: number) => {
    return (count / totalPosts) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>حالة المنشورات</CardTitle>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewType(viewType === "cards" ? "chart" : "cards")}
            >
              <BarChart2 className="h-4 w-4" />
              <span className="sr-only">تبديل العرض</span>
            </Button>
            <Button variant="ghost" size="sm">عرض الكل</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="published">المنشورة</TabsTrigger>
              <TabsTrigger value="scheduled">المجدولة</TabsTrigger>
              <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {viewType === "cards" ? (
                <div className="space-y-4">
                  {statuses.map((status, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      className={cn(
                        "flex justify-between items-center p-3 rounded-md border transition-colors", 
                        status.bgClass, 
                        status.borderClass
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {status.icon}
                        <div>
                          <p className="font-medium">{status.label}</p>
                          <p className="text-sm text-muted-foreground">{status.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">التفاصيل</Button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* مخطط بياني دائري سريع الاستجابة */}
                  <div className="relative pt-2">
                    <div className="h-40 w-40 mx-auto">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        {statuses.map((status, index) => {
                          // حساب قيم المخطط الدائري
                          const percentage = getPercentage(status.count);
                          const dashArray = 2 * Math.PI * 25; // محيط الدائرة (2πr)
                          const dashOffset = dashArray - (dashArray * percentage) / 100;
                          const prevPercentages = statuses
                            .slice(0, index)
                            .reduce((sum, s) => sum + getPercentage(s.count), 0);
                          
                          // تعيين الألوان حسب حالة المنشور
                          let strokeColor = "";
                          if (index === 0) strokeColor = "stroke-green-500"; // منشورة
                          if (index === 1) strokeColor = "stroke-yellow-500"; // مجدولة
                          if (index === 2) strokeColor = "stroke-blue-500"; // قيد الانتظار
                          if (index === 3) strokeColor = "stroke-red-500"; // مرفوضة
                          
                          return (
                            <circle
                              key={index}
                              cx="50"
                              cy="50"
                              r="25"
                              fill="none"
                              strokeWidth="12"
                              strokeDasharray={dashArray}
                              strokeDashoffset={dashOffset}
                              style={{
                                transformOrigin: "50% 50%",
                                transform: `rotate(${prevPercentages * 3.6}deg)`,
                              }}
                              className={cn("transition-all", strokeColor)}
                            />
                          );
                        })}
                        <circle cx="50" cy="50" r="18" className="fill-card" />
                        <text
                          x="50"
                          y="50"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          className="fill-foreground text-lg font-bold"
                        >
                          {totalPosts}
                        </text>
                        <text
                          x="50"
                          y="60"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          className="fill-muted-foreground text-[9px]"
                        >
                          منشور
                        </text>
                      </svg>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                      {statuses.map((status, index) => {
                        let dotColor = "";
                        if (index === 0) dotColor = "bg-green-500";
                        if (index === 1) dotColor = "bg-yellow-500";
                        if (index === 2) dotColor = "bg-blue-500";
                        if (index === 3) dotColor = "bg-red-500";
                        
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${dotColor}`} />
                            <div className="text-sm">
                              <span className="font-medium">{status.count}</span>
                              <span className="text-muted-foreground mr-1">
                                ({Math.round(getPercentage(status.count))}%)
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* جدول بيانات المنشورات */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {statuses.map((status, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "p-3 rounded-md border text-center transition-colors", 
                          status.bgClass,
                          status.borderClass
                        )}
                      >
                        <div className="flex justify-center mb-2">{status.icon}</div>
                        <p className="text-2xl font-bold">{status.count}</p>
                        <p className="text-xs text-muted-foreground">{status.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="published">
              <div className="p-8 text-center">
                <CheckCircle className="h-10 w-10 mx-auto mb-4 text-green-500 opacity-50" />
                <h3 className="font-medium text-xl">المنشورات المنشورة</h3>
                <p className="text-muted-foreground mt-2">هنا سيتم عرض تفاصيل المنشورات المنشورة</p>
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled">
              <div className="p-8 text-center">
                <Clock className="h-10 w-10 mx-auto mb-4 text-yellow-500 opacity-50" />
                <h3 className="font-medium text-xl">المنشورات المجدولة</h3>
                <p className="text-muted-foreground mt-2">هنا سيتم عرض تفاصيل المنشورات المجدولة</p>
              </div>
            </TabsContent>
            
            <TabsContent value="pending">
              <div className="p-8 text-center">
                <LoaderCircle className="h-10 w-10 mx-auto mb-4 text-blue-500 opacity-50" />
                <h3 className="font-medium text-xl">المنشورات قيد الانتظار</h3>
                <p className="text-muted-foreground mt-2">هنا سيتم عرض تفاصيل المنشورات قيد الانتظار</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostStatusTracker;
