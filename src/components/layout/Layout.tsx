
import React, { useEffect } from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { cn } from "@/lib/utils";
import MobileNavbar from "./MobileNavbar";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");
  
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
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <AppSidebar />
      <div className={cn(
        "flex-1 flex flex-col",
        isMobile ? "mr-0" : "mr-0 md:mr-[70px] lg:mr-64"
      )}>
        <Header />
        <main className={cn(
          "flex-1 p-4 md:p-6",
          location.pathname === "/dashboard" && "bg-gray-50 dark:bg-gray-900"
        )}>
          {children}
        </main>
      </div>
      {isMobile && <MobileNavbar />}
    </div>
  );
};

export default Layout;
