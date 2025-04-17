
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Register = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#3a7a89] to-[#276070]">
      <Helmet>
        <title>{t('auth.register', 'إنشاء حساب')} - سيركل</title>
      </Helmet>
      
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">{t('auth.register', 'إنشاء حساب')}</h1>
        {/* Register form would go here */}
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">
            {t('auth.registerDescription', 'قم بإنشاء حساب جديد للوصول إلى لوحة التحكم')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
