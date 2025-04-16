
import React from "react";
import { useTranslation } from "react-i18next";
import VisitsCard from "./cards/VisitsCard";
import PopularityCard from "./cards/PopularityCard";
import PerformanceCard from "./cards/PerformanceCard";
import TopPerformersCard from "./cards/TopPerformersCard";
import RegionTargetingCard from "./cards/RegionTargetingCard";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, PieChart, BarChart } from "lucide-react";
import OverviewTab from "./tabs/OverviewTab";

const DashboardTabs = () => {
  const { t } = useTranslation();
  
  return (
    <div className="p-6">
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            <span>{t("dashboard.tabs.overview", "نظرة عامة")}</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>{t("dashboard.tabs.performance", "الأداء")}</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>{t("dashboard.tabs.analytics", "التحليلات")}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            <VisitsCard />
            <PopularityCard />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <PerformanceCard />
            <TopPerformersCard />
            <RegionTargetingCard />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="performance">
          <OverviewTab />
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="rounded-md bg-amber-50 border border-amber-200 p-6 text-center">
            <h3 className="font-medium text-amber-800 mb-2">قسم التحليلات</h3>
            <p className="text-amber-700">هذا القسم قيد التطوير حاليًا، سيتم إطلاقه قريبًا.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
