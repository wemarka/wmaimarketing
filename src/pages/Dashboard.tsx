
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Helmet } from "react-helmet-async";
import { OverviewTab, MarketingTab, ContentTab, AnalyticsTab } from "@/modules/dashboard/components";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const currentTime = new Date();
  
  // Listen for custom events from header for tab changes
  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail.tab);
    };

    // Add event listener
    window.addEventListener('dashboard-tab-change' as any, handleTabChange as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('dashboard-tab-change' as any, handleTabChange as EventListener);
    };
  }, []);
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "صباح الخير";
    if (hour < 18) return "مساء الخير";
    return "مساء الخير";
  };
  
  // Format date in Arabic
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Intl.DateTimeFormat('ar-SA', options).format(currentTime);
  };

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <OverviewTab />;
      case "performance":
        return <MarketingTab />;
      case "analytics":
        return <AnalyticsTab />;
      default:
        return <OverviewTab />;
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>لوحة التحكم - سيركل</title>
      </Helmet>
      <motion.div 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-none shadow-none bg-gradient-to-r from-[#3a7a89]/10 to-[#4a8a99]/5 mb-6">
          <CardContent className="p-6">
            <motion.div 
              className="flex flex-col md:flex-row md:items-center justify-between gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-2xl font-bold text-[#3a7a89] mb-1">
                  {getGreeting()}, {user?.email?.split('@')[0] || 'مرحبًا بك'}
                </h1>
                <p className="text-sm text-gray-500">{getFormattedDate()}</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-white dark:bg-slate-800 rounded-full py-1 px-4 text-sm shadow-sm border border-gray-100 dark:border-slate-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>جدولة منشورات جديدة</span>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-full py-1 px-4 text-sm shadow-sm border border-gray-100 dark:border-slate-700 flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  <span>استعراض تفاعلات الأسبوع</span>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
        
        {/* Tabs content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
