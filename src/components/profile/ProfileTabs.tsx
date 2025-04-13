
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity } from "@/hooks/useActivityLog";
import { ProfileData } from "@/types/profile";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

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
  activitiesLoading
}: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="account" className="w-full" dir="rtl">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="account">معلومات الحساب</TabsTrigger>
        <TabsTrigger value="security">الأمان</TabsTrigger>
        <TabsTrigger value="activity">سجل النشاط</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account" className="space-y-6 pt-4">
        <PersonalInfoCard 
          profileData={profileData} 
          userEmail={userEmail} 
          onUpdateProfile={onUpdateProfile} 
          isUpdating={updating}
        />
      </TabsContent>
      
      <TabsContent value="security" className="space-y-6 pt-4">
        <PasswordManagementCard 
          onChangePassword={onChangePassword} 
          isChangingPassword={changingPassword}
        />
        
        <SessionsInfo 
          onLogoutOtherSessions={onLogoutOtherSessions}
          isLoading={loggingOut}
        />
      </TabsContent>

      <TabsContent value="activity" className="space-y-6 pt-4">
        <ActivityLog 
          activities={activities} 
          isLoading={activitiesLoading} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
