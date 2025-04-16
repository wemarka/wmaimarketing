
import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import EngagementInsights from "@/modules/dashboard/components/engagement-insights/EngagementInsights";
import CampaignTracker from "@/modules/dashboard/components/campaign-tracker/CampaignTracker";
import UpcomingPosts from "@/modules/dashboard/components/upcoming-posts/UpcomingPosts";
import AnalyticsSummary from "../analytics/AnalyticsSummary";
import NewsUpdates from "../news/NewsUpdates";
import PopularityCard from "../cards/PopularityCard";
import PerformanceCard from "../cards/PerformanceCard";
import RegionTargetingCard from "../cards/RegionTargetingCard";

const OverviewTab = () => {
  const { t } = useTranslation();
  const [layout, setLayout] = React.useState<"default" | "compact">("default");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("dashboard.overview.title", "النظرة العامة")}</h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setLayout(layout === "default" ? "compact" : "default")}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title={layout === "default" ? "عرض مدمج" : "عرض موسع"}
          >
            {layout === "default" ? 
              <Grid className="h-4 w-4" /> : 
              <LayoutGrid className="h-4 w-4" />
            }
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Card showing total visits and performance metrics */}
        <div className={`grid grid-cols-1 ${layout === "default" ? "lg:grid-cols-3" : "xl:grid-cols-3"} gap-6`}>
          <div className={layout === "default" ? "lg:col-span-2" : "xl:col-span-2"}>
            <AnalyticsSummary />
          </div>
          <div>
            <PopularityCard />
          </div>
        </div>
        
        {/* Visualization cards for performance and geographical distribution */}
        <div className={`grid grid-cols-1 ${layout === "default" ? "lg:grid-cols-2" : "xl:grid-cols-2"} gap-6`}>
          <PerformanceCard />
          <RegionTargetingCard />
        </div>
        
        {/* Cards for campaign tracking, engagements and upcoming posts */}
        <div className={`grid grid-cols-1 ${layout === "default" ? "lg:grid-cols-2" : "xl:grid-cols-2"} gap-6`}>
          <EngagementInsights />
          <CampaignTracker />
        </div>
        
        <div className={`grid grid-cols-1 ${layout === "default" ? "lg:grid-cols-3" : "xl:grid-cols-3"} gap-6`}>
          <div className={layout === "default" ? "lg:col-span-2" : "xl:col-span-2"}>
            <UpcomingPosts />
          </div>
          <div className={layout === "default" ? "lg:col-span-1" : "xl:col-span-1"}>
            <NewsUpdates />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
