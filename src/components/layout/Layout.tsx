
import React from "react";
import AppSidebar from "./AppSidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";
import PageTransition from "./PageTransition";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
  pageType?: "default" | "minimal" | "centered";
  contentClassName?: string;
  navbarBgColor?: string;
  transition?: "fade" | "slide" | "scale" | "none";
}

const Layout: React.FC<LayoutProps> = ({
  children,
  pageType = "default",
  contentClassName = "",
  navbarBgColor,
  transition = "fade"
}) => {
  const isMobile = useIsMobile();
  
  // Classes for the main content area based on page type
  const contentClasses = {
    default: "p-4 md:p-6 lg:p-8",
    minimal: "p-2 md:p-4",
    centered: "p-4 md:p-6 lg:p-8 flex items-center justify-center"
  };

  // Determine the sidebar offset based on the sidebar's state
  const mainContentClass = "flex-1 min-h-screen";
  
  return (
    <div className="min-h-screen w-full flex">
      <AppSidebar />
      <div className={mainContentClass}>
        <Header bgColor={navbarBgColor} />
        <PageTransition type={transition}>
          <main className={`${contentClasses[pageType]} ${contentClassName}`}>
            {children}
          </main>
        </PageTransition>
      </div>
    </div>
  );
};

export default Layout;
