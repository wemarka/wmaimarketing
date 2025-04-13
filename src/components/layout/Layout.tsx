
import React from "react";
import Header from "./Header";
import { SidebarProvider, SidebarRail, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavbar from "./MobileNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
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
