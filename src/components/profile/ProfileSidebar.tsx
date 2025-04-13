
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Shield, Clock, UserCog, FileText } from "lucide-react";
import ProfilePicture from "./ProfilePicture";

interface ProfileSidebarProps {
  avatarUrl: string | null;
  userInitials: string;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  onAvatarChange: (url: string) => void;
}

const ProfileSidebar = ({
  avatarUrl,
  userInitials,
  firstName,
  lastName,
  role,
  onAvatarChange
}: ProfileSidebarProps) => {
  return (
    <div className="space-y-6">
      <ProfilePicture 
        avatarUrl={avatarUrl} 
        userInitials={userInitials} 
        onAvatarChange={onAvatarChange}
      />
      
      <div className="flex flex-col items-center">
        <h3 className="font-medium text-lg">{`${firstName || ''} ${lastName || ''}`}</h3>
        <p className="text-sm text-muted-foreground">{role || 'مستخدم'}</p>
      </div>
      
      <Separator />
      
      <nav className="flex flex-col space-y-1">
        <Button variant="ghost" className="justify-start">
          <User className="ml-2 h-4 w-4" />
          <span>معلومات الحساب</span>
        </Button>
        <Button variant="ghost" className="justify-start">
          <Shield className="ml-2 h-4 w-4" />
          <span>الأمان</span>
        </Button>
        <Button variant="ghost" className="justify-start">
          <Clock className="ml-2 h-4 w-4" />
          <span>سجل النشاط</span>
        </Button>
        <Button variant="ghost" className="justify-start">
          <UserCog className="ml-2 h-4 w-4" />
          <span>التفضيلات</span>
        </Button>
        <Button variant="ghost" className="justify-start">
          <FileText className="ml-2 h-4 w-4" />
          <span>التوثيق</span>
        </Button>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
