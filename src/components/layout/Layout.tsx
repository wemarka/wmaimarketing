
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <div 
        className={cn(
          "hidden lg:block transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
        )}
      >
        <Sidebar />
      </div>
      
      {!isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-18 left-2 z-20 h-8 w-8 rounded-full bg-background shadow-md"
          onClick={toggleSidebar}
        >
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform",
            sidebarCollapsed ? "rotate-180" : ""
          )} />
        </Button>
      )}
      
      <div className="flex flex-col flex-1">
        <Header />
        <MobileNavbar />
        <main className={cn(
          "flex-1 p-4 md:p-8 transition-all duration-300",
          sidebarCollapsed ? "lg:pr-8" : "lg:pr-4"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
