
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Settings, 
  BarChart3, 
  FileEdit, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { motion } from "framer-motion";
import OverviewTab from "./tabs/OverviewTab";
import MarketingTab from "./tabs/MarketingTab";
import ContentTab from "./tabs/ContentTab";
import AnalyticsTab from "./tabs/AnalyticsTab";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardTabs = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const isRTL = i18n.language === "ar";
  const isMobile = useIsMobile();
  
  // For scrolling tabs on mobile
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

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

  const checkScroll = () => {
    if (!tabsContainerRef.current) return;
    
    const container = tabsContainerRef.current;
    const hasOverflow = container.scrollWidth > container.clientWidth;
    
    setShowScrollButtons(hasOverflow);
    setShowLeftScroll(container.scrollLeft > 0);
    setShowRightScroll(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 5
    );
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!tabsContainerRef.current) return;
    
    const container = tabsContainerRef.current;
    const scrollAmount = container.clientWidth / 2;
    
    container.scrollBy({
      left: direction === 'left' 
        ? (isRTL ? scrollAmount : -scrollAmount) 
        : (isRTL ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });
    
    setTimeout(checkScroll, 350);
  };

  // Make active tab visible when changed
  useEffect(() => {
    if (!tabsContainerRef.current) return;
    
    const container = tabsContainerRef.current;
    const activeTabElement = container.querySelector(`[value="${activeTab}"]`) as HTMLElement;
    
    if (activeTabElement) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();
      
      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        activeTabElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest',
          inline: 'center'
        });
        
        setTimeout(checkScroll, 350);
      }
    }
  }, [activeTab]);

  // Listen to scroll events to update scroll buttons
  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      setShowLeftScroll(container.scrollLeft > 0);
      setShowRightScroll(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 5
      );
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Tabs 
      defaultValue="overview" 
      className="mb-8 relative"
      onValueChange={(value) => setActiveTab(value)}
      value={activeTab}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex items-center w-full max-w-3xl">
          {/* Left scroll button */}
          {showScrollButtons && showLeftScroll && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 z-10 bg-background/80 backdrop-blur-sm shadow-sm rounded-full h-7 w-7 mr-1"
              onClick={() => scrollTabs('left')}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
            </Button>
          )}
          
          {/* Tabs list with scroll container */}
          <div 
            ref={tabsContainerRef}
            className="overflow-x-auto scrollbar-none w-full mx-auto px-8"
            onScroll={checkScroll}
          >
            <TabsList 
              className={`bg-background border border-muted px-1 py-1 rounded-xl shadow-sm min-w-max ${isRTL ? "space-x-reverse" : ""}`}
            >
              {tabItems.map((tab) => (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className="rounded-lg px-5 py-2.5 data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple data-[state=active]:shadow-none transition-all duration-200"
                  onClick={() => setTimeout(checkScroll, 100)}
                >
                  <div className="flex items-center gap-1.5">
                    {tab.icon}
                    <span className={isMobile ? "text-xs" : ""}>{tab.label}</span>
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
          </div>
          
          {/* Right scroll button */}
          {showScrollButtons && showRightScroll && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 z-10 bg-background/80 backdrop-blur-sm shadow-sm rounded-full h-7 w-7 ml-1"
              onClick={() => scrollTabs('right')}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
          )}
        </div>
        
        <Button variant="outline" size="sm" className="border-beauty-purple/20 hover:bg-beauty-purple/5 text-beauty-purple hidden md:flex">
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
