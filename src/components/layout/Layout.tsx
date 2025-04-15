
import React from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import MobileNavbar from "./MobileNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className={cn("flex-1 p-4 md:p-6")}>
            {children}
          </main>
        </div>
        <MobileNavbar />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
