
import React from "react";
import { SidebarFooter as Footer } from "@/components/ui/sidebar";
import UserProfile from "./UserProfile";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface SidebarFooterProps {
  expanded: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ expanded }) => {
  const { profile, user } = useAuth();
  
  return (
    <Footer className={cn(
      "py-4 border-t", 
      expanded ? "px-5" : "px-2 justify-center"
    )}>
      <UserProfile 
        expanded={expanded} 
        profile={profile} 
        userEmail={user?.email}
      />
    </Footer>
  );
};

export default SidebarFooter;
