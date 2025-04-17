
import React from "react";
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

const Profile = () => {
  const { loading, profileData } = useProfile();

  return (
    <ProfileAuthGuard>
      <Layout>
        <Helmet>
          <title>الملف الشخصي - سيركل</title>
        </Helmet>

        {loading ? (
          <ProfileLoading />
        ) : !profileData ? (
          <ProfileError />
        ) : (
          <div className="container pb-12">
            <ProfileHeader />
            
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="md:w-1/4">
                <ProfileSidebar />
              </div>
              
              <div className="flex-1">
                <Tabs defaultValue="personal" className="w-full">
                  <ProfileTabs />
                  
                  <ProfileContent>
                    <TabsContent value="personal">
                      <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PersonalInfoCard />
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
                        <PasswordManagementCard />
                        <SessionsInfo />
                      </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="activity">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ActivityLog />
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
