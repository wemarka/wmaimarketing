
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, MousePointerClick, DollarSign, AlertTriangle, RefreshCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import PostStatusTracker from "./PostStatusTracker";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// استيراد المكونات من البنية الجديدة
import {
  OverviewChart,
  EngagementMetrics,
  PlatformBreakdown,
  StatisticCard,
} from "@/modules/analytics/components/dashboard";

// استخدام Hook المُحسّن للبيانات
import { useDashboardData } from "@/modules/dashboard/components/useDashboardData";

export const AnalyticsDashboard = () => {
  const {
    period,
    loading,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    isUsingFallbackData,
    handlePeriodChange,
    refreshData
  } = useDashboardData();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  // Add RTL direction effect
  useEffect(() => {
    const htmlDir = isRTL ? "rtl" : "ltr";
    if (document.dir !== htmlDir) {
      document.dir = htmlDir;
    }
  }, [isRTL]);

  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30, 
        duration: 0.4 
      } 
    }
  };

  // تحسين عرض حالة التحميل
  if (loading) {
    return (
      <motion.div 
        className="flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <RefreshCw className="h-6 w-6 animate-spin text-primary mr-2" />
        <span>{t("common.loading", "جاري تحميل بيانات التحليلات...")}</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      variants={containerAnimation}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {isUsingFallbackData && (
          <motion.div
            variants={itemAnimation}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, height: 0 }}
          >
            <Alert variant="warning" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t("analytics.fallbackData.title", "استخدام البيانات الاحتياطية")}</AlertTitle>
              <AlertDescription className="flex justify-between items-center">
                <span>
                  {t(
                    "analytics.fallbackData.description",
                    "تعذر الاتصال بالخادم، نعرض لك بيانات مخزنة مسبقًا. سنحاول تحديثها فور استعادة الاتصال."
                  )}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "flex items-center gap-1",
                    isRTL ? "mr-2" : "ml-2"
                  )}
                  onClick={refreshData}
                >
                  <RefreshCw className="h-3 w-3" /> {t("common.retry", "إعادة المحاولة")}
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        variants={containerAnimation}
      >
        <motion.div variants={itemAnimation}>
          <StatisticCard
            title={t("dashboard.stats.impressions.title")}
            value={analyticsData.impressions.toLocaleString()}
            change={analyticsData.change.impressions.toString()}
            icon={<Eye className="h-5 w-5 text-blue-600" />}
            iconBgClass="bg-blue-100"
            positive={analyticsData.change.impressions >= 0}
          />
        </motion.div>
        
        <motion.div variants={itemAnimation}>
          <StatisticCard
            title={t("dashboard.stats.engagement.title")}
            value={`${analyticsData.engagement}%`}
            change={analyticsData.change.engagement.toString()}
            icon={<Heart className="h-5 w-5 text-pink-600" />}
            iconBgClass="bg-pink-100"
            positive={analyticsData.change.engagement >= 0}
          />
        </motion.div>
        
        <motion.div variants={itemAnimation}>
          <StatisticCard
            title={t("dashboard.stats.averageClicks.title")}
            value={`${analyticsData.clicks}%`}
            change={analyticsData.change.clicks.toString()}
            icon={<MousePointerClick className="h-5 w-5 text-amber-600" />}
            iconBgClass="bg-amber-100"
            positive={analyticsData.change.clicks >= 0}
          />
        </motion.div>
        
        <motion.div variants={itemAnimation}>
          <StatisticCard
            title={t("dashboard.stats.conversion.title")}
            value={analyticsData.conversions.toLocaleString()}
            change={analyticsData.change.conversions.toString()}
            icon={<DollarSign className="h-5 w-5 text-green-600" />}
            iconBgClass="bg-green-100"
            positive={analyticsData.change.conversions >= 0}
            showSpark={analyticsData.change.conversions > 5}
          />
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
        variants={containerAnimation}
      >
        <motion.div 
          className="md:col-span-3 relative"
          variants={itemAnimation}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t("dashboard.charts.overview.title", "نظرة عامة")}</span>
                {isUsingFallbackData && (
                  <Badge variant="outline" className="text-amber-500 border-amber-500">
                    {t("analytics.cachedData", "بيانات مخزنة مؤقتًا")}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OverviewChart data={overviewData} />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="md:col-span-2 relative"
          variants={itemAnimation}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.charts.platforms.title", "المنصات")}</CardTitle>
            </CardHeader>
            <CardContent>
              <PlatformBreakdown data={platformData} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerAnimation}
      >
        <motion.div variants={itemAnimation}>
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.charts.engagement.title", "التفاعل")}</CardTitle>
            </CardHeader>
            <CardContent>
              <EngagementMetrics data={engagementData} />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemAnimation}>
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.posts.tracker.title", "حالة المنشورات")}</CardTitle>
            </CardHeader>
            <CardContent>
              <PostStatusTracker />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsDashboard;
