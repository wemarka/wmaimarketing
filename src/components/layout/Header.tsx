
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HeaderTitle from "./header/HeaderTitle";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import UserMenu from "./header/UserMenu";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { getPageTitle } = useHeaderNavigation();

  useEffect(() => {
    setMounted(true);
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format date for compact display
  const formattedDate = new Intl.DateTimeFormat(isRTL ? 'ar-SA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(currentTime);

  return (
    <motion.div 
      className="flex flex-col sticky top-0 z-40" 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
    >
      <header className="bg-gradient-to-r from-[#3a7a89] via-[#4a8a99] to-[#5a9aa9] px-6 py-4 text-white shadow-lg" dir={isRTL ? "rtl" : "ltr"}>
        <div className="flex items-center justify-between">
          {/* Left section: Page title */}
          <div className="flex items-center">
            <HeaderTitle getPageTitle={getPageTitle} />
            <span className="text-sm text-white/70 ml-4 hidden md:inline-block">
              {formattedDate}
            </span>
          </div>
          
          {/* Center section: Search */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4">
            <div className={cn(
              "relative w-full",
              isRTL ? "ml-auto" : "mr-auto"
            )}>
              <Search className={cn(
                "absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70",
                isRTL ? "right-3" : "left-3"
              )} />
              <Input 
                placeholder="بحث..." 
                className={cn(
                  "bg-white/10 border-none text-white placeholder:text-white/50 h-9",
                  isRTL ? "pr-10" : "pl-10",
                  "focus-visible:ring-white/30"
                )}
              />
            </div>
          </div>
          
          {/* Right section: User menu */}
          <div>
            <UserMenu />
          </div>
        </div>
      </header>
    </motion.div>
  );
};

export default Header;
