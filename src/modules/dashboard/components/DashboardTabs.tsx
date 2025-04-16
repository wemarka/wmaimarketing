
import React from "react";
import { motion } from "framer-motion";
import OverviewTab from "./tabs/OverviewTab";
import PerformanceTab from "./tabs/PerformanceTab";
import AnalyticsTab from "./tabs/AnalyticsTab";
import ContentTab from "./tabs/ContentTab";

interface DashboardTabsProps {
  activeTab: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab }) => {
  return (
    <div className="p-6">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "dashboard" && <OverviewTab />}
        {activeTab === "performance" && <PerformanceTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "content" && <ContentTab />}
      </motion.div>
    </div>
  );
};

export default DashboardTabs;
