
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useTranslation } from "react-i18next";
import {
  Sidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import SidebarNavContent from "./sidebar/SidebarContent";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomSidebarHeader from "./sidebar/SidebarHeader";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const AppSidebar = () => {
  const { i18n } = useTranslation();
  const { profile } = useAuth();
  const expanded = useSidebarStore((state) => state.expanded);
  const toggleExpanded = useSidebarStore((state) => state.toggleExpanded);
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  const sidebarVariants = {
    expanded: {
      width: "260px",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    collapsed: {
      width: "80px",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial={false}
      animate={expanded ? "expanded" : "collapsed"}
      className={cn(
        "z-50 min-h-screen fixed shadow-lg",
        isRTL ? "right-0" : "left-0"
      )}
    >
      <Sidebar 
        className="bg-[#3a7a89] text-white border-r-0 h-full transition-all duration-300" 
        side={isRTL ? "right" : "left"}
      >
        <ShadcnSidebarHeader>
          <CustomSidebarHeader 
            expanded={expanded} 
            toggleExpanded={toggleExpanded} 
          />
        </ShadcnSidebarHeader>
        
        <ShadcnSidebarContent className="custom-scrollbar">
          <SidebarNavContent 
            expanded={expanded}
            activePath={useSidebarStore(state => state.activePath)}
          />
        </ShadcnSidebarContent>

        <SidebarFooter className="p-4 border-t border-white/10">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-white/10",
              isRTL && "flex-row-reverse"
            )}
          >
            <Settings className={cn("h-5 w-5", !expanded && "mx-auto")} />
            {expanded && <span>{isRTL ? "الإعدادات" : "Settings"}</span>}
          </Button>
        </SidebarFooter>
      </Sidebar>
    </motion.div>
  );
};

export default AppSidebar;
