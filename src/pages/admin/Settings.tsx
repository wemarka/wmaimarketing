
import React from 'react';
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>{t('settings.title', 'الإعدادات')} - سيركل</title>
      </Helmet>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">{t('settings.heading', 'إعدادات النظام')}</h1>
        
        <div className="space-y-8">
          <p className="text-muted-foreground">
            {t('settings.description', 'يمكنك تخصيص إعدادات النظام من هنا.')}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
