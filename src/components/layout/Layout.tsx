
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { SidebarProvider, SidebarRail, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavbar from "./MobileNavbar";
import { AuthContext } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [authAvailable, setAuthAvailable] = useState<boolean>(false);
  
  // Check for auth context availability in a safer way
  useEffect(() => {
    try {
      // This is just to check if we can access the AuthContext
      const context = React.useContext(AuthContext);
      setAuthAvailable(!!context);
    } catch (error) {
      console.error("Auth context not available:", error);
      setAuthAvailable(false);
    }
  }, []);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background">
        {authAvailable && <AppSidebar />}
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
