
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import VisitsCard from "./cards/VisitsCard";
import PopularityCard from "./cards/PopularityCard";
import PerformanceCard from "./cards/PerformanceCard";
import TopPerformersCard from "./cards/TopPerformersCard";
import RegionTargetingCard from "./cards/RegionTargetingCard";
import { motion, AnimatePresence } from "framer-motion";
import { OverviewTab } from "../components";
import ContentTab from "./tabs/ContentTab";

interface DashboardTabsProps {
  activeTab?: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab = "dashboard" }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  useEffect(() => {
    // Enforce RTL direction when language is Arabic
    if (i18n.language === "ar" && document.dir !== "rtl") {
      document.documentElement.dir = "rtl";
    }
  }, [i18n.language]);
  
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // RTL-aware animation initial and exit values
  const slideInitial = isRTL ? { opacity: 0, x: 20 } : { opacity: 0, x: -20 };
  const slideExit = isRTL ? { opacity: 0, x: -20 } : { opacity: 0, x: 20 };
  
  return (
    <AnimatePresence mode="wait">
      {(activeTab === "dashboard" || activeTab === "overview") && (
        <motion.div 
          key="overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="p-6"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <motion.div 
            variants={containerAnimation}
            initial="hidden"
            animate="show"
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
        </motion.div>
      )}
      
      {activeTab === "performance" && (
        <motion.div
          key="performance"
          initial={slideInitial}
          animate={{ opacity: 1, x: 0 }}
          exit={slideExit}
          transition={{ duration: 0.4 }}
          className="p-6"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <OverviewTab />
        </motion.div>
      )}
      
      {activeTab === "analytics" && (
        <motion.div
          key="analytics"
          initial={slideInitial}
          animate={{ opacity: 1, x: 0 }}
          exit={slideExit}
          transition={{ duration: 0.4 }}
          className="p-6"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-6 text-center">
            <h3 className="font-medium text-amber-800 dark:text-amber-500 mb-2">قسم التحليلات</h3>
            <p className="text-amber-700 dark:text-amber-400">هذا القسم قيد التطوير حاليًا، سيتم إطلاقه قريبًا.</p>
          </div>
        </motion.div>
      )}
      
      {activeTab === "content" && (
        <motion.div
          key="content"
          initial={slideInitial}
          animate={{ opacity: 1, x: 0 }}
          exit={slideExit}
          transition={{ duration: 0.4 }}
          className="p-6"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <ContentTab />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardTabs;
