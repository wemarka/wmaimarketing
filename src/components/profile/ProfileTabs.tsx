
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileData } from "@/types/profile";
import { Activity } from "@/hooks/useActivityLog";
import PersonalInfoCard from "./PersonalInfoCard";
import PasswordManagementCard from "./PasswordManagementCard";
import ActivityLog from "./ActivityLog";
import ActivateAdminButton from "./ActivateAdminButton";
import { useTranslation } from "react-i18next";

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
  activeTab: string;
  onTabChange: (tab: string) => void;
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
  activeTab,
  onTabChange,
}: ProfileTabsProps) => {
  const { t } = useTranslation();
  
  // Check if this user is the target admin - can be any email you want to designate
  const isTargetAdmin = true; // Allow any user to activate admin during development

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">{t("profile.tabs.account", "Profile")}</TabsTrigger>
        <TabsTrigger value="security">{t("profile.tabs.security", "Security")}</TabsTrigger>
        <TabsTrigger value="activity">{t("profile.tabs.activity", "Activity Log")}</TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="space-y-4">
        <PersonalInfoCard 
          profileData={profileData} 
          userEmail={userEmail}
          onUpdateProfile={onUpdateProfile}
          isUpdating={updating}
        />
        
        {isTargetAdmin && profileData.role !== "admin" && (
          <div className="mt-4">
            <ActivateAdminButton className="w-full" />
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="security" className="space-y-4">
        <PasswordManagementCard
          onChangePassword={onChangePassword}
          isChangingPassword={changingPassword}
          onLogoutOtherSessions={onLogoutOtherSessions}
          loggingOut={loggingOut}
        />
      </TabsContent>
      
      <TabsContent value="activity">
        <ActivityLog 
          activities={activities}
          isLoading={activitiesLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
