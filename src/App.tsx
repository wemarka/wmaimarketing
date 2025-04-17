
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Toaster } from 'sonner';
import { Helmet } from 'react-helmet-async';
import Dashboard from '@/pages/Dashboard';
import Layout from '@/components/layout/Layout';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const lang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <Helmet>
        <html dir={direction} lang={lang} />
      </Helmet>
      <Toaster richColors position="bottom-left" />
      <SidebarProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Layout>
        </Router>
      </SidebarProvider>
    </>
  );
}

export default App;
