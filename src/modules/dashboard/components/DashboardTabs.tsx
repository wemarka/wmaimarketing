
import React from "react";
import { useTranslation } from "react-i18next";
import VisitsCard from "./cards/VisitsCard";
import PopularityCard from "./cards/PopularityCard";
import PerformanceCard from "./cards/PerformanceCard";
import TopPerformersCard from "./cards/TopPerformersCard";
import RegionTargetingCard from "./cards/RegionTargetingCard";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, PieChart, BarChart, Users, TrendingUp, Globe } from "lucide-react";
import OverviewTab from "./tabs/OverviewTab";

const DashboardTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState("overview");
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="p-6">
      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4 bg-slate-100/50 dark:bg-slate-800/50 p-1">
          <TabsTrigger 
            value="overview" 
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
          >
            <LayoutGrid className="h-4 w-4" />
            <span>{t("dashboard.tabs.overview", "نظرة عامة")}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="performance" 
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
          >
            <PieChart className="h-4 w-4" />
            <span>{t("dashboard.tabs.performance", "الأداء")}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
          >
            <BarChart className="h-4 w-4" />
            <span>{t("dashboard.tabs.analytics", "التحليلات")}</span>
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <TabsContent value="overview" asChild>
            <motion.div 
              variants={containerAnimation}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
            >
              <motion.div 
                variants={itemAnimation}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
              >
                <VisitsCard />
                <PopularityCard />
              </motion.div>
              
              <motion.div 
                variants={containerAnimation}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <motion.div variants={itemAnimation}>
                  <PerformanceCard />
                </motion.div>
                <motion.div variants={itemAnimation}>
                  <TopPerformersCard />
                </motion.div>
                <motion.div variants={itemAnimation}>
                  <RegionTargetingCard />
                </motion.div>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="performance" asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OverviewTab />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="analytics" asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-6 text-center">
                <h3 className="font-medium text-amber-800 dark:text-amber-500 mb-2">قسم التحليلات</h3>
                <p className="text-amber-700 dark:text-amber-400">هذا القسم قيد التطوير حاليًا، سيتم إطلاقه قريبًا.</p>
              </div>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
