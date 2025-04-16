import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Default resources - we'll keep them minimal for now
const resources = {
  en: {
    translation: {
      "common.loading": "Loading analytics data...",
      "common.retry": "Retry",
      "dashboard.stats.impressions.title": "Impressions",
      "dashboard.stats.engagement.title": "Engagement Rate",
      "dashboard.stats.averageClicks.title": "Click Rate",
      "dashboard.stats.conversion.title": "Conversions",
      "dashboard.charts.overview.title": "Overview",
      "dashboard.charts.platforms.title": "Platforms",
      "dashboard.charts.engagement.title": "Engagement",
      "dashboard.posts.tracker.title": "Post Status",
      "analytics.fallbackData.title": "Using Fallback Data",
      "analytics.fallbackData.description": "Could not connect to server, showing previously stored data. We'll try to update it once connection is restored.",
      "analytics.cachedData": "Cached Data",
      "sidebar.navigation.dashboard": "Dashboard",
      "sidebar.tooltip.dashboard": "Go to Dashboard",
      "dashboard.overview.title": "Overview"
    }
  },
  ar: {
    translation: {
      "common.loading": "جاري تحميل بيانات التحليلات...",
      "common.retry": "إعادة المحاولة",
      "dashboard.stats.impressions.title": "المشاهدات",
      "dashboard.stats.engagement.title": "معدل التفاعل",
      "dashboard.stats.averageClicks.title": "معدل النقر",
      "dashboard.stats.conversion.title": "التحويلات",
      "dashboard.charts.overview.title": "نظرة عامة",
      "dashboard.charts.platforms.title": "المنصات",
      "dashboard.charts.engagement.title": "التفاعل",
      "dashboard.posts.tracker.title": "حالة المنشورات",
      "analytics.fallbackData.title": "استخدام البيانات الاحتياطية",
      "analytics.fallbackData.description": "تعذر الاتصال بالخادم، نعرض لك بيانات مخزنة مسبقًا. سنحاول تحديثها فور استعادة الاتصال.",
      "analytics.cachedData": "بيانات مخزنة مؤقتًا",
      "sidebar.navigation.dashboard": "لوحة التحكم",
      "sidebar.tooltip.dashboard": "الذهاب إلى لوحة التحكم",
      "dashboard.overview.title": "النظرة العامة"
    }
  }
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: document.documentElement.dir === 'rtl' ? 'ar' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // This prevents issues with SSR
    },
  });

export default i18n;
