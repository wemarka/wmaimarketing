
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import MarketingTab from "./tabs/MarketingTab";
import ContentTab from "./tabs/ContentTab";
import AnalyticsTab from "./tabs/AnalyticsTab";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface DashboardTabsProps {
  activeTab: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const dispatchTabChangeEvent = (value: string) => {
    // Create and dispatch a custom event when tab changes
    const event = new CustomEvent("dashboard-tab-change", { 
      detail: { tab: value } 
    });
    window.dispatchEvent(event);
    
    // Also dispatch to header for sync
    const headerEvent = new CustomEvent("header-tab-change", { 
      detail: { tab: value } 
    });
    window.dispatchEvent(headerEvent);
  };

  // Ensure tab state is in sync with URL or props
  useEffect(() => {
    // Optional: You could sync the URL hash with the active tab
    // window.location.hash = activeTab;
  }, [activeTab]);

  return (
    <Tabs 
      defaultValue={activeTab} 
      value={activeTab}
      onValueChange={dispatchTabChangeEvent}
      className="w-full animate-in transition-all"
    >
      <TabsList className={cn(
        "bg-white/20 dark:bg-white/5 p-1 mb-6 rounded-xl w-full justify-center",
        "border border-white/10 backdrop-blur-sm shadow-sm"
      )}>
        <TabsTrigger 
          value="dashboard" 
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm",
            "rounded-lg py-2 px-4 text-sm font-medium transition-all",
            "hover:bg-white/90 hover:text-primary/90",
            "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1",
            isMobile ? "flex-1" : "min-w-[100px]"
          )}
        >
          {t("dashboard.tabs.overview", "نظرة عامة")}
        </TabsTrigger>
        <TabsTrigger 
          value="marketing" 
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm",
            "rounded-lg py-2 px-4 text-sm font-medium transition-all",
            "hover:bg-white/90 hover:text-primary/90",
            "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1",
            isMobile ? "flex-1" : "min-w-[100px]"
          )}
        >
          {t("dashboard.tabs.marketing", "التسويق")}
        </TabsTrigger>
        <TabsTrigger 
          value="content" 
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm",
            "rounded-lg py-2 px-4 text-sm font-medium transition-all",
            "hover:bg-white/90 hover:text-primary/90",
            "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1",
            isMobile ? "flex-1" : "min-w-[100px]"
          )}
        >
          {t("dashboard.tabs.content", "المحتوى")}
        </TabsTrigger>
        <TabsTrigger 
          value="analytics" 
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm",
            "rounded-lg py-2 px-4 text-sm font-medium transition-all",
            "hover:bg-white/90 hover:text-primary/90",
            "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1",
            isMobile ? "flex-1" : "min-w-[100px]"
          )}
        >
          {t("dashboard.tabs.analytics", "التحليلات")}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent 
        value="dashboard" 
        className="mt-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <OverviewTab />
      </TabsContent>
      
      <TabsContent 
        value="marketing" 
        className="mt-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <MarketingTab />
      </TabsContent>
      
      <TabsContent 
        value="content" 
        className="mt-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <ContentTab />
      </TabsContent>
      
      <TabsContent 
        value="analytics" 
        className="mt-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <AnalyticsTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
