
import React, { useEffect, useRef } from "react";
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
  const tabsListRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll tabs into view when tab changes
  useEffect(() => {
    if (tabsListRef.current) {
      const activeTabElement = tabsListRef.current.querySelector('[data-state="active"]');
      if (activeTabElement) {
        const tabsListRect = tabsListRef.current.getBoundingClientRect();
        const activeTabRect = activeTabElement.getBoundingClientRect();
        
        // Calculate the center position
        const targetScrollLeft = activeTabRect.left - tabsListRect.left - 
          (tabsListRect.width / 2) + (activeTabRect.width / 2);
        
        tabsListRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);
  
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

  return (
    <Tabs 
      defaultValue={activeTab} 
      value={activeTab}
      onValueChange={dispatchTabChangeEvent}
      className="w-full animate-in transition-all"
    >
      <div className="overflow-x-auto pb-1 scrollbar-none">
        <TabsList 
          ref={tabsListRef}
          className={cn(
            "bg-white/20 dark:bg-white/5 p-1 mb-6 rounded-xl w-max min-w-full",
            "border border-white/10 backdrop-blur-sm shadow-sm",
            "flex items-center justify-start gap-1",
            "no-scrollbar overflow-x-auto"
          )}
        >
          <TabsTrigger 
            value="dashboard" 
            className={cn(
              "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm",
              "rounded-lg py-2 px-4 text-sm font-medium transition-all",
              "hover:bg-white/90 hover:text-primary/90",
              "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1",
              isMobile ? "flex-shrink-0" : "min-w-[100px]",
              "whitespace-nowrap"
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
              isMobile ? "flex-shrink-0" : "min-w-[100px]",
              "whitespace-nowrap"
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
              isMobile ? "flex-shrink-0" : "min-w-[100px]",
              "whitespace-nowrap"
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
              isMobile ? "flex-shrink-0" : "min-w-[100px]",
              "whitespace-nowrap"
            )}
          >
            {t("dashboard.tabs.analytics", "التحليلات")}
          </TabsTrigger>
        </TabsList>
      </div>
      
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
