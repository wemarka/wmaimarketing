
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
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  // Get current page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/dashboard' || path === '/') {
      return t('sidebar.navigation.dashboard');
    }
    if (path === '/image-upload') {
      return t('sidebar.navigation.imageAnalysis');
    }
    if (path === '/ad-generator') {
      return t('sidebar.navigation.adGenerator');
    }
    if (path === '/content-creator') {
      return t('sidebar.navigation.contentCreator');
    }
    if (path === '/video-generator') {
      return t('sidebar.navigation.videoGenerator');
    }
    if (path === '/scheduler') {
      return t('sidebar.navigation.scheduler');
    }
    if (path === '/analytics') {
      return t('sidebar.navigation.analytics');
    }
    if (path === '/profile') {
      return t('sidebar.navigation.profile');
    }
    if (path === '/users') {
      return t('sidebar.navigation.userManagement');
    }
    if (path === '/integration') {
      return t('sidebar.navigation.integrations');
    }
    if (path === '/documentation') {
      return t('sidebar.navigation.projectPlan');
    }
    if (path === '/ai-studio') {
      return t('sidebar.navigation.aiStudio');
    }
    if (path === '/auth') {
      return t('auth.title', 'Authentication');
    }
    
    return '';
  };
  
  // Safety wrapper to check auth context
  const SafeAuthUserMenu = () => {
    // Use try-catch to safely access auth context
    try {
      const auth = useAuth();
      
      // If auth is loading or not initialized yet, show loading state
      if (auth.loading) {
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
          </div>
        );
      }
      
      // If no user after loading is complete, show login button
      if (!auth.user) {
        return (
          <Link to="/auth">
            <Button>{t('auth.login', 'Login')}</Button>
          </Link>
        );
      }
      
      // User is logged in, show user menu
      const getUserInitials = () => {
        if (auth.profile?.first_name && auth.profile?.last_name) {
          return `${auth.profile.first_name[0]}${auth.profile.last_name[0]}`.toUpperCase();
        }
        
        if (auth.profile?.first_name) {
          return auth.profile.first_name[0].toUpperCase();
        }
        
        if (auth.user?.email) {
          return auth.user.email[0].toUpperCase();
        }
        
        return 'U';
      };

      const avatarUrl = auth.profile?.avatar_url || '';
      const userName = auth.profile?.first_name 
        ? `${auth.profile.first_name} ${auth.profile.last_name || ''}`
        : auth.user?.email || '';

      return (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-secondary"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
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
                  <p className="text-xs leading-none text-muted-foreground">{auth.user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  {t('sidebar.navigation.profile')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => auth.signOut()} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                {t('sidebar.signOut')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    } catch (error) {
      console.error("Error rendering user menu:", error);
      // Fallback UI in case of error
      return (
        <Link to="/auth">
          <Button>{t('auth.login', 'Login')}</Button>
        </Link>
      );
    }
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
          <SafeAuthUserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
