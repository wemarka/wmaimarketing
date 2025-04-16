
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
import { TooltipProvider } from "@/components/ui/tooltip";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");
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
  
  // Animation setup
  const contentAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: mounted ? 1 : 0 },
    transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 20 }
  };
  
  const childAnimation = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 30 }
  };

  return (
    <TooltipProvider>
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
          style={{
            marginLeft: !isRTL && sidebarPosition === "left" ? (expanded ? "16rem" : "4.5rem") : 0,
            marginRight: isRTL && sidebarPosition === "right" ? (expanded ? "16rem" : "4.5rem") : 0,
            transition: "margin 0.3s ease"
          }}
          {...contentAnimation}
        >
          <Header />
          <main className={cn(
            "flex-1 p-4 md:p-6 transition-all",
            location.pathname === "/dashboard" && "bg-gradient-to-br from-[#3a7a89]/5 to-white/10 dark:bg-slate-900/5"
          )}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={location.pathname}
                className="bg-white/80 dark:bg-slate-900/90 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm"
                {...childAnimation}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </motion.div>
        
        {isMobile && <MobileNavbar />}
      </div>
    </TooltipProvider>
  );
};

export default Layout;
