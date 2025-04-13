
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";

interface ProfileAuthGuardProps {
  children: React.ReactNode;
}

const ProfileAuthGuard = ({ children }: ProfileAuthGuardProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("ProfileAuthGuard - Loading:", loading);
    console.log("ProfileAuthGuard - User:", user ? "authenticated" : "not authenticated");
  }, [loading, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-t-beauty-purple border-beauty-lightpurple border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">
            {t('auth.verifyingUser')}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("ProfileAuthGuard - Redirecting to auth page");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log("ProfileAuthGuard - Rendering protected content");
  return <>{children}</>;
};

export default ProfileAuthGuard;
