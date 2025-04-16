
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
    const handleSubTabChange = (event: CustomEvent) => {
      if (event.detail.subtab) {
        setActiveTab(event.detail.subtab);
      }
    };

    // Add event listeners
    window.addEventListener('sub-tab-change' as any, handleSubTabChange as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('sub-tab-change' as any, handleSubTabChange as EventListener);
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
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3a7a89] to-[#4a8a99] bg-clip-text text-transparent mb-1">
                    {getGreeting()}, {user?.email?.split('@')[0] || 'مرحبًا بك'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{getFormattedDate()}</p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
          
          {/* Integrated dashboard tabs in a single dynamic content area */}
          <DashboardTabs activeTab={activeTab} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default Dashboard;
