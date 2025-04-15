
import React from "react";
import { 
  User, LogOut, Settings, UserCircle, Shield, 
  HelpCircle, Bell, Moon, ChevronDown
} from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

interface UserMenuProps {
  userEmail?: string;
  onSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ userEmail, onSignOut }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { profileData } = useProfile();
  
  const handleSignOut = () => {
    toast({
      title: t("auth.signedOut", "تم تسجيل الخروج"),
      description: t("auth.signedOutSuccess", "تم تسجيل الخروج بنجاح"),
    });
    onSignOut();
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    if (profileData?.first_name && profileData?.last_name) {
      return `${profileData.first_name[0]}${profileData.last_name[0]}`.toUpperCase();
    } else if (userEmail) {
      return userEmail[0].toUpperCase();
    }
    return "U";
  };

  // Role mapping
  const roleMap = {
    admin: { label: "مدير النظام", icon: <Shield className="h-3.5 w-3.5 mr-2" />, color: "bg-rose-100 text-rose-700" },
    marketing: { label: "مسوّق", icon: <Bell className="h-3.5 w-3.5 mr-2" />, color: "bg-blue-100 text-blue-700" },
    editor: { label: "محرر", icon: <User className="h-3.5 w-3.5 mr-2" />, color: "bg-green-100 text-green-700" },
  };
  
  const userRole = profileData?.role || "user";
  const roleInfo = roleMap[userRole as keyof typeof roleMap] || { 
    label: "مستخدم", 
    icon: <User className="h-3.5 w-3.5 mr-2" />, 
    color: "bg-slate-100 text-slate-700" 
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-9 rounded-full pr-2 pl-3 flex items-center gap-2 hover:bg-muted/60"
        >
          <Avatar className="h-7 w-7 border">
            <AvatarImage 
              src={profileData?.avatar_url || undefined} 
              alt={profileData?.first_name || userEmail || "User avatar"} 
            />
            <AvatarFallback className="text-xs bg-beauty-purple/20 text-beauty-purple">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block text-sm font-medium">
            {profileData?.first_name || userEmail?.split("@")[0] || "المستخدم"}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              {profileData?.first_name} {profileData?.last_name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {userEmail}
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
          <DropdownMenuItem
            className="cursor-pointer"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>مساعدة</span>
          </DropdownMenuItem>
          {(userRole === 'admin' || userRole === 'marketing') && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/user-management")}
            >
              <Shield className="mr-2 h-4 w-4" />
              <span>إدارة المستخدمين</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer focus:bg-destructive/10 focus:text-destructive" 
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
