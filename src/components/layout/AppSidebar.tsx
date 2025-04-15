
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useNavigationItems } from "./sidebar/useNavigationItems";
import SidebarNavGroup from "./sidebar/SidebarNavGroup";
import SidebarHeader from "./sidebar/SidebarHeader";
import ThemeToggle from "./sidebar/ThemeToggle";
import UserProfile from "./sidebar/UserProfile";

const AppSidebar = () => {
  const { profile, user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const { 
    mainNavItems, 
    mediaNavItems, 
    productItems, 
    managementItems,
    documentationItems 
  } = useNavigationItems();
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
          />
          
          {/* Media & Marketing Navigation Group */}
          <SidebarNavGroup
            title="الوسائط والتسويق"
            items={mediaNavItems}
            compact={!expanded}
          />
          
          {/* Products Navigation Group */}
          <SidebarNavGroup
            title="المنتجات"
            items={productItems}
            compact={!expanded}
          />
          
          {/* Management Navigation Group */}
          <SidebarNavGroup
            title="الإدارة"
            items={managementItems}
            compact={!expanded}
          />
          
          {/* Documentation Navigation Group */}
          <SidebarNavGroup
            title="المستندات"
            items={documentationItems}
            compact={!expanded}
          />
        </ScrollArea>
        
        {/* Dark mode toggle */}
        <ThemeToggle 
          expanded={expanded}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </SidebarContent>
      
      <SidebarFooter className={cn(
        "py-4 border-t", 
        expanded ? "px-5" : "px-2 justify-center"
      )}>
        <UserProfile 
          expanded={expanded} 
          profile={profile} 
          userEmail={user?.email}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
