
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Toaster } from 'sonner';
import { Helmet } from 'react-helmet-async';
import Dashboard from '@/pages/Dashboard';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function App() {
  const { i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const lang = i18n.language === "ar" ? "ar" : "en";

  // تطبيق اتجاه اللغة على مستوى الـ HTML
  useEffect(() => {
    document.dir = direction;
    document.documentElement.lang = lang;
  }, [direction, lang]);

  return (
    <>
      <Helmet>
        <html dir={direction} lang={lang} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      <Toaster richColors position={direction === "rtl" ? "bottom-right" : "bottom-left"} />
      <SidebarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </>
  );
}

export default App;
