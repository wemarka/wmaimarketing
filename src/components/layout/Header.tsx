
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HeaderActions from "./header/HeaderActions";
import HeaderTitle from "./header/HeaderTitle";
import SearchBar from "./header/SearchBar";
import DynamicNavigationMenu from "./header/DynamicNavigationMenu";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import HeaderGreeting from "./header/HeaderGreeting";

const Header: React.FC = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const {
    activeTab,
    activeSubTab,
    handleTabChange,
    handleSubTabClick,
    getPageTitle,
    getCurrentSubTabs,
    mainNavItems
  } = useHeaderNavigation();

  useEffect(() => {
    setMounted(true);
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "صباح الخير";
    if (hour < 18) return "مساء الخير";
    return "مساء الخير";
  };
  
  return (
    <motion.div 
      className="flex flex-col sticky top-0 z-40" 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
    >
      <header className="bg-gradient-to-r from-[#3a7a89] via-[#4a8a99] to-[#5a9aa9] px-6 py-4 text-white shadow-lg" dir={isRTL ? "rtl" : "ltr"}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HeaderTitle getPageTitle={getPageTitle} />
              <HeaderGreeting currentTime={currentTime} greeting={getGreeting()} />
            </div>
            <HeaderActions isRTL={isRTL} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <DynamicNavigationMenu 
              mainNavItems={mainNavItems}
              currentSubTabs={getCurrentSubTabs()}
              activeTab={activeTab}
              activeSubTab={activeSubTab}
              onTabChange={handleTabChange}
              onSubTabChange={handleSubTabClick}
              isRTL={isRTL}
            />
          </motion.div>
        </div>
      </header>
    </motion.div>
  );
};

export default Header;
