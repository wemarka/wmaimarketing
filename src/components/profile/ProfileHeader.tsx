
import React from "react";

interface ProfileHeaderProps {
  title?: string;
  subtitle?: string;
}

const ProfileHeader = ({
  title = "الملف الشخصي",
  subtitle = "إدارة حسابك ومعلوماتك الشخصية"
}: ProfileHeaderProps) => {
  return (
    <div className="space-y-2 mb-8">
      <h1>{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default ProfileHeader;
