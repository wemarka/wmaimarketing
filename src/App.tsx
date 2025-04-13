
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Index from "./pages/Index";
import ImageUpload from "./pages/ImageUpload";
import AdGenerator from "./pages/AdGenerator";
import ContentCreator from "./pages/ContentCreator";
import VideoGenerator from "./pages/VideoGenerator";
import Scheduler from "./pages/Scheduler";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Documentation from "./pages/Documentation";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/auth" replace />;
};

// Auth route that redirects to home if already logged in
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }
  
  return user ? <Navigate to="/" replace /> : <>{children}</>;
};

// App router with authentication
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/image-upload" element={<ProtectedRoute><ImageUpload /></ProtectedRoute>} />
      <Route path="/ad-generator" element={<ProtectedRoute><AdGenerator /></ProtectedRoute>} />
      <Route path="/content-creator" element={<ProtectedRoute><ContentCreator /></ProtectedRoute>} />
      <Route path="/video-generator" element={<ProtectedRoute><VideoGenerator /></ProtectedRoute>} />
      <Route path="/scheduler" element={<ProtectedRoute><Scheduler /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/documentation" element={<ProtectedRoute><Documentation /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Main App component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
