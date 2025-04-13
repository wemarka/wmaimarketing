
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, UserCog } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

// Import components
import ProfilePicture from "@/components/profile/ProfilePicture";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import SessionsInfo from "@/components/profile/SessionsInfo";

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
  
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogoutOtherSessions = async () => {
    setLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: 'others' });
      
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج من جميع الجلسات الأخرى بنجاح",
      });
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
                <UserCog className="ml-2 h-4 w-4" />
                <span>التفضيلات</span>
              </Button>
            </nav>
          </div>

          {/* Profile content */}
          <div className="space-y-6">
            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="account">معلومات الحساب</TabsTrigger>
                <TabsTrigger value="security">الأمان</TabsTrigger>
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
                      onUpdateProfile={onUpdateProfile} 
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
                      onChangePassword={onChangePassword} 
                      isChangingPassword={changingPassword}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>جلسات تسجيل الدخول</CardTitle>
                    <CardDescription>
                      إدارة جلسات تسجيل الدخول النشطة على حسابك
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SessionsInfo 
                      onLogoutOtherSessions={handleLogoutOtherSessions}
                      isLoading={loggingOut}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
