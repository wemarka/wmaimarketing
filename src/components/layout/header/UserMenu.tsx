
import React from "react";
import {
  User,
  Settings,
  Lock,
  HelpCircle,
  UserCog,
  LogOut,
  Shield,
  Users,
  BarChart4,
  Palette,
  FileText,
  PenTool,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AppRole } from "@/types/profile";

interface UserMenuProps {
  userEmail: string | undefined;
  onSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ userEmail, onSignOut }) => {
  const getUserRole = (): AppRole => {
    // For demonstration, we'll determine role based on email
    if (userEmail?.includes('admin')) return 'admin';
    if (userEmail?.includes('marketing')) return 'marketing';
    if (userEmail?.includes('designer')) return 'designer';
    if (userEmail?.includes('editor')) return 'editor';
    if (userEmail?.includes('analyst')) return 'analyst';
    if (userEmail?.includes('manager')) return 'manager';
    return 'user';
  };
  
  const userRole = getUserRole();
  
  // Determine role-specific properties
  const roleInfo = {
    admin: { 
      title: "مدير", 
      color: "red", 
      icon: <Shield className="ml-2 h-4 w-4" />,
      description: "وصول كامل للنظام"
    },
    marketing: { 
      title: "تسويق", 
      color: "blue", 
      icon: <BarChart4 className="ml-2 h-4 w-4" />,
      description: "إدارة المحتوى التسويقي" 
    },
    designer: { 
      title: "مصمم", 
      color: "purple", 
      icon: <Palette className="ml-2 h-4 w-4" />,
      description: "إنشاء وتعديل التصاميم"
    },
    editor: { 
      title: "محرر", 
      color: "cyan", 
      icon: <FileText className="ml-2 h-4 w-4" />,
      description: "تحرير المحتوى"
    },
    analyst: { 
      title: "محلل", 
      color: "green", 
      icon: <BarChart4 className="ml-2 h-4 w-4" />,
      description: "تحليل البيانات والتقارير"
    },
    manager: { 
      title: "مسؤول", 
      color: "orange", 
      icon: <Users className="ml-2 h-4 w-4" />,
      description: "إدارة الفرق والمشاريع"
    },
    user: { 
      title: "مستخدم", 
      color: "gray", 
      icon: <User className="ml-2 h-4 w-4" />,
      description: "صلاحيات أساسية"
    }
  };
  
  const currentRoleInfo = roleInfo[userRole];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 pl-2">
          <Avatar className="h-8 w-8">
            <div className={cn(`bg-${currentRoleInfo.color}-100 text-${currentRoleInfo.color}-800 flex h-full w-full items-center justify-center rounded-full`)}>
              {userEmail?.charAt(0).toUpperCase() || 'ب'}
            </div>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium">
              {userEmail?.split('@')[0] || 'بيوتي'}
            </span>
            <span className="text-xs text-muted-foreground">
              {currentRoleInfo.title}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-4 border-b">
          <DropdownMenuLabel className="font-normal p-0">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">{userEmail}</p>
                <Badge 
                  variant="outline" 
                  className={cn(`bg-${currentRoleInfo.color}-100 text-${currentRoleInfo.color}-800 hover:bg-${currentRoleInfo.color}-100`)}
                >
                  {currentRoleInfo.title}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground pt-1">{currentRoleInfo.description}</p>
            </div>
          </DropdownMenuLabel>
        </div>
        
        <div className="py-2">
          {/* Role-specific actions */}
          {userRole === 'admin' && (
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a href="/user-management" className="cursor-pointer flex items-center">
                  <UserCog className="ml-2 h-4 w-4 text-red-600" />
                  <span>إدارة المستخدمين</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
          )}
          
          {userRole === 'marketing' && (
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a href="/content-tools" className="cursor-pointer flex items-center">
                  <FileText className="ml-2 h-4 w-4 text-blue-600" />
                  <span>أدوات المحتوى</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/analytics" className="cursor-pointer flex items-center">
                  <BarChart4 className="ml-2 h-4 w-4 text-blue-600" />
                  <span>تحليلات التسويق</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
          )}
          
          {userRole === 'designer' && (
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a href="/ad-designer" className="cursor-pointer flex items-center">
                  <PenTool className="ml-2 h-4 w-4 text-purple-600" />
                  <span>تصميم الإعلانات</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
          )}
        </div>
        
        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem asChild>
            <a href="/profile" className="cursor-pointer flex items-center">
              <User className="ml-2 h-4 w-4" />
              <span>الملف الشخصي</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/profile?tab=settings" className="cursor-pointer flex items-center">
              <Settings className="ml-2 h-4 w-4" />
              <span>الإعدادات</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/profile?tab=security" className="cursor-pointer flex items-center">
              <Lock className="ml-2 h-4 w-4" />
              <span>الأمان والخصوصية</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <a href="/documentation" className="cursor-pointer flex items-center">
              <HelpCircle className="ml-2 h-4 w-4" />
              <span>المساعدة</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 focus:text-red-500 hover:text-red-500 flex items-center"
          onClick={onSignOut}
        >
          <LogOut className="ml-2 h-4 w-4" />
          <span>تسجيل الخروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
