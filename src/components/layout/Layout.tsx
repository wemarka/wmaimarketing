
import React from "react";
import Header from "./Header";
import { SidebarProvider, SidebarRail, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavbar from "./MobileNavbar";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  // We need to wrap the Layout content with error boundary to catch Auth context errors
  // This provides a fallback if the auth context is not available
  const AuthAwareSidebar = () => {
    try {
      // This will throw if AuthProvider is not available
      useAuth();
      return <AppSidebar />;
    } catch (error) {
      console.error("Auth provider not available for sidebar:", error);
      return null;
    }
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background">
        <AuthAwareSidebar />
        <SidebarRail />
        
        <SidebarInset>
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 p-4 md:p-8">
              {children}
            </main>
            <MobileNavbar />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
