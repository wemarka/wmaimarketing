
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  compact?: boolean;
  currentPath?: string;
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({ 
  title, 
  items, 
  compact = false, 
  currentPath = "" 
}) => {
  // Animation variants for staggered children
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={cn(
        "text-beauty-purple/80 font-medium",
        compact && "text-xs px-1"
      )}>
        {title}
      </SidebarGroupLabel>
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
                  {({ isActive }) => {
                    // Consider both NavLink active state and direct path comparison
                    const active = isActive || currentPath === item.to;
                    
                    return compact ? (
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              isActive={active}
                              variant={item.variant}
                              className={cn(
                                "flex justify-center", 
                                item.className, 
                                "transition-all duration-300 rounded-lg",
                                active 
                                  ? "bg-beauty-purple/15 dark:bg-beauty-purple/30 shadow-sm" 
                                  : "hover:bg-beauty-purple/10 dark:hover:bg-beauty-purple/20"
                              )}
                            >
                              <span className={cn(
                                "transition-all text-center",
                                active 
                                  ? "text-beauty-purple scale-110" 
                                  : "text-muted-foreground group-hover:text-beauty-purple/80"
                              )}>
                                {item.icon}
                              </span>
                              {item.badgeText && (
                                <Badge 
                                  variant={item.badgeVariant as any || "outline"} 
                                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                                >
                                  {item.badgeText.substring(0, 1)}
                                </Badge>
                              )}
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{item.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={item.tooltip}
                        variant={item.variant}
                        className={cn(
                          item.className, 
                          "transition-all duration-300 rounded-lg",
                          active 
                            ? "bg-beauty-purple/15 dark:bg-beauty-purple/30 shadow-sm" 
                            : "hover:bg-beauty-purple/10 dark:hover:bg-beauty-purple/20"
                        )}
                      >
                        <span className={cn(
                          "transition-all",
                          active 
                            ? "text-beauty-purple scale-110" 
                            : "text-muted-foreground group-hover:text-beauty-purple/80"
                        )}>
                          {item.icon}
                        </span>
                        <span className={cn(
                          "mr-2 transition-all",
                          active ? "font-medium text-beauty-purple" : "font-normal"
                        )}>
                          {item.label}
                        </span>
                        {item.badgeText && (
                          <Badge 
                            variant={item.badgeVariant as any || "outline"} 
                            className={cn(
                              "mr-auto text-xs",
                              !item.badgeVariant && (
                                active 
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
                  }
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
