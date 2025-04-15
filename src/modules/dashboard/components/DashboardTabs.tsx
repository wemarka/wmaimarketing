
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, BarChart3, FileEdit } from "lucide-react";
import { motion } from "framer-motion";
import OverviewTab from "./tabs/OverviewTab";
import MarketingTab from "./tabs/MarketingTab";
import ContentTab from "./tabs/ContentTab";
import AnalyticsTab from "./tabs/AnalyticsTab";

const DashboardTabs = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const isRTL = i18n.language === "ar";

  const tabItems = [
    {
      id: "overview",
      label: t("dashboard.tabs.overview"),
      icon: <LayoutDashboard className="h-4 w-4 mr-1" />
    },
    {
      id: "marketing",
      label: t("dashboard.tabs.marketing"),
      icon: <FileEdit className="h-4 w-4 mr-1" />
    },
    {
      id: "content",
      label: t("dashboard.tabs.content"),
      icon: <Settings className="h-4 w-4 mr-1" />
    },
    {
      id: "analytics",
      label: t("dashboard.tabs.analytics"),
      icon: <BarChart3 className="h-4 w-4 mr-1" />
    }
  ];

  return (
    <Tabs 
      defaultValue="overview" 
      className="mb-8"
      onValueChange={(value) => setActiveTab(value)}
    >
      <div className="flex items-center justify-between mb-6">
        <TabsList className={`bg-background border border-muted px-1 rounded-xl shadow-sm ${isRTL ? "space-x-reverse" : ""}`}>
          {tabItems.map((tab) => (
            <TabsTrigger 
              key={tab.id}
              value={tab.id} 
              className="rounded-lg px-5 py-2.5 data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple data-[state=active]:shadow-none transition-all duration-200"
            >
              <div className="flex items-center gap-1.5">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-beauty-purple rounded-full"
                  layoutId="activeTab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <Button variant="outline" size="sm" className="border-beauty-purple/20 hover:bg-beauty-purple/5 text-beauty-purple">
          {t("dashboard.actions.customize")}
        </Button>
      </div>
      
      {/* Tab Contents */}
      <TabsContent value="overview" className="animate-fade-in mt-0">
        <OverviewTab />
      </TabsContent>
      
      <TabsContent value="marketing" className="animate-fade-in mt-0">
        <MarketingTab />
      </TabsContent>
      
      <TabsContent value="content" className="animate-fade-in mt-0">
        <ContentTab />
      </TabsContent>
      
      <TabsContent value="analytics" className="animate-fade-in mt-0">
        <AnalyticsTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
