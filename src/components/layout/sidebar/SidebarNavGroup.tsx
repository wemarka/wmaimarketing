
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  badgeText?: string;
  variant?: "default" | "outline";
  className?: string;
}

interface SidebarNavGroupProps {
  title: string;
  items: NavItem[];
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({ title, items }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <NavLink to={item.to} className="w-full">
                {({ isActive }) => (
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.tooltip}
                    variant={item.variant}
                    className={item.className}
                  >
                    <span className={cn(
                      "transition-all",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}>{item.icon}</span>
                    <span className="mr-2">{item.label}</span>
                    {item.badgeText && (
                      <span className="mr-auto bg-beauty-gold/20 text-beauty-gold hover:bg-beauty-gold/30 inline-flex items-center rounded-md border border-transparent px-2 py-0.5 text-xs font-medium">
                        {item.badgeText}
                      </span>
                    )}
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNavGroup;
