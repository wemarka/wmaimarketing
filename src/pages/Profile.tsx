
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useActivityLog, Activity } from "@/hooks/useActivityLog";

// Import components
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
        <div className="max-w-5xl mx-auto">
          <div className="space-y-2 mb-8">
            <h1>الملف الشخصي</h1>
            <p className="text-muted-foreground">
              إدارة حسابك ومعلوماتك الشخصية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            <div className="space-y-6">
              <Skeleton className="h-32 w-32 rounded-full mx-auto" />
              <Skeleton className="h-6 w-40 mx-auto" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>

            <div className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const emptyProfile = { 
    id: user.id, 
    first_name: '', 
    last_name: '', 
    avatar_url: null, 
    role: 'مستخدم',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString() 
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1>الملف الشخصي</h1>
          <p className="text-muted-foreground">
            إدارة حسابك ومعلوماتك الشخصية
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>خطأ</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Profile sidebar */}
          <ProfileSidebar
            avatarUrl={profileData?.avatar_url || null}
            userInitials={getUserInitials()}
            firstName={profileData?.first_name || ''}
            lastName={profileData?.last_name || ''}
            role={profileData?.role || 'مستخدم'}
            onAvatarChange={handleAvatarChange}
          />

          {/* Profile content */}
          <div className="space-y-6">
            <ProfileTabs
              profileData={profileData || emptyProfile}
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
