
import React from "react";
import { cn } from "@/lib/utils";
import SidebarNavItem from "./SidebarNavItem";

interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface SidebarNavSectionProps {
  title: string;
  items: NavItem[];
  expanded: boolean;
  checkIsActive: (path: string) => boolean;
}

const SidebarNavSection: React.FC<SidebarNavSectionProps> = ({
  title,
  items,
  expanded,
  checkIsActive
}) => {
  return (
    <div className="w-full flex flex-col">
      {expanded && (
        <h3 className="px-4 mb-2 text-xs font-medium text-white/60 uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1 w-full">
        {items.map((item) => (
          <SidebarNavItem
            key={item.id}
            to={item.to}
            icon={item.icon}
            label={item.label}
            expanded={expanded}
            checkIsActive={checkIsActive}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarNavSection;
