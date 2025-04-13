
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProfileAuthGuardProps {
  children: React.ReactNode;
}

const ProfileAuthGuard = ({ children }: ProfileAuthGuardProps) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg">يرجى تسجيل الدخول للوصول إلى صفحة الملف الشخصي</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProfileAuthGuard;
