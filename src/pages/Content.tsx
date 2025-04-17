
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Content = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>{t('content.title', 'المحتوى')} - سيركل</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('content.management', 'إدارة المحتوى')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('content.description', 'إدارة المحتوى الرقمي الخاص بمنتجاتك')}
        </p>
      </div>
    </Layout>
  );
};

export default Content;
