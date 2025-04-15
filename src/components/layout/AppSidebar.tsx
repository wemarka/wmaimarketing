
import React from "react";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  Search, 
  Hash, 
  Layout, 
  FileText, 
  PlayCircle, 
  Grid
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";

const AppSidebar = () => {
  const { profile } = useAuth();

  // Sidebar navigation items
  const navigationItems = [
    { id: "home", icon: <Hash className="h-5 w-5" />, to: "/dashboard", label: "الرئيسية" },
    { id: "notifications", icon: <Bell className="h-5 w-5" />, to: "/notifications", label: "الإشعارات" },
    { id: "search", icon: <Search className="h-5 w-5" />, to: "/search", label: "البحث" },
    { id: "content", icon: <Layout className="h-5 w-5" />, to: "/content-tools", label: "المحتوى" },
    { id: "documents", icon: <FileText className="h-5 w-5" />, to: "/documentation", label: "المستندات" },
    { id: "media", icon: <PlayCircle className="h-5 w-5" />, to: "/video-generator", label: "الوسائط" },
    { id: "apps", icon: <Grid className="h-5 w-5" />, to: "/scheduler", label: "التطبيقات" }
  ];

  return (
    <Sidebar variant="inset">
      <SidebarContent className="flex flex-col items-center py-4">
        {/* Logo */}
        <NavLink to="/" className="mb-6">
          <div className="bg-black rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <Hash className="text-white h-6 w-6" />
          </div>
        </NavLink>
        
        <ScrollArea className="flex-1 w-full">
          <div className="flex flex-col items-center space-y-6">
            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <TooltipProvider key={item.id} delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200",
                          isActive ? "bg-purple-100 text-purple-700" : "text-gray-500 hover:text-gray-800"
                        )
                      }
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.icon}
                      </motion.div>
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter className="pb-4 flex justify-center">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink to="/profile" className="block">
                <Avatar className="h-10 w-10 border-2 border-white hover:border-purple-200 transition-all duration-200">
                  <img
                    src={profile?.avatar_url || "https://github.com/shadcn.png"}
                    alt={profile?.full_name || "User"}
                    className="object-cover"
                  />
                </Avatar>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>الملف الشخصي</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
