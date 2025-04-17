
import React from 'react';
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SocialIntegrationDashboard from "@/modules/marketing/components/integration/SocialIntegrationDashboard";

const SocialIntegration = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>{t('socialIntegration.title', 'التكامل مع منصات التواصل')} - سيركل</title>
      </Helmet>
      <div className="container py-6">
        <SocialIntegrationDashboard />
      </div>
    </Layout>
  );
};

export default SocialIntegration;
