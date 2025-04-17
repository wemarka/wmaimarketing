
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Helmet>
        <title>{t('notFound.title', '404 - الصفحة غير موجودة')} - سيركل</title>
      </Helmet>
      
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">
          {t('notFound.heading', 'الصفحة غير موجودة')}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t('notFound.description', 'عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.')}
        </p>
        <Button asChild>
          <Link to="/">{t('notFound.backHome', 'العودة إلى الرئيسية')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
