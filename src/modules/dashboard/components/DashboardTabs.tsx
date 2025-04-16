
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import OverviewTab from "./tabs/OverviewTab";
import PerformanceTab from "./tabs/PerformanceTab";
import AnalyticsTab from "./tabs/AnalyticsTab";
import ContentTab from "./tabs/ContentTab";

interface DashboardTabsProps {
  activeTab: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab }) => {
  // Custom animation variants
  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 10 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="bg-gradient-to-b from-transparent to-background/5 rounded-xl"
        >
          {activeTab === "dashboard" && <OverviewTab />}
          {activeTab === "performance" && <PerformanceTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "content" && <ContentTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DashboardTabs;
