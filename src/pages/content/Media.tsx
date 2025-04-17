
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Media = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>{t('media.title', 'الوسائط')} - سيركل</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('media.management', 'إدارة الوسائط')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('media.description', 'إدارة الصور والفيديوهات الخاصة بمنتجاتك')}
        </p>
      </div>
    </Layout>
  );
};

export default Media;
