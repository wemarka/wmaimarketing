
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
import { Badge } from "@/components/ui/badge";

interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  badgeText?: string;
  badgeVariant?: string;
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
                    className={cn(item.className, "transition-all duration-200 group")}
                  >
                    <span className={cn(
                      "transition-all",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground/80"
                    )}>{item.icon}</span>
                    <span className={cn(
                      "mr-2 transition-all",
                      isActive ? "font-medium" : "font-normal"
                    )}>{item.label}</span>
                    {item.badgeText && (
                      <Badge 
                        variant={item.badgeVariant as any || "outline"} 
                        className={cn(
                          "mr-auto text-xs",
                          !item.badgeVariant && (
                            isActive 
                              ? "bg-primary/10 text-primary hover:bg-primary/20" 
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          )
                        )}
                      >
                        {item.badgeText}
                      </Badge>
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
