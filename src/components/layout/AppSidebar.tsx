
import React from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarContent from "./sidebar/SidebarContent";
import SidebarFooter from "./sidebar/SidebarFooter";
import { useSidebarNavigation } from "./sidebar/useSidebarNavigation";
import { getNavigationSections } from "./sidebar/navigationConfig";
import { motion, AnimatePresence } from "framer-motion";

const AppSidebar = () => {
  const { profile, user } = useAuth();
  const { expanded, toggleExpanded, isDarkMode, toggleDarkMode, checkIsActive } = useSidebarNavigation();
  
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
    collapsed: { width: "4rem" }
  };
  
  return (
    <motion.div 
      className={cn(
        "fixed left-0 z-30 h-screen bg-gradient-to-b from-[#3a7a89] to-[#2c6c7a] transition-all duration-300 shadow-lg flex flex-col",
      )}
      variants={sidebarVariants}
      initial="collapsed"
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
