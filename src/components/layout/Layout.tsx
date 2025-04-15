
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { SidebarProvider, SidebarRail, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavbar from "./MobileNavbar";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

// SidebarToggleIndicator component
const SidebarToggleIndicator = () => {
  const { state, toggleSidebar } = useSidebar();
  
  return (
    <motion.div 
      className="fixed top-4 right-4 z-50 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <button
        className="p-2 rounded-full bg-beauty-purple/10 text-beauty-purple border border-beauty-purple/20"
        onClick={toggleSidebar}
      >
        {state === "expanded" ? "✕" : "☰"}
      </button>
    </motion.div>
  );
};

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get auth state
  const auth = useAuth();
  const authAvailable = !!auth.user;
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Short delay for smoother transition
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-beauty-purple" />
      </div>
    );
  }
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background">
        {authAvailable && <AppSidebar />}
        <SidebarRail />
        
        <SidebarInset>
          <div className="flex flex-col flex-1">
            <Header />
            <motion.main 
              className="flex-1 p-4 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.main>
            {isMobile && <MobileNavbar />}
          </div>
        </SidebarInset>
        
        {/* Mobile sidebar toggle indicator */}
        {authAvailable && isMobile && <SidebarToggleIndicator />}
      </div>
    </SidebarProvider>
  );
};

export default Layout;
