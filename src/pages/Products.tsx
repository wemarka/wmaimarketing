
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Products = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>{t('products.title', 'المنتجات')} - سيركل</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('products.management', 'إدارة المنتجات')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('products.description', 'إدارة منتجات التجميل وعرضها')}
        </p>
      </div>
    </Layout>
  );
};

export default Products;
