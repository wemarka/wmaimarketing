
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

  return (
    <Layout>
      <Helmet>
        <title>لوحة التحكم - سيركل</title>
      </Helmet>
      <AnimatePresence mode="sync">
        <motion.div 
          className="w-full transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-none bg-gradient-to-r from-[#3a7a89]/10 to-[#4a8a99]/5 mb-6">
            <CardContent className="p-6">
              {/* We removed the HeaderGreeting from here as it's now in the Header component */}
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
