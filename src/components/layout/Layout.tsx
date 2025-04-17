
import React from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  fluid?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fluid = false }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="relative min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className={cn(
              "flex-1 pb-8",
              fluid ? "container-fluid px-4" : "container px-4 md:px-8"
            )}>
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
