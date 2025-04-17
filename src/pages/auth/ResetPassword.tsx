
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { t } = useTranslation();
  const { token } = useParams<{ token: string }>();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#3a7a89] to-[#276070]">
      <Helmet>
        <title>{t('auth.resetPassword', 'إعادة تعيين كلمة المرور')} - سيركل</title>
      </Helmet>
      
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">{t('auth.resetPassword', 'إعادة تعيين كلمة المرور')}</h1>
        {/* Reset password form would go here */}
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">
            {t('auth.resetPasswordDescription', 'أدخل كلمة المرور الجديدة')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
