
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarContent from "./sidebar/SidebarContent";
import SidebarFooter from "./sidebar/SidebarFooter";
import { useSidebarNavigation } from "./sidebar/useSidebarNavigation";
import { getNavigationSections } from "./sidebar/navigationConfig";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AppSidebar = () => {
  const { profile, user } = useAuth();
  const { expanded, toggleExpanded, isDarkMode, toggleDarkMode, checkIsActive, sidebarPosition } = useSidebarNavigation();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  // Handle initial mount animation
  useEffect(() => {
    // Add a delay to ensure CSS transitions work properly
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);
  
  // Profile info
  const userInitials = profile?.first_name && profile?.last_name 
    ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`
    : user?.email ? user.email.substring(0, 2).toUpperCase() 
    : "??";
    
  const displayName = profile?.first_name && profile?.last_name
    ? `${profile.first_name} ${profile.last_name}`
    : user?.email || "المستخدم";
    
  const displayRole = profile?.role || "مستخدم";
  
  const navigationSections = getNavigationSections();

  // Custom wrapper for sidebar items with tooltips
  const SidebarItemWrapper = ({ children, title, isExpanded }: { 
    children: React.ReactNode; 
    title: string;
    isExpanded: boolean;
  }) => {
    if (isExpanded) {
      return <>{children}</>;
    }
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent side={isRTL ? "left" : "right"} className="text-xs py-1 px-2">
            {title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  return (
    <motion.div 
      className={cn(
        "fixed h-screen z-30 flex flex-col",
        "border-white/10 overflow-hidden",
        "bg-gradient-to-b from-[#3a7a89] via-[#317683] to-[#276070]",
        "bg-opacity-95 backdrop-blur-md shadow-xl",
        sidebarPosition === "left" ? "left-0 border-r" : "right-0 border-l",
        !mounted && "opacity-0"
      )}
      initial={false}
      animate={{
        width: expanded ? "16rem" : "4.5rem",
        transition: { 
          duration: 0.3,
          ease: "easeInOut"
        }
      }}
    >
      <SidebarHeader 
        expanded={expanded} 
        toggleExpanded={toggleExpanded} 
      />
      
      <SidebarContent 
        navigationSections={navigationSections} 
        expanded={expanded} 
        checkIsActive={checkIsActive} 
        activePath={activePath}
        SidebarItemWrapper={SidebarItemWrapper}
      />
      
      <SidebarFooter 
        expanded={expanded}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        displayName={displayName}
        displayRole={displayRole}
        userInitials={userInitials}
        avatarUrl={profile?.avatar_url}
      />
    </motion.div>
  );
};

export default AppSidebar;
