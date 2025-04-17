
import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import CompactHeader from "./header/CompactHeader";
import CompactUserInfo from "./header/CompactUserInfo";

interface HeaderProps {
  bgColor?: string;
}

const Header: React.FC<HeaderProps> = ({ bgColor }) => {
  const { i18n } = useTranslation();
  const { profile } = useAuth();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  return (
    <header className={cn(
      "sticky top-0 z-20 w-full border-b border-white/10",
      bgColor || "bg-[#3a7a89] text-white",
      "transition-colors duration-300 ease-in-out"
    )}>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <CompactHeader 
          showSidebarTrigger={true}
          pageTitle="Circle"
        />
        
        <CompactUserInfo />
      </div>
    </header>
  );
};

export default Header;
