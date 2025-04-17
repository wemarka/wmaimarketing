
import React, { useEffect } from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import PageTransition from "./PageTransition";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useSidebarStore } from "@/stores/sidebarStore";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
  fluid?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fluid = false }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  const { expanded, sidebarPosition } = useSidebarStore();

  // Set RTL direction based on language
  useEffect(() => {
    document.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language || "ar";
  }, [isRTL, i18n.language]);

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AppSidebar />
      
      <div className={cn(
        "transition-all duration-300 ease-in-out min-h-screen flex flex-col",
        expanded 
          ? sidebarPosition === "left" ? "ml-64" : "mr-64" 
          : sidebarPosition === "left" ? "ml-[4.5rem]" : "mr-[4.5rem]",
      )}>
        <Header />
        
        <motion.main
          className={cn(
            "flex-1 pb-8",
            fluid ? "container-fluid px-4" : "container px-4 md:px-8"
          )}
          key={isRTL ? "rtl" : "ltr"}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
        >
          <PageTransition>
            {children}
          </PageTransition>
        </motion.main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Layout;
