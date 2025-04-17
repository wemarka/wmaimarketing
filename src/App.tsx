
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Import contexts
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { ActivityProvider } from './context/ActivityContext';
import { QueryPerformanceProvider } from './context/QueryPerformanceProvider';

// Import routes
import AppRoutes from './routes/appRoutes';

function App() {
  const { i18n } = useTranslation();

  // Set the document direction based on the current language
  React.useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <HelmetProvider>
      <QueryPerformanceProvider>
        <AuthProvider>
          <ActivityProvider>
            <Router>
              <AppRoutes />
            </Router>
            <Toaster />
          </ActivityProvider>
        </AuthProvider>
      </QueryPerformanceProvider>
    </HelmetProvider>
  );
}

export default App;
