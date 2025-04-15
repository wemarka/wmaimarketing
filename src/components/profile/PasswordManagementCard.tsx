import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChangePasswordForm from "./ChangePasswordForm";
import { motion } from "framer-motion";
import { KeyRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PasswordManagementCardProps {
  onChangePassword: (data: any) => Promise<void>;
  isChangingPassword: boolean;
  onLogoutOtherSessions?: () => Promise<void>;
  loggingOut?: boolean;
}

const PasswordManagementCard = ({
  onChangePassword,
  isChangingPassword,
  onLogoutOtherSessions,
  loggingOut = false
}: PasswordManagementCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="hover:shadow-xl transition-all duration-300"
    >
      <Card className="overflow-hidden border-2 border-border/30 shadow-md relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 z-0"></div>
        <CardHeader className="bg-card/50 backdrop-blur-sm flex flex-row items-center gap-4 relative z-10">
          <div className="p-2 rounded-full bg-primary/10">
            <KeyRound className="h-6 w-6 text-primary" />
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
        <CardContent className="p-6 relative z-10">
          <ChangePasswordForm 
            onChangePassword={onChangePassword} 
            isChangingPassword={isChangingPassword}
          />
          
          {onLogoutOtherSessions && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-medium mb-3">الجلسات النشطة</h3>
              <p className="text-sm text-muted-foreground mb-4">
                يمكنك تسجيل الخروج من جميع الجلسات الأخرى على جميع الأجهزة
              </p>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={onLogoutOtherSessions}
                disabled={loggingOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {loggingOut ? "جاري تسجيل الخروج..." : "تسجيل الخروج من الجلسات الأخرى"}
              </Button>
            </div>
          )}
          
          <div className="mt-6 p-4 rounded-md bg-blue-50 border border-blue-200">
            <h4 className="text-sm font-medium text-blue-700 mb-2">نصائح لكلمة مرور قوية:</h4>
            <ul className="text-xs text-blue-600 space-y-1 list-disc list-inside">
              <li>استخدم 8 أحرف على الأقل</li>
              <li>دمج بين الأحرف الكبيرة والصغيرة</li>
              <li>استخدم الأرقام والرموز الخاصة</li>
              <li>��جنب المعلومات الشخصية المعروفة</li>
              <li>استخدم كلمات مرور مختلفة للحسابات المختلفة</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PasswordManagementCard;
