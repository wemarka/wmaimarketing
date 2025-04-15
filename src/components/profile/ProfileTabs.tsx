
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileData } from "@/types/profile";
import { Activity } from "@/hooks/useActivityLog";
import PersonalInfoCard from "./PersonalInfoCard";
import PasswordManagementCard from "./PasswordManagementCard";
import ActivityLog from "./ActivityLog";
import ActivateAdminButton from "./ActivateAdminButton";

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
  // Check if this user is the target admin
  const isTargetAdmin = userEmail === "abdalrhmanalhosary@gmail.com";

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">الملف الشخصي</TabsTrigger>
        <TabsTrigger value="security">الأمان</TabsTrigger>
        <TabsTrigger value="activity">سجل النشاط</TabsTrigger>
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
          onLogoutOtherSessions={onLogoutOtherSessions}
          isChangingPassword={changingPassword}
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
