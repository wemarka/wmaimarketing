
import React, { useEffect } from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import MobileNavbar from "./MobileNavbar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className={cn(
            "flex-1 p-4 md:p-6",
            location.pathname === "/dashboard" && "bg-gray-50 dark:bg-gray-900"
          )}>
            {children}
          </main>
        </div>
        <MobileNavbar />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
