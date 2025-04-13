
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, UserCog, Clock, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useActivityLog } from "@/hooks/useActivityLog";

// Import components
import ProfilePicture from "@/components/profile/ProfilePicture";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import SessionsInfo from "@/components/profile/SessionsInfo";
import ActivityLog from "@/components/profile/ActivityLog";

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

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg">جاري تحميل البيانات...</p>
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
          <div className="space-y-6">
            <ProfilePicture 
              avatarUrl={profileData?.avatar_url} 
              userInitials={getUserInitials()} 
              onAvatarChange={updateAvatarUrl}
            />
            
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-lg">{`${profileData?.first_name || ''} ${profileData?.last_name || ''}`}</h3>
              <p className="text-sm text-muted-foreground">{profileData?.role || 'مستخدم'}</p>
            </div>
            
            <Separator />
            
            <nav className="flex flex-col space-y-1">
              <Button variant="ghost" className="justify-start">
                <User className="ml-2 h-4 w-4" />
                <span>معلومات الحساب</span>
              </Button>
              <Button variant="ghost" className="justify-start">
                <Shield className="ml-2 h-4 w-4" />
                <span>الأمان</span>
              </Button>
              <Button variant="ghost" className="justify-start">
                <Clock className="ml-2 h-4 w-4" />
                <span>سجل النشاط</span>
              </Button>
              <Button variant="ghost" className="justify-start">
                <UserCog className="ml-2 h-4 w-4" />
                <span>التفضيلات</span>
              </Button>
              <Button variant="ghost" className="justify-start">
                <FileText className="ml-2 h-4 w-4" />
                <span>التوثيق</span>
              </Button>
            </nav>
          </div>

          {/* Profile content */}
          <div className="space-y-6">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="account">معلومات الحساب</TabsTrigger>
                <TabsTrigger value="security">الأمان</TabsTrigger>
                <TabsTrigger value="activity">سجل النشاط</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>المعلومات الشخصية</CardTitle>
                    <CardDescription>
                      قم بتحديث معلومات الملف الشخصي الخاص بك
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PersonalInfoForm 
                      profileData={profileData!} 
                      userEmail={user?.email || ""} 
                      onUpdateProfile={handleUpdateProfile} 
                      isUpdating={updating}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>تغيير كلمة المرور</CardTitle>
                    <CardDescription>
                      قم بتغيير كلمة المرور الخاصة بك للحفاظ على أمان حسابك
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChangePasswordForm 
                      onChangePassword={handleChangePassword} 
                      isChangingPassword={changingPassword}
                    />
                  </CardContent>
                </Card>
                
                <SessionsInfo 
                  onLogoutOtherSessions={handleLogoutOtherSessions}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
