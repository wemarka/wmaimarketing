
import React from 'react';
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SocialIntegration = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>{t('socialIntegration.title', 'التكامل مع منصات التواصل')} - سيركل</title>
      </Helmet>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">{t('socialIntegration.heading', 'التكامل مع منصات التواصل')}</h1>
        
        <div className="space-y-8">
          <p className="text-muted-foreground">
            {t('socialIntegration.description', 'يمكنك ربط حساباتك على منصات التواصل الاجتماعي من هنا.')}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SocialIntegration;
