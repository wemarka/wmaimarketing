
import React, { useState } from 'react';
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import LanguageToggle from "@/components/common/LanguageToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, profile, signOut } = useAuth();
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
    if (path === '/auth') {
      return currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Authentication';
    }
    
    return '';
  };
  
  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    
    if (profile?.first_name) {
      return profile.first_name[0].toUpperCase();
    }
    
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    
    return 'U';
  };

  const avatarUrl = profile?.avatar_url || '';
  const userName = profile?.first_name 
    ? `${profile.first_name} ${profile.last_name || ''}`
    : user?.email || '';

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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-secondary rounded-full">
                    <Avatar className="h-9 w-9 border-2 border-border hover:border-primary transition-colors">
                      {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
                      <AvatarFallback className="bg-beauty-purple/10 text-beauty-purple">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      {currentLanguage === 'ar' ? 'الملف الشخصي' : 'Profile'}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {currentLanguage === 'ar' ? 'تسجيل الخروج' : 'Log out'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
