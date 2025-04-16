
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HeaderActions from "./header/HeaderActions";
import HeaderTitle from "./header/HeaderTitle";
import SearchBar from "./header/SearchBar";
import DynamicNavigationMenu from "./header/DynamicNavigationMenu";
import { useHeaderNavigation } from "./header/useHeaderNavigation";

const Header: React.FC = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
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
  }, []);

  const topRowAnimation = {
    initial: {
      opacity: 0,
      y: isRTL ? 10 : -10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.4,
      delay: 0.2,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  };

  const navigationAnimation = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.4,
      delay: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
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
          <motion.div className="flex items-center justify-between" {...topRowAnimation}>
            <HeaderTitle getPageTitle={getPageTitle} />
            <HeaderActions isRTL={isRTL} />
          </motion.div>

          <motion.div {...navigationAnimation}>
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
