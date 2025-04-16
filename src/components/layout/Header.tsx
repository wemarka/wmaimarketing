
import React from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const location = useLocation();
  const { profile } = useAuth();
  
  // Function to get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "DASHBOARD";
    if (path.includes("notification")) return "NOTIFICATIONS";
    if (path.includes("search")) return "SEARCH";
    if (path.includes("content")) return "CONTENT";
    if (path.includes("documentation")) return "DOCUMENTATION";
    if (path.includes("video")) return "MEDIA";
    if (path.includes("scheduler")) return "APPS";
    if (path.includes("profile")) return "PROFILE";
    if (path.includes("insights")) return "INSIGHTS";
    if (path.includes("channels")) return "CHANNELS";
    return "Circle";
  };

  // Main navigation items
  const navItems = [
    { title: "DASHBOARD", path: "/dashboard" },
    { title: "INSIGHTS", path: "/insights" },
    { title: "CHANNELS", path: "/channels" }
  ];

  // Mock team members for avatar display
  const teamMembers = [
    { name: "Alex Smith", avatar: null, initials: "AS" },
    { name: "Maria Jose", avatar: null, initials: "MJ" },
    { name: "John Doe", avatar: null, initials: "JD" }
  ];

  return (
    <header className="bg-[#3a7a89] px-8 py-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="p-0 text-white">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </Button>
        </div>
        
        {/* Center navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.title} 
              href={item.path}
              className={cn(
                "text-sm font-medium tracking-wide hover:text-white/80",
                location.pathname === item.path ? "text-white" : "text-white/60"
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
        
        {/* Team members */}
        <div className="flex items-center -space-x-2">
          {teamMembers.map((member, idx) => (
            <Avatar 
              key={idx}
              className="border-2 border-[#3a7a89] w-8 h-8"
            >
              <AvatarImage src={member.avatar || undefined} />
              <AvatarFallback className="bg-white/20 text-white text-xs">
                {member.initials}
              </AvatarFallback>
            </Avatar>
          ))}
          <span className="ml-4 text-xs font-medium">12 members</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
