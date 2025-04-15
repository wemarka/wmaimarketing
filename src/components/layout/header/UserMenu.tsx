
import React from "react";
import {
  User,
  Settings,
  Lock,
  HelpCircle,
  UserCog,
  LogOut
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

interface UserMenuProps {
  userEmail: string | undefined;
  onSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ userEmail, onSignOut }) => {
  const isAdmin = userEmail === "admin@beauti.com";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 pl-2">
          <Avatar className="h-8 w-8">
            <div className="bg-primary/20 text-primary flex h-full w-full items-center justify-center rounded-full">
              {userEmail?.charAt(0).toUpperCase() || 'ب'}
            </div>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium">
              {userEmail?.split('@')[0] || 'بيوتي'}
            </span>
            <span className="text-xs text-muted-foreground">
              مدير
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2 border-b">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userEmail}</p>
              <p className="text-xs leading-none text-muted-foreground">حساب مديرة</p>
            </div>
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
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
          {isAdmin && (
            <DropdownMenuItem asChild>
              <a href="/users" className="cursor-pointer flex items-center">
                <UserCog className="ml-2 h-4 w-4" />
                <span>إدارة المستخدمين</span>
              </a>
            </DropdownMenuItem>
          )}
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
