
import React from "react";
import { Bell, Settings, UserCircle, Shield, ChevronDown } from "lucide-react";
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
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  // Role mapping for badge display
  const roleMap = {
    admin: { label: "مدير النظام", icon: <Shield className="h-3.5 w-3.5 mr-2" />, color: "bg-rose-100 text-rose-700" },
    marketing: { label: "مسوّق", icon: <Bell className="h-3.5 w-3.5 mr-2" />, color: "bg-blue-100 text-blue-700" },
    user: { label: "مستخدم", icon: <UserCircle className="h-3.5 w-3.5 mr-2" />, color: "bg-slate-100 text-slate-700" }
  };
  
  const userRole = profile?.role || "user";
  const roleInfo = roleMap[userRole as keyof typeof roleMap] || roleMap.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-9 rounded-full pr-2 pl-3 flex items-center gap-2 hover:bg-white/25"
        >
          <Avatar className="h-7 w-7 border-2 border-white/20">
            {profile?.avatar_url ? 
              <AvatarImage src={profile.avatar_url} alt="صورة المستخدم" /> 
              : 
              <AvatarFallback className="bg-[#4a8a99] text-white">
                {userInitials}
              </AvatarFallback>
            }
          </Avatar>
          <span className="hidden md:inline-block text-sm font-medium text-white">
            {profile?.first_name || "المستخدم"}
          </span>
          <ChevronDown className="h-4 w-4 text-white/70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              {profile?.first_name} {profile?.last_name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {profile?.email || "لا يوجد بريد إلكتروني"}
            </p>
            <Badge variant="outline" className={`mt-1.5 self-start text-xs py-0 ${roleInfo.color}`}>
              {roleInfo.icon}
              {roleInfo.label}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <UserCircle className="mr-2 h-4 w-4" />
            <span>الملف الشخصي</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>الإعدادات</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50"
          onClick={handleSignOut}
        >
          <span>تسجيل الخروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
