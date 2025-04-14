
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

const AppSidebar = () => {
  const { t } = useTranslation();
  const { 
    mainNavItems, 
    mediaNavItems, 
    managementItems, 
    documentationItems 
  } = useNavigationItems();

  return (
    <Sidebar variant="inset">
      <SidebarHeader />
      
      <SidebarContent>
        <ScrollArea>
          <SidebarNavGroup 
            title={t("sidebar.groups.main")} 
            items={mainNavItems} 
          />

          <SidebarSeparator />
          
          <SidebarNavGroup 
            title={t("sidebar.groups.mediaAnalytics")} 
            items={mediaNavItems} 
          />

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
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
