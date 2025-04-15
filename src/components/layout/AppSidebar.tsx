import React, { useState, useEffect } from "react";
import { SidebarContent } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  LayoutDashboard,
  Image,
  FileText,
  Video,
  CalendarDays,
  BarChart,
  FileQuestion,
  Users,
  Settings,
  Database,
  Package2,
  PackagePlus,
  ShoppingCart,
  ChevronRight,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const AppSidebar = () => {
  const { profile, user, signOut } = useAuth();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Auto collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [isMobile]);
  
  // Check if dark mode is already active
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };
  
  // Define navigation sections
  const navigationSections = [
    {
      title: "الرئيسية",
      items: [
        { id: 'dashboard', icon: <LayoutDashboard className="h-5 w-5" />, to: "/dashboard", label: "لوحة التحكم" }
      ]
    },
    {
      title: "المحتوى",
      items: [
        { id: 'image-upload', icon: <Image className="h-5 w-5" />, to: "/image-upload", label: "تحليل الصور" },
        { id: 'content-creator', icon: <FileText className="h-5 w-5" />, to: "/content-creator", label: "منشئ المحتوى" },
        { id: 'video-generator', icon: <Video className="h-5 w-5" />, to: "/video-generator", label: "منشئ الفيديو" },
        { id: 'scheduler', icon: <CalendarDays className="h-5 w-5" />, to: "/scheduler", label: "الجدولة والنشر" },
        { id: 'analytics', icon: <BarChart className="h-5 w-5" />, to: "/analytics", label: "التحليلات" }
      ]
    },
    {
      title: "المنتجات",
      items: [
        { id: 'product-list', icon: <Package2 className="h-5 w-5" />, to: "/product/list", label: "المنتجات" },
        { id: 'product-add', icon: <PackagePlus className="h-5 w-5" />, to: "/product/add", label: "إضافة منتج" },
        { id: 'product-orders', icon: <ShoppingCart className="h-5 w-5" />, to: "/product/orders", label: "الطلبات" }
      ]
    },
    {
      title: "الإدارة",
      items: [
        { id: 'users', icon: <Users className="h-5 w-5" />, to: "/users", label: "إدارة المستخدمين" },
        { id: 'profile', icon: <Settings className="h-5 w-5" />, to: "/profile", label: "الإعدادات الشخصية" },
        { id: 'integration', icon: <Database className="h-5 w-5" />, to: "/integration", label: "التكاملات" }
      ]
    },
    {
      title: "المستندات",
      items: [
        { id: 'documentation', icon: <FileQuestion className="h-5 w-5" />, to: "/documentation", label: "خطة المشروع" }
      ]
    }
  ];
  
  // Helper function to check if a route is active
  const checkIsActive = (path: string): boolean => {
    // Exact match for root and dashboard
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    
    // For other routes, check if current path starts with the given path
    return path !== '/' && location.pathname.startsWith(path);
  };
  
  // Profile info
  const userInitials = profile?.first_name && profile?.last_name 
    ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`
    : user?.email ? user.email.substring(0, 2).toUpperCase() 
    : "??";
    
  const displayName = profile?.first_name && profile?.last_name
    ? `${profile.first_name} ${profile.last_name}`
    : user?.email || "المستخدم";
    
  const displayRole = profile?.role || "مستخدم";
  
  return (
    <div className={cn(
      "fixed left-0 z-20 h-screen border-r border-border/60 bg-white dark:bg-gray-900 transition-all duration-300",
      expanded ? "w-64" : "w-[70px]"
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-border/60",
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
            <span className="mr-3 font-semibold text-gray-800 dark:text-gray-200">
              Softtech
            </span>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-900 p-2 flex items-center justify-center">
            <img 
              src="/lovable-uploads/4e8f9347-a119-4c61-b2c3-d97ad429f0db.png" 
              alt="Softtech" 
              className="h-6 w-6" 
            />
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleExpanded}
          className="h-8 w-8 text-gray-600 dark:text-gray-400"
        >
          <ChevronRight className={cn("h-4 w-4", expanded ? "" : "rotate-180")} />
        </Button>
      </div>
      
      {/* Content */}
      <ScrollArea className="h-[calc(100vh-64px-64px)]">
        <div className="py-2">
          {navigationSections.map((section, idx) => (
            <div key={idx} className="mb-4">
              {expanded && (
                <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <TooltipProvider key={item.id} delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) => cn(
                            "flex items-center rounded-md mx-2 px-3 py-2 text-sm font-medium",
                            isActive || checkIsActive(item.to)
                              ? "bg-primary/10 text-primary" 
                              : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
                            !expanded && "justify-center"
                          )}
                        >
                          <div className={cn("flex items-center", !expanded && "justify-center w-full")}>
                            {item.icon}
                            {expanded && (
                              <span className="mr-2 text-inherit">{item.label}</span>
                            )}
                          </div>
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
        </div>
      </ScrollArea>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/60">
        {/* Theme toggle */}
        <div className="px-3 py-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="w-full h-9 justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDarkMode ? (
              <Moon className="h-5 w-5 text-yellow-400" />
            ) : (
              <Sun className="h-5 w-5 text-gray-700" />
            )}
          </Button>
        </div>
        
        <Separator className="my-1" />
        
        {/* User profile */}
        <div 
          className={cn(
            "p-3 flex items-center",
            expanded ? "justify-between" : "justify-center"
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(
                  "flex items-center cursor-pointer p-2 rounded-lg hover:bg-muted",
                  expanded ? "w-full" : "w-auto justify-center"
                )}>
                  <Avatar className="h-9 w-9 border-2 border-primary/20">
                    <AvatarImage src={profile?.avatar_url || ""} alt={displayName} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>

                  {expanded && (
                    <div className="mr-3 text-right flex-1 overflow-hidden">
                      <p className="text-sm font-medium truncate text-gray-800 dark:text-gray-200">
                        {displayName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {displayRole}
                      </p>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              
              {!expanded && (
                <TooltipContent side="right">
                  <div className="text-sm">
                    <p className="font-medium">{displayName}</p>
                    <p className="text-xs opacity-70">{displayRole}</p>
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
