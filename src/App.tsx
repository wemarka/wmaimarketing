
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import VideoGenerator from "./pages/VideoGenerator";
import Analytics from "./pages/Analytics";
import Scheduler from "./pages/Scheduler";
import ContentTools from "./pages/ContentTools";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/image-upload" element={<ImageUpload />} />
          <Route path="/content-creator" element={<ContentCreator />} />
          <Route path="/ad-generator" element={<AdGenerator />} />
          <Route path="/video-generator" element={<VideoGenerator />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/content-tools" element={<ContentTools />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
