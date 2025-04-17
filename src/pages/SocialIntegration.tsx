
import React from "react";
import Layout from "@/components/layout/Layout";
import SocialIntegrationDashboard from "@/modules/marketing/components/integration/SocialIntegrationDashboard";
import { Helmet } from "react-helmet-async";

const SocialIntegration = () => {
  return (
    <Layout>
      <Helmet>
        <title>إدارة منصات التواصل الاجتماعي - سيركل</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SocialIntegrationDashboard />
      </div>
    </Layout>
  );
};

export default SocialIntegration;
