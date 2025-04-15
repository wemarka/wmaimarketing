
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, Clock, Calendar, Bell, Star
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

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

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 18) return "مساء الخير";
  return "مساء الخير";
};

const Header: React.FC = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const { profileData } = useProfile();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [notificationCount, setNotificationCount] = useState(4);
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentLanguage = i18n.language;
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

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
  
  const getCurrentDate = () => {
    return currentTime.toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const greeting = getGreeting();
  const userName = profileData?.first_name || "";
  
  // Daily priorities
  const priorities = [
    t("dashboard.priorities.schedule", "جدولة 3 منشورات لمنتجات مكياج جديدة"),
    t("dashboard.priorities.review", "استعراض أداء الحملة الإعلانية الأسبوعية")
  ];

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
      <div className="container px-4">
        {/* أضفنا جزء الترحيب هنا */}
        <div className="bg-gradient-to-r from-beauty-purple/10 to-transparent py-4 px-4 rounded-b-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">تبديل القائمة</span>
                </Button>
              </SidebarTrigger>
              
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  {greeting}{userName && `, ${userName}`}
                  <span className="text-xl">👋</span>
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{getCurrentDate()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{getCurrentTime()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap items-center justify-between gap-4">
              <div className="hidden md:flex bg-white dark:bg-slate-800 py-2 px-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium mr-2">{t("dashboard.todayPriorities", "أولويات اليوم")}</p>
                  <Badge variant="outline" className="text-xs">{priorities.length}</Badge>
                </div>
                <ul className="ml-4 text-sm hidden lg:block">
                  {priorities.slice(0, 1).map((priority, index) => (
                    <span key={index} className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-3 w-3 text-beauty-gold" /> {priority}
                    </span>
                  ))}
                </ul>
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
          </div>
        </div>
        
        {/* عنوان الصفحة */}
        <div className="flex h-12 items-center">
          <h2 className="text-lg font-semibold">{getPageTitle(location.pathname)}</h2>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

