
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/use-media-query";
import { navigationItems, NavigationGroup } from "./sidebar/SidebarNavItems";
import SidebarHeader from "./sidebar/SidebarHeader";
import ThemeToggle from "./sidebar/ThemeToggle";
import UserProfile from "./sidebar/UserProfile";

const AppSidebar = () => {
  const { profile, user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

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
          {/* Navigation Groups */}
          {navigationItems.map((group) => (
            <NavigationGroup
              key={group.id}
              group={group}
              expanded={expanded}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          ))}
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
