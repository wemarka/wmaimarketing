
import React, { useEffect, useState } from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { cn } from "@/lib/utils";
import MobileNavbar from "./MobileNavbar";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSidebarNavigation } from "./sidebar/useSidebarNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>("dashboard");
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const { sidebarPosition, expanded } = useSidebarNavigation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  // Handle initial mount animation
  useEffect(() => {
    setMounted(true);
    
    // Check HTML document direction
    const htmlDir = document.documentElement.dir || "ltr";
    document.documentElement.dir = htmlDir;
  }, []);

  // Listen for language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);
  
  // Listen for tab change events from the header
  useEffect(() => {
    // This function will handle the custom event
    const handleTabChange = (event: CustomEvent) => {
      if (event.detail && event.detail.tab) {
        setActiveDashboardTab(event.detail.tab);
      }
    };

    // Add event listener
    window.addEventListener('header-tab-change' as any, handleTabChange as EventListener);
    window.addEventListener('dashboard-tab-change' as any, handleTabChange as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('header-tab-change' as any, handleTabChange as EventListener);
      window.removeEventListener('dashboard-tab-change' as any, handleTabChange as EventListener);
    };
  }, []);

  // RTL-aware margin calculation
  const getContentMargin = (): React.CSSProperties => {
    if (isMobile) return {};
    
    const sidebarWidth = expanded ? "16rem" : "4.5rem";
    if (sidebarPosition === "left" && !isRTL) return { marginLeft: sidebarWidth };
    if (sidebarPosition === "right" && !isRTL) return { marginRight: sidebarWidth }; 
    if (sidebarPosition === "left" && isRTL) return { marginRight: sidebarWidth };
    if (sidebarPosition === "right" && isRTL) return { marginLeft: sidebarWidth };
    
    return {};
  };

  // Animation setup
  const contentAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: mounted ? 1 : 0 },
    transition: { duration: 0.5, type: "spring", stiffness: 100, damping: 20 }
  };
  
  const childAnimation = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 30 }
  };

  return (
    <div 
      className={cn(
        "flex min-h-screen w-full overflow-x-hidden transition-colors duration-300",
        "bg-[#f8fafc] dark:bg-[#1e2a36]"
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <AppSidebar />
      
      <motion.div 
        className="flex-1 flex flex-col"
        style={getContentMargin()}
        {...contentAnimation}
      >
        <Header />
        <main className={cn(
          "flex-1 p-4 md:p-6 transition-all",
          location.pathname === "/dashboard" && "bg-gradient-to-br from-[#3a7a89]/5 to-white/20 backdrop-blur-sm dark:bg-slate-900/5"
        )}>
          <AnimatePresence mode="sync">
            <motion.div 
              key={location.pathname + activeDashboardTab}
              className="bg-white dark:bg-slate-900/90 rounded-2xl shadow-xl overflow-hidden"
              {...childAnimation}
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
