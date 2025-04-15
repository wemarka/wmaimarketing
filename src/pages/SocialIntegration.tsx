
import React from "react";
import Layout from "@/components/layout/Layout";
import SocialIntegrationDashboard from "@/modules/marketing/components/integration/SocialIntegrationDashboard";

const SocialIntegration = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SocialIntegrationDashboard />
      </div>
    </Layout>
  );
};

export default SocialIntegration;
