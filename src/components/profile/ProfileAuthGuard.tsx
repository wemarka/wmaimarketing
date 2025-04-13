
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface ProfileAuthGuardProps {
  children: React.ReactNode;
}

const ProfileAuthGuard = ({ children }: ProfileAuthGuardProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const [loadingTime, setLoadingTime] = useState(0);
  const [forceRedirect, setForceRedirect] = useState(false);

  useEffect(() => {
    console.log("ProfileAuthGuard - Loading:", loading);
    console.log("ProfileAuthGuard - User:", user ? "authenticated" : "not authenticated");
  }, [loading, user]);

  // Safety timeout to prevent infinite loading
  useEffect(() => {
    if (loading) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setLoadingTime(elapsedTime);
        
        // Force redirect after 2 seconds of loading (reduced from 3)
        if (elapsedTime >= 2) {
          console.log("ProfileAuthGuard - Loading timeout reached, forcing redirect");
          setForceRedirect(true);
          clearInterval(timer);
        }
      }, 500); // Check more frequently
      
      return () => clearInterval(timer);
    }
  }, [loading]);

  if (forceRedirect && !user) {
    console.log("ProfileAuthGuard - Forcing redirect to auth page due to timeout");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Only show loading for a maximum of 2 seconds
  if (loading && loadingTime < 2) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-[60vh]"
      >
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-t-beauty-purple border-beauty-lightpurple border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">
            {t('auth.verifyingUser')}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {t('auth.loadingForSeconds', { seconds: loadingTime })}
          </p>
        </div>
      </motion.div>
    );
  }

  if (!user) {
    console.log("ProfileAuthGuard - Redirecting to auth page");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log("ProfileAuthGuard - Rendering protected content");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default ProfileAuthGuard;
