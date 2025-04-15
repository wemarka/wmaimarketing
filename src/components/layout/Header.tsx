
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, Clock, Calendar, Bell, Star, Search, User, ChevronDown, Shield, 
  LayoutDashboard, Settings
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

// Import the components
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
  const [showFullHeader, setShowFullHeader] = useState(true);
  
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
      setShowFullHeader(st < 100);
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
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container px-4">
        <AnimatePresence>
          {showFullHeader && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-beauty-purple/25 via-beauty-purple/15 to-transparent py-6 px-6 rounded-xl shadow-sm border border-beauty-purple/10 dark:border-beauty-purple/5 my-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <motion.div 
                    className="flex items-center gap-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <SidebarTrigger>
                      <Button variant="ghost" size="icon" className="md:hidden hover:bg-beauty-purple/10 hover:text-beauty-purple">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">تبديل القائمة</span>
                      </Button>
                    </SidebarTrigger>
                    
                    <div>
                      <h1 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-beauty-purple to-beauty-purple/70 inline-block text-transparent bg-clip-text">
                        {greeting}{userName && `, ${userName}`}
                        <motion.span 
                          initial={{ rotate: 0 }}
                          animate={{ rotate: [0, 15, 0, -15, 0] }}
                          transition={{ 
                            duration: 1, 
                            delay: 1, 
                            repeat: 1, 
                            repeatType: "reverse" 
                          }}
                          className="text-xl"
                        >
                          👋
                        </motion.span>
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mt-2">
                        <div className="flex items-center gap-2 bg-beauty-cream/30 dark:bg-beauty-purple/10 rounded-full px-3 py-1 shadow-sm backdrop-blur-sm">
                          <Calendar className="h-3.5 w-3.5 text-beauty-purple" />
                          <span className="font-medium">{getCurrentDate()}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-beauty-cream/30 dark:bg-beauty-purple/10 rounded-full px-3 py-1 shadow-sm backdrop-blur-sm">
                          <Clock className="h-3.5 w-3.5 text-beauty-purple" />
                          <span className="font-medium">{getCurrentTime()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-4 md:mt-0 flex flex-wrap items-center justify-between gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <div className="hidden md:flex bg-white/80 dark:bg-slate-800/70 py-2 px-4 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-700/40 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 mr-2">
                          <Shield className="h-4 w-4 text-beauty-purple" />
                          <p className="text-sm font-medium">{t("dashboard.todayPriorities", "أولويات اليوم")}</p>
                          <Badge variant="outline" className="text-xs bg-beauty-purple/10 text-beauty-purple border-beauty-purple/20">{priorities.length}</Badge>
                        </div>
                      </div>
                      <ul className="ml-4 text-sm hidden lg:block">
                        {priorities.slice(0, 1).map((priority, index) => (
                          <span key={index} className="flex items-center gap-1.5 text-muted-foreground">
                            <Star className="h-3 w-3 text-beauty-gold fill-beauty-gold" /> {priority}
                          </span>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3">
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
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* عنوان الصفحة */}
        <motion.div 
          className="flex h-14 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            {!showFullHeader && (
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-beauty-purple/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
            )}
            <div className="flex items-center gap-2">
              {location.pathname === "/dashboard" && <LayoutDashboard className="h-5 w-5 text-beauty-purple" />}
              <h2 className="text-lg font-semibold">{getPageTitle(location.pathname)}</h2>
            </div>
          </div>
          
          {!showFullHeader && (
            <div className="ml-auto flex items-center gap-2">
              <SearchBar />
              <ThemeToggle />
              <NotificationsPopover
                notificationCount={notificationCount}
                onNotificationClick={handleNotificationClick}
              />
            </div>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
