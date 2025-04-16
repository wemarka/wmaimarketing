
import React from "react";
import Layout from "@/components/layout/Layout";
import { DashboardTabs } from "@/modules/dashboard/components";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <Layout>
      <Helmet>
        <title>لوحة التحكم - بيوتي</title>
      </Helmet>
      <motion.div 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardTabs />
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
