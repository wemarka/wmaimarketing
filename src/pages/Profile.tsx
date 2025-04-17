
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileContent from "@/components/profile/ProfileContent";
import ProfileLoading from "@/components/profile/ProfileLoading";
import ProfileError from "@/components/profile/ProfileError";
import ProfileAuthGuard from "@/components/profile/ProfileAuthGuard";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import PasswordManagementCard from "@/components/profile/PasswordManagementCard";
import ActivityLog from "@/components/profile/ActivityLog";
import AccountSecurityCard from "@/components/profile/AccountSecurityCard";
import SessionsInfo from "@/components/profile/SessionsInfo";
import { motion } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/context/AuthContext";
import { useActivityLog } from "@/hooks/useActivityLog";

const Profile = () => {
  const { user } = useAuth();
  const { 
    profileData, 
    loading, 
    updating,
    changingPassword,
    loggingOut,
    onUpdateProfile,
    onChangePassword, 
    updateAvatarUrl,
    getUserInitials,
    onLogoutOtherSessions 
  } = useProfile();
  
  const { activities, loading: activitiesLoading } = useActivityLog();
  const [activeTab, setActiveTab] = useState("personal");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ProfileAuthGuard>
      <Layout>
        <Helmet>
          <title>الملف الشخصي - سيركل</title>
        </Helmet>

        {loading ? (
          <ProfileLoading />
        ) : !profileData ? (
          <ProfileError error="تعذر تحميل بيانات الملف الشخصي" />
        ) : (
          <div className="container pb-12">
            <ProfileHeader />
            
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="md:w-1/4">
                <ProfileSidebar 
                  avatarUrl={profileData.avatar_url || null}
                  userInitials={getUserInitials}
                  firstName={profileData.first_name || null}
                  lastName={profileData.last_name || null}
                  role={profileData.role || null}
                  onAvatarChange={updateAvatarUrl}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>
              
              <div className="flex-1">
                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <ProfileTabs 
                    profileData={profileData}
                    userEmail={user?.email || ""}
                    onUpdateProfile={onUpdateProfile}
                    onChangePassword={onChangePassword}
                    onLogoutOtherSessions={onLogoutOtherSessions}
                    updating={updating}
                    changingPassword={changingPassword}
                    loggingOut={loggingOut}
                    activities={activities}
                    activitiesLoading={activitiesLoading}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                  />
                  
                  <ProfileContent
                    profileData={profileData}
                    userEmail={user?.email || ""}
                    userInitials={getUserInitials}
                    onUpdateProfile={onUpdateProfile}
                    onChangePassword={onChangePassword}
                    onLogoutOtherSessions={onLogoutOtherSessions}
                    onAvatarChange={updateAvatarUrl}
                    updating={updating}
                    changingPassword={changingPassword}
                    loggingOut={loggingOut}
                    activities={activities}
                    activitiesLoading={activitiesLoading}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                  >
                    <TabsContent value="personal">
                      <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PersonalInfoCard 
                          profileData={profileData}
                          userEmail={user?.email || ""}
                          onUpdateProfile={onUpdateProfile}
                          isUpdating={updating}
                        />
                      </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="security">
                      <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AccountSecurityCard />
                        <PasswordManagementCard 
                          onChangePassword={onChangePassword}
                          isChangingPassword={changingPassword}
                          onLogoutOtherSessions={onLogoutOtherSessions}
                          loggingOut={loggingOut}
                        />
                        <SessionsInfo />
                      </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="activity">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ActivityLog 
                          activities={activities} 
                          isLoading={activitiesLoading}
                        />
                      </motion.div>
                    </TabsContent>
                  </ProfileContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </ProfileAuthGuard>
  );
};

export default Profile;
