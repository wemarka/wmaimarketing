
import React from "react";
import { SidebarFooter as Footer } from "@/components/ui/sidebar";
import UserProfile from "./UserProfile";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface SidebarFooterProps {
  expanded: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ expanded }) => {
  const { profile, user } = useAuth();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
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
    </motion.div>
  );
};

export default SidebarFooter;
