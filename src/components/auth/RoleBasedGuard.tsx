
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { hasRequiredRole } from "@/utils/roleUtils";
import { useGuardLoading } from "@/hooks/useGuardLoading";
import GuardLoading from "./GuardLoading";

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
  const { loadingTime, showRedirectMessage } = useGuardLoading({ loading });
  
  // Debug loading state
  useEffect(() => {
    console.log("RoleBasedGuard - Loading:", loading);
    console.log("RoleBasedGuard - User:", user ? "authenticated" : "not authenticated");
    console.log("RoleBasedGuard - Role:", profile?.role);
    console.log("RoleBasedGuard - Allowed Roles:", allowedRoles);
    console.log("RoleBasedGuard - Path:", location.pathname);
  }, [loading, user, profile, allowedRoles, location.pathname]);

  if (loading) {
    return <GuardLoading loadingTime={loadingTime} showRedirectMessage={showRedirectMessage} />;
  }

  // First check if user is authenticated
  if (!user) {
    console.log("RoleBasedGuard - User not authenticated, redirecting to auth page");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Get user role, defaulting to 'user' if not found
  // Fixed: Ensure we always have a role value
  const userRole = profile?.role || 'user';
  
  // Check if user has required role
  const isAuthorized = hasRequiredRole(userRole, allowedRoles);

  console.log("RoleBasedGuard - User role:", userRole);
  console.log("RoleBasedGuard - Has required role:", isAuthorized);

  if (!isAuthorized) {
    console.log(`RoleBasedGuard - User role ${userRole} not in allowed roles:`, allowedRoles);
    
    // Show access denied toast
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
