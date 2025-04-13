
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity } from "@/hooks/useActivityLog";
import { ProfileData } from "@/types/profile";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

// Import components
import PersonalInfoCard from "./PersonalInfoCard";
import PasswordManagementCard from "./PasswordManagementCard";
import SessionsInfo from "./SessionsInfo";
import ActivityLog from "./ActivityLog";

interface ProfileTabsProps {
  profileData: ProfileData;
  userEmail: string;
  onUpdateProfile: (data: any) => Promise<void>;
  onChangePassword: (data: any) => Promise<void>;
  onLogoutOtherSessions: () => Promise<void>;
  updating: boolean;
  changingPassword: boolean;
  loggingOut: boolean;
  activities: Activity[];
  activitiesLoading: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const ProfileTabs = ({
  profileData,
  userEmail,
  onUpdateProfile,
  onChangePassword,
  onLogoutOtherSessions,
  updating,
  changingPassword,
  loggingOut,
  activities,
  activitiesLoading,
  activeTab = "account",
  onTabChange
}: ProfileTabsProps) => {
  const isMobile = useIsMobile();

  const handleValueChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  // Animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <Tabs 
      defaultValue="account" 
      value={activeTab}
      onValueChange={handleValueChange} 
      className="w-full"
    >
      {isMobile && (
        <TabsList className="grid grid-cols-3 mb-6 sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
          <TabsTrigger value="account">معلومات الحساب</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="activity">سجل النشاط</TabsTrigger>
        </TabsList>
      )}
      
      <TabsContent value="account" className="space-y-6 pt-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tabContentVariants}
        >
          <PersonalInfoCard 
            profileData={profileData} 
            userEmail={userEmail} 
            onUpdateProfile={onUpdateProfile} 
            isUpdating={updating}
          />
        </motion.div>
      </TabsContent>
      
      <TabsContent value="security" className="space-y-6 pt-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tabContentVariants}
        >
          <PasswordManagementCard 
            onChangePassword={onChangePassword} 
            isChangingPassword={changingPassword}
          />
          
          <SessionsInfo 
            onLogoutOtherSessions={onLogoutOtherSessions}
            isLoading={loggingOut}
          />
        </motion.div>
      </TabsContent>

      <TabsContent value="activity" className="space-y-6 pt-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tabContentVariants}
        >
          <ActivityLog 
            activities={activities} 
            isLoading={activitiesLoading} 
          />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
