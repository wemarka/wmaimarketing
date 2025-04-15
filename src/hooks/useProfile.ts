
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
  } = useProfileUpdates();

  const {
    changingPassword,
    changePassword, // This was incorrectly referenced as onChangePassword
    loggingOut,
    logoutOtherSessions
  } = usePasswordManagement();

  return {
    profileData,
    loading,
    updating,
    changingPassword,
    loggingOut,
    onUpdateProfile,
    onChangePassword: changePassword, // Map to match the external API
    updateAvatarUrl,
    getUserInitials,
    createProfile,
    onLogoutOtherSessions: logoutOtherSessions // Map for consistency
  };
};
