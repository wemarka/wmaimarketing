
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { SidebarProvider, SidebarRail, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavbar from "./MobileNavbar";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        className={cn(
          "p-3 rounded-full border shadow-md transition-all duration-300",
          state === "expanded" 
            ? "bg-beauty-purple text-white border-beauty-purple/50" 
            : "bg-beauty-purple/10 text-beauty-purple border-beauty-purple/20"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
      >
        {state === "expanded" ? "✕" : "☰"}
      </motion.button>
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="h-10 w-10 animate-spin text-beauty-purple" />
        </motion.div>
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={window.location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
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
