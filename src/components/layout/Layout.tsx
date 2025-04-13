
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <MobileNavbar />
        <Header />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
