import { useEffect } from 'react';
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext"; 
import { useNotificationsStore } from "./stores/notificationsStore";
import { subscribeToNotifications } from "./services/notificationService";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

import { QueryPerformanceProvider } from './context/QueryPerformanceProvider';
import RequireAuth from "@/components/auth/RequireAuth";
import RoleBasedGuard from "@/components/auth/RoleBasedGuard";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Documentation from "./pages/Documentation";
import UserManagement from "./pages/UserManagement";
import ImageUpload from "./pages/ImageUpload";
import ContentCreator from "./pages/ContentCreator";
import AdGenerator from "./pages/AdGenerator";
import AdDesigner from "./pages/AdDesigner";
import VideoGenerator from "./pages/VideoGenerator";
import Analytics from "./pages/Analytics";
import Scheduler from "./pages/Scheduler";
import SchedulerSettings from "./pages/SchedulerSettings";
import ContentTools from "./pages/ContentTools";
import Integration from "./pages/Integration";
import AIStudio from "./pages/AIStudio";
import AdContentGenerator from "./pages/AdContentGenerator";
import NotificationCenter from "./pages/NotificationCenter";

// Dashboard specific pages
import DashboardPerformance from "@/pages/dashboard/Performance";
import DashboardInteractions from "@/pages/dashboard/Interactions";

// Marketing specific pages
import MarketingCampaigns from "@/pages/marketing/Campaigns";
import MarketingAudience from "@/pages/marketing/Audience";
import MarketingInsights from "@/pages/marketing/Insights";

// Content specific pages
import ContentPosts from "@/pages/content/Posts";
import ContentImages from "@/pages/content/Images";
import ContentVideos from "@/pages/content/Videos";

// Analytics specific pages
import AnalyticsWeekly from "@/pages/analytics/Weekly";
import AnalyticsEngagement from "@/pages/analytics/Engagement";
import AnalyticsSales from "@/pages/analytics/Sales";

// Admin specific pages
import AdminUsers from "@/pages/admin/Users";
import AdminSettings from "@/pages/admin/Settings";
import AdminRoles from "@/pages/admin/Roles";

// New Module Pages
import GenerateAd from "./modules/ai-generator/pages/GenerateAd";
import SchedulePost from "./modules/marketing/pages/SchedulePost";
import ProductList from "./modules/product/pages/ProductList";
import AddProduct from "./modules/product/pages/AddProduct";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const { addNotification } = useNotificationsStore();
  
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    if (user?.id) {
      unsubscribe = subscribeToNotifications(user.id, (notification) => {
        addNotification(notification);
      });
    }
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user?.id, addNotification]);

  return (
    <QueryPerformanceProvider>
      <Routes location={location}>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="/dashboard/performance" element={
          <RequireAuth>
            <DashboardPerformance />
          </RequireAuth>
        } />
        <Route path="/dashboard/interactions" element={
          <RequireAuth>
            <DashboardInteractions />
          </RequireAuth>
        } />
        
        {/* Marketing Routes */}
        <Route path="/marketing/campaigns" element={
          <RoleBasedGuard allowedRoles={['admin', 'marketing']}>
            <MarketingCampaigns />
          </RoleBasedGuard>
        } />
        <Route path="/marketing/audience" element={
          <RoleBasedGuard allowedRoles={['admin', 'marketing']}>
            <MarketingAudience />
          </RoleBasedGuard>
        } />
        <Route path="/marketing/insights" element={
          <RoleBasedGuard allowedRoles={['admin', 'marketing']}>
            <MarketingInsights />
          </RoleBasedGuard>
        } />
        
        {/* Content Routes */}
        <Route path="/content/posts" element={
          <RequireAuth>
            <ContentPosts />
          </RequireAuth>
        } />
        <Route path="/content/images" element={
          <RequireAuth>
            <ContentImages />
          </RequireAuth>
        } />
        <Route path="/content/videos" element={
          <RequireAuth>
            <ContentVideos />
          </RequireAuth>
        } />
        
        {/* Analytics Routes */}
        <Route path="/analytics/weekly" element={
          <RoleBasedGuard allowedRoles={['admin', 'marketing', 'manager']}>
            <AnalyticsWeekly />
          </RoleBasedGuard>
        } />
        <Route path="/analytics/engagement" element={
          <RoleBasedGuard allowedRoles={['admin', 'marketing', 'manager']}>
            <AnalyticsEngagement />
          </RoleBasedGuard>
        } />
        <Route path="/analytics/sales" element={
          <RoleBasedGuard allowedRoles={['admin', 'marketing', 'manager']}>
            <AnalyticsSales />
          </RoleBasedGuard>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/users" element={
          <RoleBasedGuard allowedRoles={['admin', 'manager']}>
            <AdminUsers />
          </RoleBasedGuard>
        } />
        <Route path="/admin/settings" element={
          <RoleBasedGuard allowedRoles={['admin', 'manager']}>
            <AdminSettings />
          </RoleBasedGuard>
        } />
        <Route path="/admin/roles" element={
          <RoleBasedGuard allowedRoles={['admin', 'manager']}>
            <AdminRoles />
          </RoleBasedGuard>
        } />
        
        {/* Legacy routes - for backward compatibility */}
        <Route path="/content-creator" element={
          <RequireAuth>
            <ContentCreator />
          </RequireAuth>
        } />
        <Route path="/content-tools" element={
          <RequireAuth>
            <ContentTools />
          </RequireAuth>
        } />
        <Route path="/ai-studio" element={
          <RequireAuth>
            <AIStudio />
          </RequireAuth>
        } />
        <Route path="/image-upload" element={
          <RequireAuth>
            <ImageUpload />
          </RequireAuth>
        } />
        <Route path="/video-generator" element={
          <RequireAuth>
            <VideoGenerator />
          </RequireAuth>
        } />
        <Route path="/ad-generator" element={
          <RequireAuth>
            <AdGenerator />
          </RequireAuth>
        } />
        <Route path="/ad-designer" element={
          <RequireAuth>
            <AdDesigner />
          </RequireAuth>
        } />
        <Route path="/notifications" element={
          <RequireAuth>
            <NotificationCenter />
          </RequireAuth>
        } />
        <Route path="/generate-ad" element={
          <RoleBasedGuard allowedRoles={['admin', 'marketing', 'designer']}>
            <GenerateAd />
          </RoleBasedGuard>
        } />
        <Route path="/schedule-post" element={
          <RoleBasedGuard allowedRoles={['admin', 'marketing']}>
            <SchedulePost />
          </RoleBasedGuard>
        } />
        <Route path="/product/list" element={
          <RoleBasedGuard allowedRoles={['admin', 'marketing']}>
            <ProductList />
          </RoleBasedGuard>
        } />
        <Route path="/product/add" element={
          <RoleBasedGuard allowedRoles={['admin', 'marketing']}>
            <AddProduct />
          </RoleBasedGuard>
        } />
        <Route path="/profile" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path="/users" element={
          <RoleBasedGuard allowedRoles={['admin', 'manager']}>
            <UserManagement />
          </RoleBasedGuard>
        } />
        <Route path="/analytics" element={
          <RoleBasedGuard allowedRoles={['admin', 'manager', 'marketing']}>
            <Analytics />
          </RoleBasedGuard>
        } />
        <Route path="/scheduler" element={
          <RoleBasedGuard allowedRoles={['admin', 'manager', 'marketing']}>
            <Scheduler />
          </RoleBasedGuard>
        } />
        <Route path="/scheduler-settings" element={
          <RoleBasedGuard allowedRoles={['admin', 'manager', 'marketing']}>
            <SchedulerSettings />
          </RoleBasedGuard>
        } />
        <Route path="/documentation" element={
          <RequireAuth>
            <Documentation />
          </RequireAuth>
        } />
        <Route path="/integration" element={
          <RoleBasedGuard allowedRoles={['admin', 'manager']}>
            <Integration />
          </RoleBasedGuard>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </QueryPerformanceProvider>
  );
}

function AppWithProviders() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppWithProviders;
