import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RequireAuth from "@/components/auth/RequireAuth";
import RoleBasedGuard from "@/components/auth/RoleBasedGuard";
import { QueryPerformanceProvider } from './context/QueryPerformanceProvider';

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

// New Module Pages
import GenerateAd from "./modules/ai-generator/pages/GenerateAd";
import SchedulePost from "./modules/marketing/pages/SchedulePost";
import ProductList from "./modules/product/pages/ProductList";
import AddProduct from "./modules/product/pages/AddProduct";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryPerformanceProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Dashboard and Content Routes */}
              <Route path="/dashboard" element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              } />
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
              
              {/* Protected Media Routes */}
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
              
              {/* Protected Ad Routes */}
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
              
              {/* Notifications */}
              <Route path="/notifications" element={
                <RequireAuth>
                  <NotificationCenter />
                </RequireAuth>
              } />
              
              {/* New Module Routes with Role-Based Protection */}
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
              
              {/* Protected Management Routes */}
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
              
              {/* Protected Analytics and Planning Routes */}
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
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </QueryPerformanceProvider>
  );
}

export default App;
