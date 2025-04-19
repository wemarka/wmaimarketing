
import React from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebarStore";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const expanded = useSidebarStore((state) => state.expanded);

  return (
    <div className={cn(
      "flex min-h-screen w-full",
      isRTL ? "flex-row-reverse" : ""
    )}>
      <AppSidebar />
      <motion.div 
        className="w-full"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <SidebarInset className="w-full transition-all duration-300">
          <Header />
          <main className="p-4 md:p-6">{children}</main>
        </SidebarInset>
      </motion.div>
    </div>
  );
};

export default Layout;
