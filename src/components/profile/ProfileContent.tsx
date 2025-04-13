
import React from "react";
import { ProfileData } from "@/types/profile";
import { Activity } from "@/hooks/useActivityLog";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";

interface ProfileContentProps {
  profileData: ProfileData;
  userEmail: string;
  userInitials: string;
  onUpdateProfile: (data: any) => Promise<void>;
  onChangePassword: (data: any) => Promise<void>;
  onLogoutOtherSessions: () => Promise<void>;
  onAvatarChange: (url: string) => void;
  updating: boolean;
  changingPassword: boolean;
  loggingOut: boolean;
  activities: Activity[];
  activitiesLoading: boolean;
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
  activitiesLoading
}: ProfileContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
      {/* Profile sidebar */}
      <ProfileSidebar
        avatarUrl={profileData?.avatar_url || null}
        userInitials={userInitials}
        firstName={profileData?.first_name || ''}
        lastName={profileData?.last_name || ''}
        role={profileData?.role || 'مستخدم'}
        onAvatarChange={onAvatarChange}
      />

      {/* Profile content */}
      <div className="space-y-6">
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
        />
      </div>
    </div>
  );
};

export default ProfileContent;
