
import React from "react";
import { 
  LayoutDashboard, 
  Package,
  Mail,
  FileBox,
  Calendar,
  Activity,
  BarChart,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Navigation groups with dropdown items
export const navigationItems = [
  {
    id: "overview",
    title: "OVERVIEW",
    items: [
      { id: "dashboard", icon: <LayoutDashboard className="h-5 w-5" />, to: "/dashboard", label: "Dashboard", notifications: 0 },
      { id: "products", icon: <Package className="h-5 w-5" />, to: "/products", label: "Products", notifications: 0 },
      { id: "messages", icon: <Mail className="h-5 w-5" />, to: "/messages", label: "Messages", notifications: 2 },
      { id: "order", icon: <FileBox className="h-5 w-5" />, to: "/order", label: "Order", notifications: 0 },
      { id: "calendar", icon: <Calendar className="h-5 w-5" />, to: "/calendar", label: "Calendar", notifications: 0 },
      { id: "activity", icon: <Activity className="h-5 w-5" />, to: "/activity", label: "Activity", notifications: 0 },
      { id: "static", icon: <BarChart className="h-5 w-5" />, to: "/static", label: "Static", notifications: 0 },
    ]
  },
  {
    id: "account",
    title: "ACCOUNT",
    items: [
      { id: "chat", icon: <MessageCircle className="h-5 w-5" />, to: "/chat", label: "Chat", notifications: 0 },
      { id: "settings", icon: <Settings className="h-5 w-5" />, to: "/settings", label: "Settings", notifications: 0 },
      { id: "logout", icon: <LogOut className="h-5 w-5" />, to: "/logout", label: "Log out", notifications: 0 },
    ]
  }
];

interface NavigationItemProps {
  item: {
    id: string;
    icon: React.ReactNode;
    to: string;
    label: string;
    notifications: number;
  };
  expanded: boolean;
  activeItem: string;
  setActiveItem: (id: string) => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ 
  item, 
  expanded, 
  activeItem,
  setActiveItem 
}) => {
  return (
    <TooltipProvider key={item.id} delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center rounded-lg transition-all duration-200 py-2 relative",
                expanded ? "px-3" : "justify-center px-2",
                isActive || activeItem === item.id
                  ? "text-blue-500" 
                  : "text-gray-700 hover:text-gray-900"
              )
            }
            onClick={() => setActiveItem(item.id)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center w-full"
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              
              {expanded && <span className="ml-3 text-sm">{item.label}</span>}
              
              {item.notifications > 0 && (
                <div className="absolute right-3 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                  {item.notifications}
                </div>
              )}
            </motion.div>
          </NavLink>
        </TooltipTrigger>
        {!expanded && (
          <TooltipContent side="right">
            <p>{item.label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

interface NavigationGroupProps {
  group: {
    id: string;
    title: string;
    items: {
      id: string;
      icon: React.ReactNode;
      to: string;
      label: string;
      notifications: number;
    }[];
  };
  expanded: boolean;
  activeItem: string;
  setActiveItem: (id: string) => void;
}

export const NavigationGroup: React.FC<NavigationGroupProps> = ({ 
  group, 
  expanded, 
  activeItem,
  setActiveItem 
}) => {
  return (
    <div key={group.id} className="w-full mb-8">
      {/* Group Title */}
      {expanded && (
        <div className="text-xs text-gray-500 font-medium mb-4 px-2">
          {group.title}
        </div>
      )}
      
      {/* Group Items */}
      <div className="space-y-1 w-full">
        {group.items.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            expanded={expanded}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        ))}
      </div>
    </div>
  );
};
