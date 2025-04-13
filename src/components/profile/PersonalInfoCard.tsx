
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalInfoForm from "./PersonalInfoForm";
import { ProfileData } from "@/types/profile";
import { motion } from "framer-motion";
import { UserCog } from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="hover:shadow-xl transition-all duration-300"
    >
      <Card className="overflow-hidden border-2 border-border/30 shadow-md relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 z-0"></div>
        <CardHeader className="bg-card/50 backdrop-blur-sm flex flex-row items-center gap-4 relative z-10">
          <div className="p-2 rounded-full bg-primary/10">
            <UserCog className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              المعلومات الشخصية
            </CardTitle>
            <CardDescription>
              قم بتحديث معلومات الملف الشخصي الخاص بك
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 relative z-10">
          <PersonalInfoForm 
            profileData={profileData} 
            userEmail={userEmail} 
            onUpdateProfile={onUpdateProfile} 
            isUpdating={isUpdating}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalInfoCard;
