
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import UserMenu from "./header/UserMenu";
import NotificationsPopover from "./header/NotificationsPopover";
import SearchBar from "./header/SearchBar";
import { useAuth } from "@/context/AuthContext";
import CompactHeader from "./header/CompactHeader";
import TeamMembers from "./header/TeamMembers";
import { useMediaQuery } from "@/hooks/use-media-query";

const Header: React.FC = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const { profile } = useAuth();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const [notificationCount, setNotificationCount] = useState(3);
  
  // Sample team members data
  const teamMembers = [
    { name: "أحمد محمد", avatar: null, initials: "أم" },
    { name: "سارة علي", avatar: null, initials: "سع" },
    { name: "محمد خالد", avatar: null, initials: "مخ" }
  ];
  
  // Handle notification interactions
  const handleNotificationClick = () => {
    setNotificationCount(0);
  };
  
  // Get page title based on pathname
  const getPageTitle = () => {
    if (location.pathname === "/dashboard") return "لوحة التحكم";
    if (location.pathname === "/dashboard/performance") return "الأداء";
    if (location.pathname === "/dashboard/interactions") return "التفاعلات";
    return "سيركل";
  };
  
  // Background color
  const isDashboard = location.pathname === "/dashboard" || 
                       location.pathname === "/dashboard/performance" || 
                       location.pathname === "/dashboard/interactions";
  
  return (
    <header
      className={cn(
        "sticky top-0 z-20 w-full border-b border-white/10",
        "bg-[#3a7a89] text-white",
        "transition-colors duration-300 ease-in-out",
        isDashboard && "bg-gradient-to-r from-[#3a7a89] to-[#2d6270]"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Header left side */}
        <div className="flex items-center gap-4">
          <CompactHeader 
            showSidebarTrigger={isMobile}
            pathname={location.pathname}
            pageTitle={getPageTitle()}
            notificationCount={notificationCount}
            onNotificationClick={handleNotificationClick}
          />
        </div>
        
        {/* Header right side */}
        <div className="flex items-center gap-3">
          <SearchBar />
          
          {!isMobile && profile?.role === "admin" && (
            <TeamMembers members={teamMembers} />
          )}
          
          <NotificationsPopover 
            notificationCount={notificationCount}
            onNotificationClick={handleNotificationClick}
          />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
