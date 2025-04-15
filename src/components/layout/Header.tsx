
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

// Import the new components
import SearchBar from "./header/SearchBar";
import ThemeToggle from "./header/ThemeToggle";
import NotificationsPopover from "./header/NotificationsPopover";
import UserMenu from "./header/UserMenu";

const getPageTitle = (pathname: string) => {
  const paths = {
    "/": "الرئيسية",
    "/dashboard": "لوحة التحكم",
    "/analytics": "التحليلات",
    "/content-tools": "أدوات المحتوى",
    "/ai-studio": "استوديو الذكاء الاصطناعي",
    "/scheduler": "جدولة المنشورات",
    "/user-management": "إدارة المستخدمين",
    "/profile": "الملف الشخصي",
  };
  
  return paths[pathname as keyof typeof paths] || "بيوتي";
};

const Header: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [notificationCount, setNotificationCount] = useState(4);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(st <= lastScrollTop || st < 50);
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : -80, 
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">تبديل القائمة</span>
            </Button>
          </SidebarTrigger>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold">{getPageTitle(location.pathname)}</h1>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search Bar Component */}
          <SearchBar />
          
          {/* Theme Toggle Component */}
          <ThemeToggle />
          
          {/* Notifications Component */}
          <NotificationsPopover
            notificationCount={notificationCount}
            onNotificationClick={handleNotificationClick}
          />
          
          {/* User Menu Component */}
          <UserMenu
            userEmail={user?.email}
            onSignOut={() => signOut && signOut()}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
