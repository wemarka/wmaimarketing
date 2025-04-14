
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Share, MousePointerClick, ShoppingBag, Download, RefreshCw, Calendar, Clock, FileText } from "lucide-react";
import { useDashboardData } from "./dashboard/useDashboardData";
import StatisticCard from "./dashboard/StatisticCard";
import OverviewChart from "./dashboard/OverviewChart";
import PlatformBreakdown from "./dashboard/PlatformBreakdown";
import EngagementMetrics from "./dashboard/EngagementMetrics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsDashboard: React.FC = () => {
  const {
    period,
    loading: dataLoading,
    overviewData,
    engagementData,
    platformData,
    analyticsData,
    handlePeriodChange
  } = useDashboardData();
  
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setLastUpdated(new Date());
  }, []);

  const refreshData = () => {
    setRefreshing(true);
    
    toast({
      title: "جاري تحديث البيانات",
      description: "يتم الآن تحديث البيانات التحليلية"
    });
    
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date());
      
      toast({
        title: "تم تحديث البيانات",
        description: "تم تحديث البيانات التحليلية بنجاح"
      });
    }, 1500);
  };

  const getLastUpdated = () => {
    return lastUpdated.toLocaleString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'numeric'
    });
  };

  const getLastUpdatedFull = () => {
    return lastUpdated.toLocaleString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold mb-1">لوحة التحليلات والتقارير</h1>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground">
              تتبع أداء التسويق وفهم ما يؤثر على جمهورك المستهدف
            </p>
            <Badge variant="outline" className="ml-2 flex items-center gap-1" title={getLastUpdatedFull()}>
              <Clock className="h-3 w-3" />
              <span>آخر تحديث: {getLastUpdated()}</span>
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="حدد الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">آخر 7 أيام</SelectItem>
              <SelectItem value="30days">آخر 30 يوم</SelectItem>
              <SelectItem value="3months">آخر 3 أشهر</SelectItem>
              <SelectItem value="year">هذه السنة</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={refreshData}
            disabled={refreshing || dataLoading}
            title="تحديث البيانات"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            title="تحميل التقرير"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="audience">الجمهور</TabsTrigger>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="conversion">التحويلات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {dataLoading ? (
              <>
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="bg-card border rounded-xl p-6">
                    <Skeleton className="h-6 w-28 mb-4" />
                    <Skeleton className="h-10 w-24 mb-2" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </>
            ) : (
              <>
                <StatisticCard 
                  title="إجمالي المشاهدات"
                  value={analyticsData.impressions.toLocaleString()}
                  change={analyticsData.change.impressions.toString()}
                  positive={analyticsData.change.impressions > 0}
                  icon={<Eye className="h-5 w-5 text-beauty-pink" />}
                  iconBgClass="bg-beauty-pink/20"
                />
                
                <StatisticCard 
                  title="معدل التفاعل"
                  value={`${analyticsData.engagement}%`}
                  change={analyticsData.change.engagement.toString()}
                  positive={analyticsData.change.engagement > 0}
                  icon={<Share className="h-5 w-5 text-beauty-purple" />}
                  iconBgClass="bg-beauty-purple/20"
                />
                
                <StatisticCard 
                  title="معدل النقر"
                  value={`${analyticsData.clicks}%`}
                  change={analyticsData.change.clicks.toString()}
                  positive={analyticsData.change.clicks > 0}
                  icon={<MousePointerClick className="h-5 w-5 text-beauty-gold" />}
                  iconBgClass="bg-beauty-gold/20"
                />
                
                <StatisticCard 
                  title="التحويلات"
                  value={analyticsData.conversions.toString()}
                  change={analyticsData.change.conversions.toString()}
                  positive={analyticsData.change.conversions > 0}
                  icon={<ShoppingBag className="h-5 w-5 text-blue-600" />}
                  iconBgClass="bg-blue-100"
                />
              </>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-5 gap-6 mb-8"
          >
            {dataLoading ? (
              <>
                <div className="md:col-span-3 bg-card border rounded-xl p-6">
                  <Skeleton className="h-6 w-36 mb-4" />
                  <Skeleton className="h-64 w-full" />
                </div>
                
                <div className="md:col-span-2 bg-card border rounded-xl p-6">
                  <Skeleton className="h-6 w-36 mb-4" />
                  <Skeleton className="h-64 w-full" />
                </div>
              </>
            ) : (
              <>
                <OverviewChart data={overviewData} />
                <PlatformBreakdown data={platformData} />
              </>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {dataLoading ? (
              <div className="bg-card border rounded-xl p-6">
                <Skeleton className="h-6 w-36 mb-4" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : (
              <EngagementMetrics data={engagementData} />
            )}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="audience">
          <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg border border-dashed">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium mb-2">بيانات الجمهور</p>
            <p className="text-muted-foreground">ستكون متاحة قريباً مع التحديث القادم</p>
          </div>
        </TabsContent>
        
        <TabsContent value="content">
          <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg border border-dashed">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium mb-2">بيانات المحتوى</p>
            <p className="text-muted-foreground">ستكون متاحة قريباً مع التحديث القادم</p>
          </div>
        </TabsContent>
        
        <TabsContent value="conversion">
          <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg border border-dashed">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium mb-2">بيانات التحويلات</p>
            <p className="text-muted-foreground">ستكون متاحة قريباً مع التحديث القادم</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
