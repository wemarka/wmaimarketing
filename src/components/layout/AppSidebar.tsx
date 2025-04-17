
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useTranslation } from "react-i18next";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import SidebarNavContent from "./sidebar/SidebarContent";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomSidebarHeader from "./sidebar/SidebarHeader";

const AppSidebar = () => {
  const { i18n } = useTranslation();
  const { profile } = useAuth();
  const expanded = useSidebarStore((state) => state.expanded);
  const toggleExpanded = useSidebarStore((state) => state.toggleExpanded);
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  return (
    <Sidebar className="bg-[#3a7a89] text-white border-r-0 z-50 min-h-screen">
      <ShadcnSidebarHeader>
        <CustomSidebarHeader 
          expanded={expanded} 
          toggleExpanded={toggleExpanded} 
        />
      </ShadcnSidebarHeader>
      
      <SidebarContent>
        <SidebarNavContent 
          expanded={expanded}
          activePath={useSidebarStore(state => state.activePath)}
        />
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-white/10"
        >
          <Settings className="h-5 w-5" />
          <span>{expanded ? "الإعدادات" : ""}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
