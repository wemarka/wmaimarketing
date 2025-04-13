import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useActivityLog, Activity } from "@/hooks/useActivityLog";

// Import components
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileTabs from "@/components/profile/ProfileTabs";

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
    getUserInitials
  } = useProfile();
  
  const { activities, loading: activitiesLoading, logActivity } = useActivityLog();
  const [loggingOut, setLoggingOut] = useState(false);

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
    await onUpdateProfile(data);
    logActivity("profile_update", "تم تحديث معلومات الملف الشخصي");
  };

  // Handle password change with activity logging
  const handleChangePassword = async (data: any) => {
    await onChangePassword(data);
    logActivity("password_change", "تم تغيير كلمة المرور");
  };

  // Handle avatar change with activity logging
  const handleAvatarChange = async (url: string) => {
    await updateAvatarUrl(url);
    logActivity("profile_update", "تم تحديث الصورة الشخصية");
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg">يرجى تسجيل الدخول للوصول إلى صفحة الملف الشخصي</p>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg">جاري تحميل البيانات...</p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg">تعذر تحميل بيانات الملف الشخصي. يرجى المحاولة مرة أخرى.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1>الملف الشخصي</h1>
          <p className="text-muted-foreground">
            إدارة حسابك ومعلوماتك الشخصية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Profile sidebar */}
          <ProfileSidebar
            avatarUrl={profileData?.avatar_url}
            userInitials={getUserInitials()}
            firstName={profileData?.first_name}
            lastName={profileData?.last_name}
            role={profileData?.role}
            onAvatarChange={handleAvatarChange}
          />

          {/* Profile content */}
          <div className="space-y-6">
            <ProfileTabs
              profileData={profileData}
              userEmail={user?.email || ""}
              onUpdateProfile={handleUpdateProfile}
              onChangePassword={handleChangePassword}
              onLogoutOtherSessions={handleLogoutOtherSessions}
              updating={updating}
              changingPassword={changingPassword}
              loggingOut={loggingOut}
              activities={activities}
              activitiesLoading={activitiesLoading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
