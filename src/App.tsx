
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Import components
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Content from './pages/Content';
import MarketingCampaigns from './pages/marketing/Campaigns';
import MarketingAudience from './pages/marketing/Audience';
import MarketingInsights from './pages/marketing/Insights';
import CompetitorAnalysis from './pages/marketing/CompetitorAnalysis';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import Roles from './pages/admin/Roles';
import Media from './pages/content/Media';
import Posts from './pages/content/Posts';
import Images from './pages/content/Images';
import Videos from './pages/content/Videos';
import Scheduling from './pages/Scheduling';
import Products from './pages/Products';
import Documentation from './pages/Documentation';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Profile from './pages/Profile';
import Invitation from './pages/auth/Invitation';
import ContentCreator from './modules/content-creator/pages/ContentCreator';
import NotificationCenter from './pages/NotificationCenter';
import SocialIntegration from './pages/SocialIntegration';
import DashboardPerformance from './pages/dashboard/Performance';
import DashboardInteractions from './pages/dashboard/Interactions';

// Import contexts
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { ActivityProvider } from './context/ActivityContext';
import { QueryPerformanceProvider } from './context/QueryPerformanceProvider';

// Import hooks
import { useAuth } from './hooks/useAuth';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

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
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/invitation/:token" element={<Invitation />} />

                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dashboard/performance" element={<ProtectedRoute><DashboardPerformance /></ProtectedRoute>} />
                <Route path="/dashboard/interactions" element={<ProtectedRoute><DashboardInteractions /></ProtectedRoute>} />
                <Route path="/analytics/:subtab?" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />

                <Route path="/content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
                <Route path="/content/media" element={<ProtectedRoute><Media /></ProtectedRoute>} />
                <Route path="/content/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
                <Route path="/content/images" element={<ProtectedRoute><Images /></ProtectedRoute>} />
                <Route path="/content/videos" element={<ProtectedRoute><Videos /></ProtectedRoute>} />
                <Route path="/content/creator" element={<ProtectedRoute><ContentCreator /></ProtectedRoute>} />

                <Route path="/marketing/campaigns" element={<ProtectedRoute><MarketingCampaigns /></ProtectedRoute>} />
                <Route path="/marketing/audience" element={<ProtectedRoute><MarketingAudience /></ProtectedRoute>} />
                <Route path="/marketing/insights" element={<ProtectedRoute><MarketingInsights /></ProtectedRoute>} />
                <Route path="/marketing/competitors" element={<ProtectedRoute><CompetitorAnalysis /></ProtectedRoute>} />

                <Route path="/scheduling" element={<ProtectedRoute><Scheduling /></ProtectedRoute>} />
                <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="/documentation" element={<ProtectedRoute><Documentation /></ProtectedRoute>} />

                <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/admin/roles" element={<ProtectedRoute><Roles /></ProtectedRoute>} />

                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><NotificationCenter /></ProtectedRoute>} />
                <Route path="/integration" element={<ProtectedRoute><SocialIntegration /></ProtectedRoute>} />
              </Routes>
            </Router>
            <Toaster />
          </ActivityProvider>
        </AuthProvider>
      </QueryPerformanceProvider>
    </HelmetProvider>
  );
}

export default App;
