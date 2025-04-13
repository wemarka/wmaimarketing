
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Shield, Clock, UserCog, FileText } from "lucide-react";
import ProfilePicture from "./ProfilePicture";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ProfileSidebarProps {
  avatarUrl: string | null;
  userInitials: string;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  onAvatarChange: (url: string) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const ProfileSidebar = ({
  avatarUrl,
  userInitials,
  firstName,
  lastName,
  role,
  onAvatarChange,
  activeTab = "account",
  onTabChange
}: ProfileSidebarProps) => {
  const isMobile = useIsMobile();

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <motion.div 
      className="space-y-6 bg-card p-6 rounded-lg shadow-sm border"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProfilePicture 
        avatarUrl={avatarUrl} 
        userInitials={userInitials} 
        onAvatarChange={onAvatarChange}
      />
      
      <div className="flex flex-col items-center">
        <motion.h3 
          className="font-medium text-lg bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {`${firstName || ''} ${lastName || ''}`}
        </motion.h3>
        <motion.p 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {role || 'مستخدم'}
        </motion.p>
      </div>
      
      <Separator className="my-2" />
      
      <nav className="flex flex-col space-y-1">
        <Button 
          variant={activeTab === "account" ? "default" : "ghost"} 
          className={cn(
            "justify-start transition-all",
            activeTab === "account" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
          )}
          onClick={() => handleTabClick("account")}
        >
          <User className="ml-2 h-4 w-4" />
          <span>معلومات الحساب</span>
        </Button>
        <Button 
          variant={activeTab === "security" ? "default" : "ghost"}
          className={cn(
            "justify-start transition-all",
            activeTab === "security" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
          )}
          onClick={() => handleTabClick("security")}
        >
          <Shield className="ml-2 h-4 w-4" />
          <span>الأمان</span>
        </Button>
        <Button 
          variant={activeTab === "activity" ? "default" : "ghost"}
          className={cn(
            "justify-start transition-all",
            activeTab === "activity" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
          )}
          onClick={() => handleTabClick("activity")}
        >
          <Clock className="ml-2 h-4 w-4" />
          <span>سجل النشاط</span>
        </Button>
        {!isMobile && (
          <>
            <Button variant="ghost" className="justify-start">
              <UserCog className="ml-2 h-4 w-4" />
              <span>التفضيلات</span>
            </Button>
            <Button variant="ghost" className="justify-start">
              <FileText className="ml-2 h-4 w-4" />
              <span>التوثيق</span>
            </Button>
          </>
        )}
      </nav>
    </motion.div>
  );
};

export default ProfileSidebar;
