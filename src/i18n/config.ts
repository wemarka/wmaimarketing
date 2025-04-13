
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';

// Get saved language from localStorage or default to English
const savedLanguage = localStorage.getItem('language') || 'en';

// Set document direction for RTL/LTR support
document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = savedLanguage;

const resources = {
  en: {
    translation: enTranslation
  },
  ar: {
    translation: arTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  // Update document direction for RTL/LTR support
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

// Make sure these translations are available
if (!i18n.exists('sidebar.navigation.dashboard')) {
  // Add sidebar translations to English
  i18n.addResourceBundle('en', 'translation', {
    sidebar: {
      groups: {
        main: "Main",
        mediaAnalytics: "Media & Analytics",
        management: "Management",
        documentation: "Documentation & Features"
      },
      navigation: {
        dashboard: "Dashboard",
        imageAnalysis: "Image Analysis",
        adGenerator: "Ad Generator",
        contentCreator: "Content Creator",
        videoGenerator: "Video Generator",
        scheduler: "Schedule & Publish",
        analytics: "Analytics",
        profile: "Profile",
        userManagement: "User Management",
        integrations: "Integrations",
        projectPlan: "Project Plan",
        aiStudio: "AI Studio"
      },
      tooltip: {
        dashboard: "Home Page",
        imageAnalysis: "Analyze Product Images",
        adGenerator: "Create Compelling Ads",
        contentCreator: "Create Outstanding Content",
        videoGenerator: "Create Professional Videos",
        scheduler: "Schedule and Publish Content",
        analytics: "Analyze Content Performance",
        profile: "Manage Your Account",
        userManagement: "Manage Your Team",
        integrations: "Connect with Other Services",
        projectPlan: "Project Plan & Documentation",
        aiStudio: "AI Studio"
      },
      badge: {
        new: "New"
      },
      trialUser: "Trial User",
      upgradeAccess: "Upgrade to access all features",
      upgradeNow: "Upgrade Now",
      signOut: "Sign Out"
    }
  }, true, true);

  // Add sidebar translations to Arabic
  i18n.addResourceBundle('ar', 'translation', {
    sidebar: {
      groups: {
        main: "الرئيسية",
        mediaAnalytics: "الوسائط والتحليلات",
        management: "الإدارة",
        documentation: "التوثيق والميزات"
      },
      navigation: {
        dashboard: "لوحة التحكم",
        imageAnalysis: "تحليل الصور",
        adGenerator: "منشئ الإعلانات",
        contentCreator: "منشئ المحتوى",
        videoGenerator: "منشئ الفيديو",
        scheduler: "الجدولة والنشر",
        analytics: "التحليلات",
        profile: "الملف الشخصي",
        userManagement: "إدارة المستخدمين",
        integrations: "التكاملات",
        projectPlan: "خطة المشروع",
        aiStudio: "استوديو الذكاء الاصطناعي"
      },
      tooltip: {
        dashboard: "الصفحة الرئيسية",
        imageAnalysis: "تحليل صور المنتجات",
        adGenerator: "إنشاء إعلانات جذابة",
        contentCreator: "إنشاء محتوى متميز",
        videoGenerator: "إنشاء فيديوهات احترافية",
        scheduler: "جدولة المحتوى ونشره",
        analytics: "تحليل أداء المحتوى",
        profile: "إدارة حسابك",
        userManagement: "إدارة فريق العمل",
        integrations: "ربط مع خدمات أخرى",
        projectPlan: "خطة المشروع والتوثيق",
        aiStudio: "استوديو الذكاء الاصطناعي"
      },
      badge: {
        new: "جديد"
      },
      trialUser: "مستخدم الإصدار التجريبي",
      upgradeAccess: "يمكنك الترقية للوصول إلى جميع الميزات",
      upgradeNow: "ترقية الآن",
      signOut: "تسجيل الخروج"
    }
  }, true, true);
}

export default i18n;
