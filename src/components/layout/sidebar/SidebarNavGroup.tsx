
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
import { motion } from "framer-motion";

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
  // Animation variants for staggered children
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-beauty-purple/80 font-medium">{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuItem key={item.id}>
              <motion.div 
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="w-full"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
              >
                <NavLink to={item.to} className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.tooltip}
                      variant={item.variant}
                      className={cn(
                        item.className, 
                        "transition-all duration-300 rounded-lg",
                        isActive 
                          ? "bg-beauty-purple/15 dark:bg-beauty-purple/30 shadow-sm" 
                          : "hover:bg-beauty-purple/10 dark:hover:bg-beauty-purple/20"
                      )}
                    >
                      <span className={cn(
                        "transition-all",
                        isActive 
                          ? "text-beauty-purple scale-110" 
                          : "text-muted-foreground group-hover:text-beauty-purple/80"
                      )}>{item.icon}</span>
                      <span className={cn(
                        "mr-2 transition-all",
                        isActive ? "font-medium text-beauty-purple" : "font-normal"
                      )}>{item.label}</span>
                      {item.badgeText && (
                        <Badge 
                          variant={item.badgeVariant as any || "outline"} 
                          className={cn(
                            "mr-auto text-xs",
                            !item.badgeVariant && (
                              isActive 
                                ? "bg-beauty-purple/15 text-beauty-purple hover:bg-beauty-purple/20 border border-beauty-purple/20" 
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
              </motion.div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNavGroup;
