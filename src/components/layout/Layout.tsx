
import React, { useEffect, useState } from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { cn } from "@/lib/utils";
import MobileNavbar from "./MobileNavbar";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>("dashboard");
  
  // Listen for tab change events from the header
  useEffect(() => {
    // This function will handle the custom event
    const handleTabChange = (event: CustomEvent) => {
      if (event.detail && event.detail.tab) {
        setActiveDashboardTab(event.detail.tab);
        // Dispatch another event that the Dashboard component can listen to
        window.dispatchEvent(new CustomEvent('dashboard-tab-change', { 
          detail: { tab: event.detail.tab }
        }));
      }
    };

    // Add event listener
    window.addEventListener('header-tab-change' as any, handleTabChange as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('header-tab-change' as any, handleTabChange as EventListener);
    };
  }, []);
  
  // Handle theme based on system preference or stored value
  useEffect(() => {
    // Check if theme is stored in local storage
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Apply dark mode if stored as dark or if system preference is dark and no stored preference
    if (storedTheme === "dark" || (prefersDark && !storedTheme)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] dark:bg-[#1e2a36]">
      <AppSidebar />
      
      <motion.div 
        className={cn(
          "flex-1 flex flex-col",
          isMobile ? "mr-0" : "ml-16 lg:ml-16"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Header />
        <main className={cn(
          "flex-1 p-4 md:p-6",
          location.pathname === "/dashboard" && "bg-white/5 backdrop-blur-sm dark:bg-slate-900/5"
        )}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={location.pathname + activeDashboardTab}
              className="bg-white dark:bg-slate-900/90 rounded-2xl shadow-xl overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
      
      {isMobile && <MobileNavbar />}
    </div>
  );
};

export default Layout;
