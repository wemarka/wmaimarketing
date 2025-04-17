
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Scheduling = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>{t('scheduling.title', 'جدولة المنشورات')} - سيركل</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('scheduling.management', 'جدولة ونشر المحتوى')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('scheduling.description', 'جدولة ونشر المحتوى على منصات التواصل الاجتماعي')}
        </p>
      </div>
    </Layout>
  );
};

export default Scheduling;
