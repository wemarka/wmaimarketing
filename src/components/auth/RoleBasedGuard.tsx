
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface RoleBasedGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
}

const RoleBasedGuard = ({ 
  children, 
  allowedRoles, 
  fallbackPath = "/dashboard"
}: RoleBasedGuardProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const [loadingTime, setLoadingTime] = useState(0);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  // Debug loading state
  useEffect(() => {
    console.log("RoleBasedGuard - Loading:", loading);
    console.log("RoleBasedGuard - User:", user ? "authenticated" : "not authenticated");
    console.log("RoleBasedGuard - Role:", profile?.role);
  }, [loading, user, profile]);

  // Handle loading state and timing
  useEffect(() => {
    if (loading) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setLoadingTime(elapsedTime);
        
        // Show redirect message sooner (after 1 second)
        if (elapsedTime >= 1) {
          setShowRedirectMessage(true);
        }
        
        // Safety timeout to avoid infinite loading (after 3 seconds)
        if (elapsedTime >= 3) {
          console.log("RoleBasedGuard - Safety timeout reached");
          clearInterval(timer);
          setLoadingTime(0);
          setShowRedirectMessage(false);
          
          // Show toast notification about timeout
          toast({
            title: "تجاوز وقت التحقق من الصلاحيات",
            description: "يرجى تحديث الصفحة إذا استمرت هذه المشكلة",
            variant: "destructive",
            duration: 5000,
          });
        }
      }, 500);
      
      return () => clearInterval(timer);
    } else {
      // Reset when loading is finished
      setLoadingTime(0);
      setShowRedirectMessage(false);
    }
  }, [loading]);

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex flex-col items-center justify-center"
        >
          <div className="text-center">
            <motion.div 
              className="mx-auto h-12 w-12 rounded-full border-4 border-t-beauty-purple border-beauty-lightpurple border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-muted-foreground"
            >
              {t('auth.verifyingUserRole')}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-xs text-muted-foreground"
            >
              {t('auth.loadingForSeconds', { seconds: loadingTime })}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // First check if user is authenticated
  if (!user) {
    console.log("RoleBasedGuard - User not authenticated, redirecting to auth page");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Then check if user has required role
  const userRole = profile?.role || 'user';
  const hasRequiredRole = allowedRoles.includes(userRole);

  if (!hasRequiredRole) {
    console.log(`RoleBasedGuard - User role ${userRole} not in allowed roles:`, allowedRoles);
    
    toast({
      title: t('auth.accessDenied'),
      description: t('auth.insufficientPermissions'),
      variant: "destructive",
    });
    
    return <Navigate to={fallbackPath} replace />;
  }

  console.log("RoleBasedGuard - Rendering protected content");
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

export default RoleBasedGuard;
