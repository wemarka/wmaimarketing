
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useNavigationItems } from "./sidebar/useNavigationItems";
import SidebarNavGroup from "./sidebar/SidebarNavGroup";
import SidebarHeader from "./sidebar/SidebarHeader";
import ThemeToggle from "./sidebar/ThemeToggle";
import SidebarFooter from "./sidebar/SidebarFooter";
import { useLocation } from "react-router-dom";

const AppSidebar = () => {
  const { profile } = useAuth();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
  // Get navigation items based on user role
  const { 
    mainNavItems, 
    mediaNavItems, 
    productItems, 
    managementItems,
    documentationItems 
  } = useNavigationItems();
  
  useEffect(() => {
    // Auto collapse sidebar on mobile
    if (isMobile) {
      setExpanded(false);
    }
  }, [isMobile]);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Apply dark mode class to document if needed
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  return (
    <Sidebar variant="inset" className="border-r">
      <SidebarContent className={cn(
        "flex flex-col py-6 transition-all duration-300 bg-white",
        expanded ? "items-start px-5" : "items-center px-2"
      )}>
        {/* Logo and company info */}
        <SidebarHeader 
          expanded={expanded} 
          toggleExpanded={toggleExpanded} 
          isMobile={isMobile} 
        />
        
        <ScrollArea className="flex-1 w-full">
          {/* Main Navigation Group */}
          <SidebarNavGroup
            title="الرئيسية"
            items={mainNavItems}
            compact={!expanded}
            currentPath={location.pathname}
          />
          
          {/* Media & Marketing Navigation Group */}
          <SidebarNavGroup
            title="الوسائط والتسويق"
            items={mediaNavItems}
            compact={!expanded}
            currentPath={location.pathname}
          />
          
          {/* Products Navigation Group */}
          <SidebarNavGroup
            title="المنتجات"
            items={productItems}
            compact={!expanded}
            currentPath={location.pathname}
          />
          
          {/* Management Navigation Group */}
          <SidebarNavGroup
            title="الإدارة"
            items={managementItems}
            compact={!expanded}
            currentPath={location.pathname}
          />
          
          {/* Documentation Navigation Group */}
          <SidebarNavGroup
            title="المستندات"
            items={documentationItems}
            compact={!expanded}
            currentPath={location.pathname}
          />
        </ScrollArea>
        
        {/* Dark mode toggle */}
        <ThemeToggle 
          expanded={expanded}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </SidebarContent>
      
      <SidebarFooter expanded={expanded} />
    </Sidebar>
  );
};

export default AppSidebar;
