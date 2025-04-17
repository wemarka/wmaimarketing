import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, LayoutGrid, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import EngagementInsights from "@/modules/dashboard/components/engagement-insights/EngagementInsights";
import CampaignTracker from "@/modules/dashboard/components/campaign-tracker/CampaignTracker";
import UpcomingPosts from "@/modules/dashboard/components/upcoming-posts/UpcomingPosts";
import AnalyticsSummary from "../analytics/AnalyticsSummary";
import NewsUpdates from "../news/NewsUpdates";
import PopularityCard from "../cards/PopularityCard";
import PerformanceCard from "../cards/PerformanceCard";
import RegionTargetingCard from "../cards/RegionTargetingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const OverviewTab = () => {
  const { t } = useTranslation();
  const [layout, setLayout] = React.useState<"default" | "compact">("default");
  const [activeTab, setActiveTab] = React.useState("summary");
  
  // Function to refresh data - would connect to real API in production
  const handleRefresh = () => {
    // Show loading spinner on button
    const button = document.getElementById('refresh-button');
    if (button) button.classList.add('animate-spin');
    
    // Simulate data fetching
    setTimeout(() => {
      // Remove loading spinner
      if (button) button.classList.remove('animate-spin');
      
      // Show success toast
      toast({
        title: "تم تحديث البيانات",
        description: "تم تحديث البيانات بنجاح",
        variant: "default",
      });
    }, 1200);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
          {t("dashboard.overview.title", "النظرة العامة")}
        </h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="flex items-center gap-1.5 mr-2"
          >
            <RefreshCw id="refresh-button" className="h-3.5 w-3.5" />
            <span>{t("common.refresh", "تحديث")}</span>
          </Button>
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
      
      {/* Main dashboard tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6 bg-background/50 border rounded-full p-1 w-full md:w-auto">
          <TabsTrigger value="summary" className="rounded-full data-[state=active]:bg-primary/10 text-sm">
            ملخص الأداء
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-full data-[state=active]:bg-primary/10 text-sm">
            التحليلات
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="rounded-full data-[state=active]:bg-primary/10 text-sm">
            الحملات
          </TabsTrigger>
          <TabsTrigger value="content" className="rounded-full data-[state=active]:bg-primary/10 text-sm">
            المحتوى
          </TabsTrigger>
        </TabsList>
        
        {/* Summary Tab Content */}
        <TabsContent value="summary" className="mt-0 space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 gap-8">
            {/* Card showing total visits and performance metrics */}
            <div className={`grid grid-cols-1 ${layout === "default" ? "lg:grid-cols-3" : "xl:grid-cols-3"} gap-8`}>
              <div className={layout === "default" ? "lg:col-span-2" : "xl:col-span-2"}>
                <AnalyticsSummary />
              </div>
              <div>
                <PopularityCard />
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Analytics Tab Content */}
        <TabsContent value="analytics" className="mt-0 space-y-8 animate-fade-in">
          <div className={`grid grid-cols-1 ${layout === "default" ? "lg:grid-cols-2" : "xl:grid-cols-2"} gap-8`}>
            <PerformanceCard />
            <RegionTargetingCard />
          </div>
        </TabsContent>
        
        {/* Campaigns Tab Content */}
        <TabsContent value="campaigns" className="mt-0 space-y-8 animate-fade-in">
          <div className={`grid grid-cols-1 ${layout === "default" ? "lg:grid-cols-3" : "xl:grid-cols-3"} gap-8`}>
            <div className={layout === "default" ? "lg:col-span-2" : "xl:col-span-2"}>
              <CampaignTracker />
            </div>
            <div>
              <EngagementInsights />
            </div>
          </div>
        </TabsContent>
        
        {/* Content Tab Content */}
        <TabsContent value="content" className="mt-0 space-y-8 animate-fade-in">
          <div className={`grid grid-cols-1 ${layout === "default" ? "lg:grid-cols-3" : "xl:grid-cols-3"} gap-8`}>
            <div className={layout === "default" ? "lg:col-span-2" : "xl:col-span-2"}>
              <UpcomingPosts />
            </div>
            <div className={layout === "default" ? "lg:col-span-1" : "xl:col-span-1"}>
              <NewsUpdates />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OverviewTab;
