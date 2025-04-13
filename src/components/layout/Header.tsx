
import React from 'react';
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import LanguageToggle from "@/components/common/LanguageToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  // Get current page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/dashboard' || path === '/') {
      return currentLanguage === 'ar' ? 'لوحة التحكم' : 'Dashboard';
    }
    if (path === '/image-upload') {
      return currentLanguage === 'ar' ? 'تحليل الصور' : 'Image Analysis';
    }
    if (path === '/ad-generator') {
      return currentLanguage === 'ar' ? 'منشئ الإعلانات' : 'Ad Generator';
    }
    if (path === '/content-creator') {
      return currentLanguage === 'ar' ? 'منشئ المحتوى' : 'Content Creator';
    }
    if (path === '/video-generator') {
      return currentLanguage === 'ar' ? 'منشئ الفيديو' : 'Video Generator';
    }
    if (path === '/scheduler') {
      return currentLanguage === 'ar' ? 'الجدولة والنشر' : 'Schedule & Publish';
    }
    if (path === '/analytics') {
      return currentLanguage === 'ar' ? 'التحليلات' : 'Analytics';
    }
    if (path === '/profile') {
      return currentLanguage === 'ar' ? 'الملف الشخصي' : 'Profile';
    }
    if (path === '/users') {
      return currentLanguage === 'ar' ? 'إدارة المستخدمين' : 'User Management';
    }
    if (path === '/integration') {
      return currentLanguage === 'ar' ? 'التكاملات' : 'Integrations';
    }
    if (path === '/documentation') {
      return currentLanguage === 'ar' ? 'خطة المشروع' : 'Project Plan';
    }
    if (path === '/ai-studio') {
      return currentLanguage === 'ar' ? 'استوديو الذكاء الاصطناعي' : 'AI Studio';
    }
    
    return '';
  };
  
  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 1).toUpperCase();
  };

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-beauty-purple to-beauty-pink bg-clip-text text-transparent">
            {getPageTitle()}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageToggle />
          
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-secondary"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-secondary"
                asChild
              >
                <Link to="/profile">
                  <Avatar className="h-9 w-9 border-2 border-border hover:border-primary transition-colors">
                    <AvatarFallback className="bg-beauty-purple/10 text-beauty-purple">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button>{currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Login'}</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
