import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import HeaderGreeting from "./header/HeaderGreeting";
import HeaderActions from "./header/HeaderActions";
import CompactHeader from "./header/CompactHeader";
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
    "/profile": "الملف الشخصي"
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
  const {
    user,
    signOut
  } = useAuth();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [notificationCount, setNotificationCount] = useState(4);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showFullHeader, setShowFullHeader] = useState(true);
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
  const greeting = getGreeting();
  const pageTitle = getPageTitle(location.pathname);
  return <motion.header initial={{
    y: 0,
    opacity: 1
  }} animate={{
    y: isVisible ? 0 : -80,
    opacity: isVisible ? 1 : 0
  }} transition={{
    duration: 0.3,
    ease: "easeInOut"
  }} className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60")}>
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
        <AnimatePresence>
          {showFullHeader && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} transition={{
          duration: 0.3
        }} className="overflow-hidden">
              <div className="bg-gradient-to-r from-beauty-purple/25 via-beauty-purple/15 to-transparent py-6 px-6 rounded-xl shadow-sm border border-beauty-purple/10 dark:border-beauty-purple/5 my-3 w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                  <SidebarTrigger>
                    <Button variant="ghost" size="icon" className="md:hidden hover:bg-beauty-purple/10">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">تبديل القائمة</span>
                    </Button>
                  </SidebarTrigger>
                  
                  <HeaderGreeting currentTime={currentTime} greeting={greeting} />
                  
                  <HeaderActions notificationCount={notificationCount} onNotificationClick={handleNotificationClick} userEmail={user?.email} onSignOut={() => signOut && signOut()} />
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
        
        
      </div>
    </motion.header>;
};
export default Header;