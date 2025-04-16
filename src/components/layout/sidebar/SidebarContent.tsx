
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarNavSection from "./SidebarNavSection";

interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface NavigationSection {
  title: string;
  items: NavItem[];
}

interface SidebarContentProps {
  navigationSections: NavigationSection[];
  expanded: boolean;
  checkIsActive: (path: string) => boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  navigationSections,
  expanded,
  checkIsActive
}) => {
  return (
    <ScrollArea className="h-[calc(100vh-64px-64px)]">
      <div className="py-2">
        {navigationSections.map((section, idx) => (
          <SidebarNavSection
            key={idx}
            title={section.title}
            items={section.items}
            expanded={expanded}
            checkIsActive={checkIsActive}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default SidebarContent;
