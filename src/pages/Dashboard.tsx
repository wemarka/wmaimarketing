
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Helmet } from "react-helmet-async";
import DashboardTabs from "@/modules/dashboard/components/DashboardTabs";
import { BarChart3, Calendar, LayoutDashboard, Library } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mounted, setMounted] = useState(false);
  const currentTime = new Date();
  
  // Handle initial mount animation
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Listen for custom events from header for tab changes
  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail.tab);
    };

    // Add event listeners
    window.addEventListener('header-tab-change' as any, handleTabChange as EventListener);
    window.addEventListener('dashboard-tab-change' as any, handleTabChange as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('header-tab-change' as any, handleTabChange as EventListener);
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

  // Tab configuration
  const tabs = [
    { id: "dashboard", label: "النظرة العامة", icon: LayoutDashboard },
    { id: "analytics", label: "التحليلات", icon: BarChart3 },
    { id: "content", label: "المحتوى", icon: Library },
    { id: "performance", label: "الأداء", icon: Calendar }
  ];
  
  return (
    <Layout>
      <Helmet>
        <title>لوحة التحكم - سيركل</title>
      </Helmet>
      <AnimatePresence mode="sync">
        <motion.div 
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-none bg-gradient-to-r from-[#3a7a89]/10 to-[#4a8a99]/5 mb-6">
            <CardContent className="p-6">
              <motion.div 
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-right">
                  <h1 className="text-2xl font-bold text-[#3a7a89] dark:text-[#4a8a99] mb-1">
                    {getGreeting()}, {user?.email?.split('@')[0] || 'مرحبًا بك'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{getFormattedDate()}</p>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                        activeTab === tab.id
                          ? "bg-primary text-white shadow-md"
                          : "bg-white/90 dark:bg-slate-800/70 text-gray-700 dark:text-gray-300 hover:bg-white"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="text-sm whitespace-nowrap">{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </CardContent>
          </Card>
          
          {/* Tabs content with improved component */}
          <DashboardTabs activeTab={activeTab} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default Dashboard;
