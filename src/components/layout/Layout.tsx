
import React from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  return (
    <div className={cn(
      "flex min-h-screen w-full",
      isRTL ? "flex-row-reverse" : ""
    )}>
      <AppSidebar />
      <SidebarInset className="w-full">
        <Header />
        <main className="p-4">{children}</main>
      </SidebarInset>
    </div>
  );
};

export default Layout;
