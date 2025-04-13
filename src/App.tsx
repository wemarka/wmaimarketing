
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ImageUpload from "./pages/ImageUpload";
import AdGenerator from "./pages/AdGenerator";
import ContentCreator from "./pages/ContentCreator";
import VideoGenerator from "./pages/VideoGenerator";
import Scheduler from "./pages/Scheduler";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/image-upload" element={<ImageUpload />} />
          <Route path="/ad-generator" element={<AdGenerator />} />
          <Route path="/content-creator" element={<ContentCreator />} />
          <Route path="/video-generator" element={<VideoGenerator />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
