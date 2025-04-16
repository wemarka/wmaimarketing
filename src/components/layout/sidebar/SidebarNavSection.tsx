
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
    <div className="mb-4">
      {expanded && (
        <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
      )}
      <div className="space-y-1">
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
