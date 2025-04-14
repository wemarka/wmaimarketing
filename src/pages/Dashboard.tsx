
import React from "react";
import Layout from "@/components/layout/Layout";
import { DashboardGreeting, DashboardTabs } from "@/modules/dashboard/components";

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <DashboardGreeting />
        <DashboardTabs />
      </div>
    </Layout>
  );
};

export default Dashboard;
