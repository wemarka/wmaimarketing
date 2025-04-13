
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Dashboard and Content Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/content-creator" element={<ContentCreator />} />
            <Route path="/content-tools" element={<ContentTools />} />
            
            {/* Media Routes */}
            <Route path="/image-upload" element={<ImageUpload />} />
            <Route path="/video-generator" element={<VideoGenerator />} />
            
            {/* Ad Routes */}
            <Route path="/ad-generator" element={<AdGenerator />} />
            <Route path="/ad-designer" element={<AdDesigner />} />
            
            {/* Management Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<UserManagement />} />
            
            {/* Analytics and Planning Routes */}
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/scheduler-settings" element={<SchedulerSettings />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/integration" element={<Integration />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
