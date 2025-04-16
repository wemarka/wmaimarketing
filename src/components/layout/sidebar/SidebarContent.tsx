
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import CollapsibleSidebarNav from "./CollapsibleSidebarNav";

interface SectionItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface NavSection {
  title: string;
  items: SectionItem[];
}

interface SidebarContentProps {
  expanded: boolean;
  activePath: string;
  checkIsActive: (path: string) => boolean;
  navigationSections?: NavSection[];
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  expanded,
  activePath,
  checkIsActive,
  navigationSections
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  return (
    <ScrollArea 
      className="h-[calc(100vh-64px-80px)] px-1" 
      scrollHideDelay={750}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="py-4 px-2">
        <CollapsibleSidebarNav expanded={expanded} />
      </div>
    </ScrollArea>
  );
};

export default SidebarContent;
