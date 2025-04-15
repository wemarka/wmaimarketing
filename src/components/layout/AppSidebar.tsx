
import React from "react";
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

const AppSidebar = () => {
  const { t } = useTranslation();
  const { 
    mainNavItems, 
    mediaNavItems, 
    managementItems, 
    documentationItems,
    productItems
  } = useNavigationItems();

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

  return (
    <Sidebar variant="inset">
      <SidebarHeader />
      
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
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

            <SidebarSeparator />
            
            <SidebarNavGroup 
              title={t("sidebar.groups.management")} 
              items={managementItems} 
            />

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
