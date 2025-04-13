
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalInfoForm from "./PersonalInfoForm";
import { ProfileData } from "@/types/profile";

interface PersonalInfoCardProps {
  profileData: ProfileData;
  userEmail: string;
  onUpdateProfile: (data: any) => Promise<void>;
  isUpdating: boolean;
}

const PersonalInfoCard = ({ 
  profileData, 
  userEmail, 
  onUpdateProfile, 
  isUpdating 
}: PersonalInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>المعلومات الشخصية</CardTitle>
        <CardDescription>
          قم بتحديث معلومات الملف الشخصي الخاص بك
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PersonalInfoForm 
          profileData={profileData} 
          userEmail={userEmail} 
          onUpdateProfile={onUpdateProfile} 
          isUpdating={isUpdating}
        />
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
