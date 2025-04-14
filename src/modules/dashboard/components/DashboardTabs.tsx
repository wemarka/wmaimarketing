
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import OverviewTab from "./tabs/OverviewTab";
import MarketingTab from "./tabs/MarketingTab";
import ContentTab from "./tabs/ContentTab";
import AnalyticsTab from "./tabs/AnalyticsTab";

const DashboardTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs 
      defaultValue="overview" 
      className="mb-8"
      onValueChange={(value) => setActiveTab(value)}
    >
      <div className="flex items-center justify-between mb-6">
        <TabsList>
          <TabsTrigger value="overview" className="px-5">
            {t("dashboard.tabs.overview")}
          </TabsTrigger>
          <TabsTrigger value="marketing" className="px-5">
            {t("dashboard.tabs.marketing")}
          </TabsTrigger>
          <TabsTrigger value="content" className="px-5">
            {t("dashboard.tabs.content")}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="px-5">
            {t("dashboard.tabs.analytics")}
          </TabsTrigger>
        </TabsList>
        <Button variant="outline" size="sm">
          {t("dashboard.actions.customize")}
        </Button>
      </div>
      
      {/* Tab Contents */}
      <TabsContent value="overview">
        <OverviewTab />
      </TabsContent>
      
      <TabsContent value="marketing">
        <MarketingTab />
      </TabsContent>
      
      <TabsContent value="content">
        <ContentTab />
      </TabsContent>
      
      <TabsContent value="analytics">
        <AnalyticsTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
