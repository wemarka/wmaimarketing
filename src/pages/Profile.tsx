
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useActivityLog } from "@/hooks/useActivityLog";

// Import components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileContent from "@/components/profile/ProfileContent";
import ProfileLoading from "@/components/profile/ProfileLoading";
import ProfileError from "@/components/profile/ProfileError";
import ProfileAuthGuard from "@/components/profile/ProfileAuthGuard";

const Profile = () => {
  const { user } = useAuth();
  const {
    profileData,
    loading,
    updating,
    changingPassword,
    onUpdateProfile,
    onChangePassword,
    updateAvatarUrl,
    getUserInitials,
    createProfile
  } = useProfile();
  
  const { activities, loading: activitiesLoading, logActivity } = useActivityLog();
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ensure profile exists
  useEffect(() => {
    if (!loading && !profileData && user) {
      const ensureProfile = async () => {
        try {
          await createProfile();
          setError(null);
        } catch (err) {
          console.error("Failed to create profile:", err);
          setError("فشل إنشاء الملف الشخصي. يرجى تحديث الصفحة أو تسجيل الدخول مرة أخرى.");
        }
      };
      
      ensureProfile();
    }
  }, [loading, profileData, user, createProfile]);

  // Handle logout other sessions
  const handleLogoutOtherSessions = async () => {
    setLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: 'others' });
      
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج من جميع الجلسات الأخرى بنجاح",
      });

      // Log activity
      logActivity("logout", "تم تسجيل الخروج من جميع الجلسات الأخرى");
    } catch (error) {
      console.error("Error signing out other sessions:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء محاولة تسجيل الخروج من الجلسات الأخرى",
        variant: "destructive",
      });
    } finally {
      setLoggingOut(false);
    }
  };

  // Handle profile update with activity logging
  const handleUpdateProfile = async (data: any) => {
    try {
      await onUpdateProfile(data);
      logActivity("profile_update", "تم تحديث معلومات الملف الشخصي");
      setError(null);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  // Handle password change with activity logging
  const handleChangePassword = async (data: any) => {
    try {
      await onChangePassword(data);
      logActivity("password_change", "تم تغيير كلمة المرور");
    } catch (err) {
      console.error("Password change failed:", err);
    }
  };

  // Handle avatar change with activity logging
  const handleAvatarChange = async (url: string) => {
    try {
      await updateAvatarUrl(url);
      logActivity("profile_update", "تم تحديث الصورة الشخصية");
      setError(null);
    } catch (err) {
      console.error("Avatar update failed:", err);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <ProfileHeader />
        
        <ProfileAuthGuard>
          <ProfileError error={error} />
          
          {loading ? (
            <ProfileLoading />
          ) : (
            profileData && (
              <ProfileContent
                profileData={profileData}
                userEmail={user?.email || ""}
                userInitials={getUserInitials()}
                onUpdateProfile={handleUpdateProfile}
                onChangePassword={handleChangePassword}
                onLogoutOtherSessions={handleLogoutOtherSessions}
                onAvatarChange={handleAvatarChange}
                updating={updating}
                changingPassword={changingPassword}
                loggingOut={loggingOut}
                activities={activities}
                activitiesLoading={activitiesLoading}
              />
            )
          )}
        </ProfileAuthGuard>
      </div>
    </Layout>
  );
};

export default Profile;
