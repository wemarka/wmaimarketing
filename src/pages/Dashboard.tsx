
import React from "react";
import Layout from "@/components/layout/Layout";
import { DashboardGreeting, DashboardTabs } from "@/modules/dashboard/components";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <Layout>
      <Helmet>
        <title>لوحة التحكم - بيوتي</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <DashboardGreeting />
        <DashboardTabs />
      </div>
    </Layout>
  );
};

export default Dashboard;
