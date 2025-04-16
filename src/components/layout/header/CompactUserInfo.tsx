
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const CompactUserInfo = () => {
  const { user, profile, signOut } = useAuth();
  const currentDate = new Date();
  
  // Format date - بالعربية
  const formatDate = () => {
    const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    
    return `${day} ${month}`;
  };
  
  // Get user initials for avatar fallback
  const userInitials = profile?.first_name && profile?.last_name 
    ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`
    : user?.email ? user.email.substring(0, 2).toUpperCase() 
    : "??";
    
  // Weather data (mock)
  const weather = {
    temp: 27,
    condition: "☀️"
  };
  
  const userName = profile?.first_name || "المستخدم";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-9 rounded-full flex items-center gap-2 hover:bg-white/20"
        >
          <div className="hidden md:flex items-center space-x-1 space-x-reverse rtl:space-x-reverse text-sm text-white/90">
            <span>{userName}</span>
            <span className="text-white/60 mx-1">|</span>
            <span>{weather.condition} {weather.temp}°</span>
            <span className="text-white/60 mx-1">|</span>
            <span>{formatDate()}</span>
          </div>
          
          <Avatar className="h-8 w-8 border-2 border-white/20">
            {profile?.avatar_url ? 
              <AvatarImage src={profile.avatar_url} alt="صورة المستخدم" /> 
              : 
              <AvatarFallback className="bg-[#4a8a99] text-white">
                {userInitials}
              </AvatarFallback>
            }
          </Avatar>
          <ChevronDown className="h-3.5 w-3.5 text-white/70" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>الحساب</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = '/profile'}>الملف الشخصي</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = '/dashboard'}>لوحة التحكم</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = '/settings'}>الإعدادات</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 focus:text-red-500 focus:bg-red-50/10 cursor-pointer"
          onClick={() => signOut()}
        >
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompactUserInfo;
