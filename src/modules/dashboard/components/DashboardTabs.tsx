
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import VisitsCard from "./cards/VisitsCard";
import PopularityCard from "./cards/PopularityCard";
import PerformanceCard from "./cards/PerformanceCard";
import TopPerformersCard from "./cards/TopPerformersCard";
import RegionTargetingCard from "./cards/RegionTargetingCard";
import { motion } from "framer-motion";

const DashboardTabs = () => {
  const { t } = useTranslation();
  
  return (
    <div className="p-6">
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
    </div>
  );
};

export default DashboardTabs;
