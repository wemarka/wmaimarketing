
import React from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Helmet } from "react-helmet-async";
import OverviewTab from "@/modules/dashboard/components/tabs/OverviewTab";

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <Helmet>
        <title>لوحة التحكم - سيركل</title>
      </Helmet>
      <motion.div 
        className="w-full transition-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-none shadow-none bg-gradient-to-r from-[#3a7a89]/10 to-[#4a8a99]/5 mb-6">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">النظرة العامة</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">تتبع أداء حساباتك وتفاعلات الجمهور</p>
          </div>
        </Card>
        
        {/* Main dashboard content - Overview tab by default */}
        <OverviewTab />
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
