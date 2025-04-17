
import React from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <SidebarInset className="w-full">
        <Header />
        <main className="p-4">{children}</main>
      </SidebarInset>
    </div>
  );
};

export default Layout;
