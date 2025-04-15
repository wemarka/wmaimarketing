import React from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "lucide-react";
import EngagementInsights from "@/modules/dashboard/components/engagement-insights/EngagementInsights";
import CampaignTracker from "@/modules/dashboard/components/campaign-tracker/CampaignTracker";
import UpcomingPosts from "@/modules/dashboard/components/upcoming-posts/UpcomingPosts";
import AnalyticsSummary from "../analytics/AnalyticsSummary";
import NewsUpdates from "../news/NewsUpdates";
const OverviewTab = () => {
  const {
    t
  } = useTranslation();
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("dashboard.overview.title", "النظرة العامة")}</h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          
          
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <AnalyticsSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EngagementInsights />
          <CampaignTracker />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UpcomingPosts />
          </div>
          <div className="lg:col-span-1">
            <NewsUpdates />
          </div>
        </div>
      </div>
    </div>;
};
export default OverviewTab;