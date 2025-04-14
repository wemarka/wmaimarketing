
import React, { Suspense, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDashboardData } from "@/modules/analytics/components/dashboard/useDashboardData";
import { Loader2, RefreshCw, Download, ChevronDown, ChevronUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// استيراد المكونات من هيكل الوحدات
import {
  OverviewChart,
  EngagementMetrics,
  PlatformBreakdown,
  StatisticCard
} from "@/modules/analytics/components/dashboard";

// مكون تحميل لاستخدامه مع Suspense
const LoadingFallback = () => (
  <div className="flex justify-center items-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

// مكون الهيكل العظمي للبطاقات الإحصائية
const StatisticCardSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-8 w-1/3" />
    <Skeleton className="h-12 w-2/3" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

// مكونات فرعية لتقليل إعادة التصيير
const StatisticsGrid = React.memo(({ analyticsData, isMobile }: { analyticsData: any, isMobile: boolean }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
    <StatisticCard
      title="المشاهدات"
      value={analyticsData.impressions.toLocaleString()}
      change={analyticsData.change.impressions.toString()}
      positive={analyticsData.change.impressions > 0}
      icon={<span className="text-blue-500">👁️</span>}
      iconBgClass="bg-blue-100"
    />
    <StatisticCard
      title="نسبة التفاعل"
      value={`${analyticsData.engagement}%`}
      change={analyticsData.change.engagement.toString()}
      positive={analyticsData.change.engagement > 0}
      icon={<span className="text-pink-500">❤️</span>}
      iconBgClass="bg-pink-100"
    />
    <StatisticCard
      title="نسبة النقرات"
      value={`${analyticsData.clicks}%`}
      change={analyticsData.change.clicks.toString()}
      positive={analyticsData.change.clicks > 0}
      icon={<span className="text-amber-500">👆</span>}
      iconBgClass="bg-amber-100"
    />
    <StatisticCard
      title="التحويلات"
      value={analyticsData.conversions.toLocaleString()}
      change={analyticsData.change.conversions.toString()}
      positive={analyticsData.change.conversions > 0}
      icon={<span className="text-green-500">💰</span>}
      iconBgClass="bg-green-100"
      showSpark={true}
    />
  </div>
));

const AnalyticsDashboard = () => {
  const {
    period,
    loading,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    handlePeriodChange,
    refreshData,
    isMobile,
    getTimePeriodLabel
  } = useDashboardData();
  
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    platforms: true,
    engagement: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSectionHeader = (title: string, section: keyof typeof expandedSections) => (
    <div 
      className="flex justify-between items-center cursor-pointer" 
      onClick={() => toggleSection(section)}
    >
      <h3 className="text-lg font-medium">{title}</h3>
      {expandedSections[section] ? 
        <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      }
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">لوحة التحكم التحليلية</h2>
          <p className="text-muted-foreground">نظرة عامة على أداء المحتوى والحملات</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className={cn("w-[140px]", isMobile && "w-full")}>
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">آخر 7 أيام</SelectItem>
              <SelectItem value="30days">آخر 30 يوم</SelectItem>
              <SelectItem value="3months">آخر 3 أشهر</SelectItem>
              <SelectItem value="year">آخر سنة</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={refreshData}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              {!isMobile && "تحديث"}
            </Button>
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              {!isMobile && "تصدير"}
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="detailed">تفاصيل</TabsTrigger>
          <TabsTrigger value="breakdown">توزيعات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6">
                    <StatisticCardSkeleton />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StatisticsGrid analyticsData={analyticsData} isMobile={isMobile} />
              </motion.div>
            </AnimatePresence>
          )}

          <div className="mt-6">
            {renderSectionHeader("نظرة عامة على الأداء", "overview")}
            
            <AnimatePresence>
              {expandedSections.overview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>نظرة عامة على الأداء</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[300px] w-full" />
                      ) : (
                        <Suspense fallback={<LoadingFallback />}>
                          <OverviewChart data={overviewData} />
                        </Suspense>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="detailed">
          <div className="space-y-6">
            <div className="mt-6">
              {renderSectionHeader("توزيع المنصات", "platforms")}
              
              <AnimatePresence>
                {expandedSections.platforms && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>توزيع المنصات</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {loading ? (
                          <Skeleton className="h-[300px] w-full" />
                        ) : (
                          <Suspense fallback={<LoadingFallback />}>
                            <PlatformBreakdown data={platformData} />
                          </Suspense>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="breakdown">
          <div className="space-y-6">
            <div className="mt-6">
              {renderSectionHeader("مقاييس التفاعل", "engagement")}
              
              <AnimatePresence>
                {expandedSections.engagement && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>مقاييس التفاعل</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {loading ? (
                          <Skeleton className="h-[300px] w-full" />
                        ) : (
                          <Suspense fallback={<LoadingFallback />}>
                            <EngagementMetrics data={engagementData} />
                          </Suspense>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default React.memo(AnalyticsDashboard);
