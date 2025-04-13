
import React from 'react';
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import LanguageToggle from "@/components/common/LanguageToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { Separator } from '@/components/ui/separator';

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Get current page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/dashboard' || path === '/') return 'لوحة التحكم';
    if (path === '/image-upload') return 'تحليل الصور';
    if (path === '/ad-generator') return 'منشئ الإعلانات';
    if (path === '/content-creator') return 'منشئ المحتوى';
    if (path === '/video-generator') return 'منشئ الفيديو';
    if (path === '/scheduler') return 'الجدولة والنشر';
    if (path === '/analytics') return 'التحليلات';
    if (path === '/profile') return 'الملف الشخصي';
    if (path === '/users') return 'إدارة المستخدمين';
    if (path === '/integration') return 'التكاملات';
    if (path === '/documentation') return 'خطة المشروع';
    if (path === '/ai-studio') return 'استوديو الذكاء الاصطناعي';
    
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
              <Button>تسجيل الدخول</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
