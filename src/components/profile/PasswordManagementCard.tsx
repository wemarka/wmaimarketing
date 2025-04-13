
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChangePasswordForm from "./ChangePasswordForm";

interface PasswordManagementCardProps {
  onChangePassword: (data: any) => Promise<void>;
  isChangingPassword: boolean;
}

const PasswordManagementCard = ({
  onChangePassword,
  isChangingPassword
}: PasswordManagementCardProps) => {
  return (
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
          isChangingPassword={isChangingPassword}
        />
      </CardContent>
    </Card>
  );
};

export default PasswordManagementCard;
