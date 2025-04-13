
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

  // Animation variants for buttons
  const buttonVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.03 }
  };

  const sidebarItems = [
    { id: 'account', icon: <User className="ml-2 h-4 w-4" />, label: 'معلومات الحساب' },
    { id: 'security', icon: <Shield className="ml-2 h-4 w-4" />, label: 'الأمان' },
    { id: 'activity', icon: <Clock className="ml-2 h-4 w-4" />, label: 'سجل النشاط' }
  ];

  const extraItems = [
    { id: 'preferences', icon: <UserCog className="ml-2 h-4 w-4" />, label: 'التفضيلات' },
    { id: 'documentation', icon: <FileText className="ml-2 h-4 w-4" />, label: 'التوثيق' }
  ];

  return (
    <motion.div 
      className="space-y-6 bg-card p-6 rounded-lg shadow-sm border border-border/40 backdrop-blur-sm"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
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
          whileHover={{ scale: 1.03 }}
        >
          {firstName || lastName ? `${firstName || ''} ${lastName || ''}` : 'المستخدم'}
        </motion.h3>
        <motion.span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {role || 'مستخدم'}
        </motion.span>
      </div>
      
      <Separator className="my-2 bg-border/60" />
      
      <nav className="flex flex-col space-y-1.5">
        {sidebarItems.map(item => (
          <motion.div 
            key={item.id}
            variants={buttonVariants}
            initial="inactive"
            animate={activeTab === item.id ? "active" : "inactive"}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant={activeTab === item.id ? "default" : "ghost"} 
              className={cn(
                "justify-start w-full transition-all text-sm",
                activeTab === item.id 
                  ? "bg-primary/10 text-primary hover:bg-primary/20 font-medium" 
                  : "hover:bg-muted/50"
              )}
              onClick={() => handleTabClick(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          </motion.div>
        ))}
        
        {!isMobile && (
          <>
            <Separator className="my-2 bg-border/60" />
            {extraItems.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="ghost" 
                  className="justify-start w-full text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              </motion.div>
            ))}
          </>
        )}
      </nav>
    </motion.div>
  );
};

export default ProfileSidebar;
