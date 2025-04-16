
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import PerformanceTab from "./tabs/PerformanceTab";
import { BarChart3, Calendar, Layers, LineChart, Settings, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardTabsProps {
  activeTab: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab }) => {
  const tabsListRef = useRef<HTMLDivElement>(null);
  
  // Ensure active tab is visible by scrolling to it on mobile
  useEffect(() => {
    if (!tabsListRef.current) return;
    
    const activeElement = tabsListRef.current.querySelector('[data-state="active"]');
    if (activeElement) {
      const tabList = tabsListRef.current;
      const activeTabRect = activeElement.getBoundingClientRect();
      const tabListRect = tabList.getBoundingClientRect();
      
      const scrollPosition = activeTabRect.left + tabList.scrollLeft - tabListRect.left - (tabListRect.width / 2) + (activeTabRect.width / 2);
      
      tabList.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    }
  }, [activeTab]);
  
  return (
    <Tabs 
      defaultValue={activeTab || "dashboard"}
      value={activeTab || "dashboard"}
      className="space-y-4"
    >
      <div className="relative overflow-x-auto hide-scrollbar dashboard-tabs" ref={tabsListRef}>
        <TabsList className="w-full justify-start px-2 h-12 dashboard-tabs">
          <TabsTrigger 
            value="dashboard" 
            className={cn(
              "gap-2 px-4 data-[state=active]:bg-primary/10 relative"
            )}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm">النظرة العامة</span>
          </TabsTrigger>
          <TabsTrigger 
            value="performance" 
            className="gap-2 px-4 data-[state=active]:bg-primary/10"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">الأداء</span>
          </TabsTrigger>
          <TabsTrigger 
            value="content" 
            className="gap-2 px-4 data-[state=active]:bg-primary/10"
          >
            <Layers className="h-4 w-4" />
            <span className="text-sm">المحتوى</span>
          </TabsTrigger>
          <TabsTrigger 
            value="schedule" 
            className="gap-2 px-4 data-[state=active]:bg-primary/10"
          >
            <Calendar className="h-4 w-4" />
            <span className="text-sm">المواعيد</span>
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="gap-2 px-4 data-[state=active]:bg-primary/10"
          >
            <LineChart className="h-4 w-4" />
            <span className="text-sm">التحليلات</span>
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="gap-2 px-4 data-[state=active]:bg-primary/10"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">الإعدادات</span>
          </TabsTrigger>
        </TabsList>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TabsContent value="dashboard" className="m-0">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="performance" className="m-0">
          <PerformanceTab />
        </TabsContent>
        <TabsContent value="content" className="m-0">
          <div className="p-4 border rounded-lg bg-muted/10">
            <h3 className="font-medium text-lg">قسم المحتوى</h3>
            <p className="text-muted-foreground">هذا القسم قيد التطوير</p>
          </div>
        </TabsContent>
        <TabsContent value="schedule" className="m-0">
          <div className="p-4 border rounded-lg bg-muted/10">
            <h3 className="font-medium text-lg">قسم المواعيد</h3>
            <p className="text-muted-foreground">هذا القسم قيد التطوير</p>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="m-0">
          <div className="p-4 border rounded-lg bg-muted/10">
            <h3 className="font-medium text-lg">قسم التحليلات</h3>
            <p className="text-muted-foreground">هذا القسم قيد التطوير</p>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="m-0">
          <div className="p-4 border rounded-lg bg-muted/10">
            <h3 className="font-medium text-lg">قسم الإعدادات</h3>
            <p className="text-muted-foreground">هذا القسم قيد التطوير</p>
          </div>
        </TabsContent>
      </motion.div>
    </Tabs>
  );
};

export default DashboardTabs;
