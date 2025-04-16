
import React from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const location = useLocation();
  const { profile } = useAuth();
  
  // Function to get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "لوحة التحكم";
    if (path.includes("notification")) return "الإشعارات";
    if (path.includes("search")) return "البحث";
    if (path.includes("content")) return "المحتوى";
    if (path.includes("documentation")) return "التوثيق";
    if (path.includes("video")) return "الوسائط";
    if (path.includes("scheduler")) return "التطبيقات";
    if (path.includes("profile")) return "الملف الشخصي";
    if (path.includes("insights")) return "الإحصائيات";
    if (path.includes("channels")) return "القنوات";
    return "Circle";
  };

  // Main navigation items
  const navItems = [
    { title: "لوحة التحكم", path: "/dashboard" },
    { title: "الإحصائيات", path: "/insights" },
    { title: "القنوات", path: "/channels" }
  ];

  // Team members for avatar display
  const teamMembers = [
    { name: "أحمد خالد", avatar: null, initials: "أخ" },
    { name: "سارة محمد", avatar: null, initials: "سم" },
    { name: "فيصل علي", avatar: null, initials: "فع" }
  ];

  return (
    <header className="bg-[#3a7a89] px-6 py-4 text-white shadow-md ml-16 lg:ml-16">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center">
            <ArrowLeft className="h-5 w-5 ml-2" />
            <span>رجوع</span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-xl font-medium mr-4"
          >
            {getPageTitle()}
          </motion.h2>
        </div>
        
        {/* Center navigation */}
        <motion.nav 
          className="hidden md:flex items-center space-x-8 space-x-reverse"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {navItems.map((item, index) => (
            <motion.a 
              key={item.title} 
              href={item.path}
              className={cn(
                "text-sm font-medium tracking-wide hover:text-white/80 transition-colors",
                location.pathname === item.path ? "text-white" : "text-white/60"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            >
              {item.title}
            </motion.a>
          ))}
        </motion.nav>
        
        {/* Right actions */}
        <motion.div 
          className="flex items-center space-x-4 space-x-reverse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {/* Actions */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          {/* Team members */}
          <div className="flex items-center -space-x-2 space-x-reverse mr-4">
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
            <span className="mr-4 text-xs font-medium">12 عضو</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
