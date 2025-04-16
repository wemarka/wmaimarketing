
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import VisitsCard from "./cards/VisitsCard";
import PopularityCard from "./cards/PopularityCard";
import PerformanceCard from "./cards/PerformanceCard";
import TopPerformersCard from "./cards/TopPerformersCard";
import RegionTargetingCard from "./cards/RegionTargetingCard";

const DashboardTabs = () => {
  const { t } = useTranslation();
  
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <VisitsCard />
        <PopularityCard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PerformanceCard />
        <TopPerformersCard />
        <RegionTargetingCard />
      </div>
    </div>
  );
};

export default DashboardTabs;
