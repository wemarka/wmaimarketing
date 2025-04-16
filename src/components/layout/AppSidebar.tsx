
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

const AppSidebar = () => {
  const { profile, user } = useAuth();
  const { expanded, toggleExpanded, isDarkMode, toggleDarkMode, checkIsActive, sidebarPosition } = useSidebarNavigation();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [mounted, setMounted] = useState(false);
  
  // Handle initial mount animation
  useEffect(() => {
    setMounted(true);
    
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
  
  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4.5rem" }
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className={cn(
          "fixed h-screen bg-gradient-to-b transition-colors z-30",
          "from-[#3a7a89] to-[#2c6c7a] shadow-lg flex flex-col",
          "border-white/10 overflow-hidden",
          sidebarPosition === "left" ? "left-0 border-r" : "right-0 border-l",
          !mounted && "opacity-0"
        )}
        variants={sidebarVariants}
        initial={false}
        animate={expanded ? "expanded" : "collapsed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
    </AnimatePresence>
  );
};

export default AppSidebar;
