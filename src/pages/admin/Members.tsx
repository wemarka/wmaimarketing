
import React from 'react';
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Members = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>{t('members.title', 'الأعضاء')} - سيركل</title>
      </Helmet>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">{t('members.heading', 'إدارة الأعضاء')}</h1>
        
        <div className="space-y-8">
          <p className="text-muted-foreground">
            {t('members.description', 'يمكنك إدارة أعضاء الفريق من هنا.')}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Members;
