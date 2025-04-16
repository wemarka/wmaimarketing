
import React, { useState } from "react";
import { Bell, Settings, UserCircle, Shield, ChevronDown, LayoutDashboard, LogOut, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const UserMenu = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openDropdown, setOpenDropdown] = useState(false);
  
  // Get user initials for avatar fallback
  const userInitials = profile?.first_name && profile?.last_name ? 
    `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}` : "??";
  
  const handleSignOut = () => {
    signOut();
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح",
    });
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "صباح الخير";
    if (hour < 18) return "مساء الخير";
    return "مساء الخير";
  };

  // Role mapping for badge display
  const roleMap = {
    admin: { label: "مدير النظام", icon: <Shield className="h-3.5 w-3.5 mr-2" />, color: "bg-rose-100 text-rose-700" },
    marketing: { label: "مسوّق", icon: <Bell className="h-3.5 w-3.5 mr-2" />, color: "bg-blue-100 text-blue-700" },
    user: { label: "مستخدم", icon: <UserCircle className="h-3.5 w-3.5 mr-2" />, color: "bg-slate-100 text-slate-700" }
  };
  
  const userRole = profile?.role || "user";
  const roleInfo = roleMap[userRole as keyof typeof roleMap] || roleMap.user;

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-9 rounded-full px-2.5 flex items-center gap-2.5 hover:bg-white/25"
        >
          <Avatar className="h-8 w-8 border-2 border-white/20">
            {profile?.avatar_url ? 
              <AvatarImage src={profile.avatar_url} alt="صورة المستخدم" /> 
              : 
              <AvatarFallback className="bg-[#4a8a99] text-white">
                {userInitials}
              </AvatarFallback>
            }
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-white">
              {getGreeting()}, {profile?.first_name || "المستخدم"}
            </span>
            <span className="text-xs text-white/70">
              {new Intl.DateTimeFormat('ar-SA', {
                day: 'numeric',
                month: 'numeric'
              }).format(new Date())} | ☀️ 27°
            </span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-white/70" />
          
          {/* Notification dot indicator */}
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="p-4 pb-3">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-gray-100">
                {profile?.avatar_url ? 
                  <AvatarImage src={profile.avatar_url} alt="صورة المستخدم" /> 
                  : 
                  <AvatarFallback className="bg-[#4a8a99] text-white">
                    {userInitials}
                  </AvatarFallback>
                }
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || "لا يوجد بريد إلكتروني"}
                </p>
              </div>
            </div>
            
            <Badge variant="outline" className={`mt-2 self-start text-xs py-0 ${roleInfo.color}`}>
              {roleInfo.icon}
              {roleInfo.label}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            className="cursor-pointer py-2.5"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>لوحة التحكم</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer py-2.5"
            onClick={() => navigate("/profile")}
          >
            <UserCircle className="mr-2 h-4 w-4" />
            <span>الملف الشخصي</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer py-2.5"
            onClick={() => navigate("/calendar")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>التقويم</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer py-2.5"
            onClick={() => navigate("/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>الإعدادات</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer py-2.5 text-red-500 focus:text-red-500 focus:bg-red-50"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>تسجيل الخروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
