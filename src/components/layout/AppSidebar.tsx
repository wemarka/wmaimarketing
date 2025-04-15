
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  Search, 
  Hash, 
  Layout, 
  FileText, 
  PlayCircle, 
  Grid,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/use-media-query";

const AppSidebar = () => {
  const { profile, user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [expanded, setExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Navigation groups with dropdown items
  const navigationGroups = [
    {
      id: "main",
      items: [
        { id: "home", icon: <Hash className="h-5 w-5" />, to: "/dashboard", label: "الرئيسية" },
        { id: "notifications", icon: <Bell className="h-5 w-5" />, to: "/notifications", label: "الإشعارات" },
        { id: "search", icon: <Search className="h-5 w-5" />, to: "/search", label: "البحث" },
      ]
    },
    {
      id: "content",
      title: "المحتوى",
      collapsible: true,
      items: [
        { id: "content-tools", icon: <Layout className="h-5 w-5" />, to: "/content-tools", label: "أدوات المحتوى" },
        { id: "documents", icon: <FileText className="h-5 w-5" />, to: "/documentation", label: "المستندات" },
        { id: "media", icon: <PlayCircle className="h-5 w-5" />, to: "/video-generator", label: "الوسائط" },
      ]
    },
    {
      id: "apps",
      title: "التطبيقات",
      collapsible: true,
      items: [
        { id: "appgrid", icon: <Grid className="h-5 w-5" />, to: "/scheduler", label: "الجدولة" }
      ]
    }
  ];

  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (expanded) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  
  return (
    <Sidebar variant="inset">
      <SidebarContent className={cn(
        "flex flex-col items-center py-4 transition-all duration-300",
        expanded ? "items-start px-3" : "items-center"
      )}>
        {/* Logo and expand button */}
        <div className={cn(
          "flex items-center mb-6 w-full",
          expanded ? "justify-between" : "justify-center"
        )}>
          <NavLink to="/" className="flex items-center">
            <div className="bg-black rounded-full p-2 w-10 h-10 flex items-center justify-center">
              <Hash className="text-white h-6 w-6" />
            </div>
            {expanded && <span className="mr-3 text-lg font-semibold">Beauty AI</span>}
          </NavLink>
          
          {!isMobile && (
            <button 
              onClick={toggleExpanded}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
            >
              {expanded ? 
                <ChevronRight className="h-5 w-5" /> : 
                <ChevronDown className="h-5 w-5" />
              }
            </button>
          )}
        </div>
        
        <ScrollArea className="flex-1 w-full">
          <div className={cn(
            "flex flex-col", 
            expanded ? "items-start" : "items-center",
            "space-y-2 w-full"
          )}>
            {/* Navigation Groups */}
            {navigationGroups.map((group) => (
              <div key={group.id} className="w-full">
                {/* Group Title - Only show if expanded and has title */}
                {expanded && group.title && (
                  <div
                    className={cn(
                      "flex items-center justify-between py-2 text-sm text-gray-500 font-medium",
                      group.collapsible && "cursor-pointer hover:text-gray-800"
                    )}
                    onClick={() => group.collapsible && toggleDropdown(group.id)}
                  >
                    <span>{group.title}</span>
                    {group.collapsible && (
                      <div className="p-1 rounded-md">
                        {activeDropdown === group.id ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </div>
                    )}
                  </div>
                )}
                
                {/* Group Items */}
                <AnimatePresence>
                  {(!group.collapsible || !expanded || activeDropdown === group.id) && (
                    <motion.div
                      initial={expanded ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col space-y-1 w-full">
                        {group.items.map((item) => (
                          <TooltipProvider key={item.id} delayDuration={300}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <NavLink
                                  to={item.to}
                                  className={({ isActive }) =>
                                    cn(
                                      "flex items-center rounded-xl transition-all duration-200 py-2",
                                      expanded ? "px-3" : "justify-center w-10 h-10",
                                      isActive 
                                        ? "bg-purple-100 text-purple-700" 
                                        : "text-gray-500 hover:text-gray-800"
                                    )
                                  }
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center"
                                  >
                                    {item.icon}
                                    {expanded && <span className="mr-3 text-sm">{item.label}</span>}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter className={cn(
        "pb-4 flex", 
        expanded ? "px-3 justify-between items-center" : "justify-center"
      )}>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink to="/profile" className="block">
                <Avatar className="h-10 w-10 border-2 border-white hover:border-purple-200 transition-all duration-200">
                  <img
                    src={profile?.avatar_url || "https://github.com/shadcn.png"}
                    alt={profile ? `${profile.first_name} ${profile.last_name}` : "User"}
                    className="object-cover"
                  />
                </Avatar>
              </NavLink>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right">
                <p>الملف الشخصي</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        {expanded && (
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {profile ? `${profile.first_name} ${profile.last_name}` : "المستخدم"}
            </span>
            <span className="text-xs text-gray-500">
              {user?.email || "user@example.com"}
            </span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
