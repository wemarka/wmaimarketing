
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Toaster } from 'sonner';
import { Helmet } from 'react-helmet-async';
import Dashboard from '@/pages/Dashboard';
import Layout from '@/components/layout/Layout';
import { SidebarProvider } from '@/components/ui/sidebar';

function App() {
  return (
    <>
      <Helmet>
        <html dir="rtl" lang="ar" />
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
