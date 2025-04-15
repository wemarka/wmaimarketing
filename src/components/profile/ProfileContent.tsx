
import React from "react";
import { ProfileData } from "@/types/profile";
import { Activity } from "@/hooks/useActivityLog";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import ActivateAdminButton from "./ActivateAdminButton";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

interface ProfileContentProps {
  profileData: ProfileData;
  userEmail: string;
  userInitials: string;
  onUpdateProfile: (data: any) => Promise<void>;
  onChangePassword: (data: any) => Promise<void>;
  onLogoutOtherSessions: () => Promise<void>;
  onAvatarChange: (file: File) => void;
  updating: boolean;
  changingPassword: boolean;
  loggingOut: boolean;
  activities: Activity[];
  activitiesLoading: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileContent = ({
  profileData,
  userEmail,
  userInitials,
  onUpdateProfile,
  onChangePassword,
  onLogoutOtherSessions,
  onAvatarChange,
  updating,
  changingPassword,
  loggingOut,
  activities,
  activitiesLoading,
  activeTab,
  onTabChange
}: ProfileContentProps) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  // For mobile: When sidebar tab is clicked, update the main tabs
  const handleTabChange = (tab: string) => {
    onTabChange(tab);
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-6 md:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Developer Admin Activation Button (visible during development) */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-amber-800">وضع المطور</h3>
            <p className="text-sm text-amber-700">
              هذه المنطقة مخصصة للمطورين فقط. استخدم الزر أدناه لتفعيل صلاحيات المدير للتطوير.
            </p>
          </div>
          <ActivateAdminButton 
            className="bg-amber-600 text-white hover:bg-amber-700" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 lg:gap-8">
        {/* Profile sidebar */}
        <ProfileSidebar
          avatarUrl={profileData?.avatar_url || null}
          userInitials={userInitials}
          firstName={profileData?.first_name || ''}
          lastName={profileData?.last_name || ''}
          role={profileData?.role || 'مستخدم'}
          onAvatarChange={onAvatarChange}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Profile content */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProfileTabs
            profileData={profileData}
            userEmail={userEmail}
            onUpdateProfile={onUpdateProfile}
            onChangePassword={onChangePassword}
            onLogoutOtherSessions={onLogoutOtherSessions}
            updating={updating}
            changingPassword={changingPassword}
            loggingOut={loggingOut}
            activities={activities}
            activitiesLoading={activitiesLoading}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileContent;
