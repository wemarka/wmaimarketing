
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Switch } from "@/components/ui/switch";

const AppSidebar = () => {
  const { profile, user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  // Navigation groups with dropdown items
  const navigation = [
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

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <Sidebar variant="inset" className="border-r">
      <SidebarContent className={cn(
        "flex flex-col py-6 transition-all duration-300 bg-white",
        expanded ? "items-start px-5" : "items-center px-2"
      )}>
        {/* Logo and company info */}
        <div className={cn(
          "flex items-center mb-8 w-full",
          expanded ? "justify-between" : "justify-center"
        )}>
          {expanded ? (
            <div className="flex items-center">
              <div className="bg-white rounded-lg border border-blue-200 p-2 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/4e8f9347-a119-4c61-b2c3-d97ad429f0db.png" 
                  alt="Softtech" 
                  className="h-6 w-6" 
                />
              </div>
              <div className="ml-3">
                <h3 className="text-base font-semibold text-gray-800">Softtech</h3>
                <span className="text-xs text-gray-500">Technology</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-blue-200 p-2 flex items-center justify-center">
              <img 
                src="/lovable-uploads/4e8f9347-a119-4c61-b2c3-d97ad429f0db.png" 
                alt="Softtech" 
                className="h-6 w-6" 
              />
            </div>
          )}
          
          {!isMobile && (
            <button 
              onClick={toggleExpanded}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
            >
              <ChevronRight className={cn("h-5 w-5 transition-transform", expanded ? "" : "rotate-180")} />
            </button>
          )}
        </div>
        
        <ScrollArea className="flex-1 w-full">
          {/* Navigation Groups */}
          {navigation.map((group) => (
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
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
        
        {/* Dark mode toggle */}
        {expanded ? (
          <div className="mt-auto pt-4 px-3 flex items-center">
            <Sun className="h-4 w-4 text-gray-500" />
            <Switch 
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
              className="mx-2"
            />
            <Moon className="h-4 w-4 text-gray-500" />
          </div>
        ) : (
          <div className="mt-auto pt-4">
            <Switch 
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
        )}
      </SidebarContent>
      
      <SidebarFooter className={cn(
        "py-4 border-t", 
        expanded ? "px-5" : "px-2 justify-center"
      )}>
        <div className={cn(
          "flex items-center",
          expanded ? "justify-start space-x-3" : "justify-center"
        )}>
          <Avatar className="h-10 w-10 border-2 border-white">
            <img
              src={profile?.avatar_url || "https://github.com/shadcn.png"}
              alt="User Avatar"
              className="object-cover"
            />
          </Avatar>
          
          {expanded && (
            <div className="flex flex-col">
              <span className="font-medium text-sm">
                {profile ? `${profile.first_name} ${profile.last_name}` : "John Wilson"}
              </span>
              <span className="text-xs text-gray-500">
                {user?.email || "Wilson@gmail.com"}
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
