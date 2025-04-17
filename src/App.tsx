
import { useEffect, Suspense, lazy } from 'react';
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

// استخدام React.lazy لتطبيق Code Splitting
// Pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Documentation = lazy(() => import("./pages/Documentation"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const ImageUpload = lazy(() => import("./pages/ImageUpload"));
const ContentCreator = lazy(() => import("./pages/ContentCreator"));
const AdGenerator = lazy(() => import("./pages/AdGenerator"));
const AdDesigner = lazy(() => import("./pages/AdDesigner"));
const VideoGenerator = lazy(() => import("./pages/VideoGenerator"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Scheduler = lazy(() => import("./pages/Scheduler"));
const SchedulerSettings = lazy(() => import("./pages/SchedulerSettings"));
const ContentTools = lazy(() => import("./pages/ContentTools"));
const Integration = lazy(() => import("./pages/Integration"));
const AIStudio = lazy(() => import("./pages/AIStudio"));
const AdContentGenerator = lazy(() => import("./pages/AdContentGenerator"));
const NotificationCenter = lazy(() => import("./pages/NotificationCenter"));

// Dashboard specific pages
const DashboardPerformance = lazy(() => import("@/pages/dashboard/Performance"));
const DashboardInteractions = lazy(() => import("@/pages/dashboard/Interactions"));

// Marketing specific pages
const MarketingCampaigns = lazy(() => import("@/pages/marketing/Campaigns"));
const MarketingAudience = lazy(() => import("@/pages/marketing/Audience"));
const MarketingInsights = lazy(() => import("@/pages/marketing/Insights"));

// Content specific pages
const ContentPosts = lazy(() => import("@/pages/content/Posts"));
const ContentImages = lazy(() => import("@/pages/content/Images"));
const ContentVideos = lazy(() => import("@/pages/content/Videos"));

// Analytics specific pages
const AnalyticsWeekly = lazy(() => import("@/pages/analytics/Weekly"));
const AnalyticsEngagement = lazy(() => import("@/pages/analytics/Engagement"));
const AnalyticsSales = lazy(() => import("@/pages/analytics/Sales"));

// Admin specific pages
const AdminUsers = lazy(() => import("@/pages/admin/Users"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));
const AdminRoles = lazy(() => import("@/pages/admin/Roles"));

// New Module Pages
const GenerateAd = lazy(() => import("./modules/ai-generator/pages/GenerateAd"));
const SchedulePost = lazy(() => import("./modules/marketing/pages/SchedulePost"));
const ProductList = lazy(() => import("./modules/product/pages/ProductList"));
const AddProduct = lazy(() => import("./modules/product/pages/AddProduct"));

// مكون تحميل لاستخدامه مع Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

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
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
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
