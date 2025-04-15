
import React, { useState, useEffect } from "react";
import { 
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarFooter from "./sidebar/SidebarFooter";
import SidebarNavGroup from "./sidebar/SidebarNavGroup";
import { useNavigationItems } from "./sidebar/useNavigationItems";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const { 
    mainNavItems, 
    mediaNavItems, 
    managementItems, 
    documentationItems,
    productItems
  } = useNavigationItems();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  // Format time for Arabic locale
  const formattedTime = currentTime.toLocaleTimeString('ar-SA', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <Sidebar variant="inset">
      <SidebarHeader />
      
      <SidebarContent>
        {/* Time display */}
        <motion.div 
          className="px-4 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={cn(
            "text-center p-2 rounded-lg",
            "bg-gradient-to-r from-beauty-purple/20 to-beauty-pink/20",
            "text-beauty-purple dark:text-beauty-lightpurple text-sm font-medium",
            "border border-beauty-purple/10 shadow-sm"
          )}>
            {formattedTime}
          </div>
        </motion.div>
        
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="pb-8" // Add bottom padding for better scroll experience
          >
            <SidebarNavGroup 
              title={t("sidebar.groups.main")} 
              items={mainNavItems} 
            />

            <SidebarSeparator />
            
            <SidebarNavGroup 
              title={t("sidebar.groups.mediaAnalytics")} 
              items={mediaNavItems} 
            />

            {productItems.length > 0 && (
              <>
                <SidebarSeparator />
                <SidebarNavGroup 
                  title={t("sidebar.groups.products")} 
                  items={productItems} 
                />
              </>
            )}

            {profile?.role === 'admin' || profile?.role === 'manager' ? (
              <>
                <SidebarSeparator />
                
                <SidebarNavGroup 
                  title={t("sidebar.groups.management")} 
                  items={managementItems} 
                />
              </>
            ) : null}

            <SidebarSeparator />
            
            <SidebarNavGroup 
              title={t("sidebar.groups.documentation")} 
              items={documentationItems} 
            />
          </motion.div>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
