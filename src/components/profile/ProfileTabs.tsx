
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileData } from "@/types/profile";
import { Activity } from "@/hooks/useActivityLog";
import PersonalInfoCard from "./PersonalInfoCard";
import PasswordManagementCard from "./PasswordManagementCard";
import ActivityLog from "./ActivityLog";
import ActivateAdminButton from "./ActivateAdminButton";
import { useTranslation } from "react-i18next";
import { User, Lock, ClipboardList } from "lucide-react";

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

  const tabItems = [
    {
      id: "account",
      label: t("profile.tabs.account", "الحساب"),
      icon: <User className="h-4 w-4 mr-1" />
    },
    {
      id: "security",
      label: t("profile.tabs.security", "الأمان"),
      icon: <Lock className="h-4 w-4 mr-1" />
    },
    {
      id: "activity",
      label: t("profile.tabs.activity", "سجل النشاط"),
      icon: <ClipboardList className="h-4 w-4 mr-1" />
    }
  ];

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-3 bg-background border border-muted rounded-lg p-1">
        {tabItems.map((tab) => (
          <TabsTrigger 
            key={tab.id}
            value={tab.id} 
            className="flex items-center gap-1.5 rounded-md data-[state=active]:bg-beauty-purple/10 data-[state=active]:text-beauty-purple"
          >
            {tab.icon}
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="account" className="space-y-4 animate-fade-in">
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
      
      <TabsContent value="security" className="space-y-4 animate-fade-in">
        <PasswordManagementCard
          onChangePassword={onChangePassword}
          isChangingPassword={changingPassword}
          onLogoutOtherSessions={onLogoutOtherSessions}
          loggingOut={loggingOut}
        />
      </TabsContent>
      
      <TabsContent value="activity" className="animate-fade-in">
        <ActivityLog 
          activities={activities}
          isLoading={activitiesLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
