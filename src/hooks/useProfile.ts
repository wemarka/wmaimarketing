
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProfileData } from "./useProfileData";
import { useProfileUpdates } from "./useProfileUpdates";
import { usePasswordManagement } from "./usePasswordManagement";
import { ProfileFormValues, PasswordFormValues } from "@/types/profile";

export const useProfile = () => {
  const { user } = useAuth();
  const { 
    profileData, 
    loading, 
    getUserInitials, 
    createProfile 
  } = useProfileData();

  const {
    updating,
    onUpdateProfile,
    updateAvatarUrl
  } = useProfileUpdates(profileData);

  const {
    changingPassword,
    onChangePassword
  } = usePasswordManagement();

  return {
    profileData,
    loading,
    updating,
    changingPassword,
    onUpdateProfile,
    onChangePassword,
    updateAvatarUrl,
    getUserInitials,
    createProfile
  };
};
