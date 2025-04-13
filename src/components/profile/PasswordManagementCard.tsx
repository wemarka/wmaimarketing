
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChangePasswordForm from "./ChangePasswordForm";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface PasswordManagementCardProps {
  onChangePassword: (data: any) => Promise<void>;
  isChangingPassword: boolean;
}

const PasswordManagementCard = ({
  onChangePassword,
  isChangingPassword
}: PasswordManagementCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-2 border-border/30 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="bg-card/50 backdrop-blur-sm flex flex-row items-center gap-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              تغيير كلمة المرور
            </CardTitle>
            <CardDescription>
              قم بتغيير كلمة المرور الخاصة بك للحفاظ على أمان حسابك
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ChangePasswordForm 
            onChangePassword={onChangePassword} 
            isChangingPassword={isChangingPassword}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PasswordManagementCard;
