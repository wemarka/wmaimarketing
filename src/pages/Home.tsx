
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>{t('home.title', 'الرئيسية')} - سيركل</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('home.welcome', 'مرحباً بك في سيركل')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('home.description', 'منصة إدارة التسويق الرقمي الشاملة لمنتجات التجميل')}
        </p>
      </div>
    </Layout>
  );
};

export default Home;
