
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface ProfileAuthGuardProps {
  children: React.ReactNode;
}

const ProfileAuthGuard = ({ children }: ProfileAuthGuardProps) => {
  const auth = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const [loadingTime, setLoadingTime] = useState(0);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    console.log("ProfileAuthGuard - Loading:", auth.loading);
    console.log("ProfileAuthGuard - User:", auth.user ? "authenticated" : "not authenticated");
  }, [auth.loading, auth.user]);

  // Handle loading state and timing with improved timeout handling
  useEffect(() => {
    if (auth.loading) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setLoadingTime(elapsedTime);
        
        // Show redirect message sooner (after 1 second)
        if (elapsedTime >= 1) {
          setShowRedirectMessage(true);
        }
        
        // Safety timeout to avoid infinite loading (after 5 seconds)
        if (elapsedTime >= 5) {
          console.log("ProfileAuthGuard - Safety timeout reached, will try recovering");
          clearInterval(timer);
          setLoadingTime(0);
          setShowRedirectMessage(false);
          
          // Try to recover instead of forcing redirect
          if (!auth.user) {
            setAuthError("Session verification timed out. Please try refreshing the page.");
          }
        }
      }, 500);
      
      return () => clearInterval(timer);
    } else {
      // Reset when loading is finished
      setLoadingTime(0);
      setShowRedirectMessage(false);
    }
  }, [auth.loading, auth.user]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Handle refresh attempt
  const handleRefresh = () => {
    window.location.reload();
  };

  if (authError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="bg-card p-6 rounded-lg border shadow-sm max-w-lg w-full text-center">
          <h2 className="text-xl font-semibold mb-2">حدث خطأ في التحقق من الجلسة</h2>
          <p className="text-muted-foreground mb-4">{authError}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={handleRefresh}>
              تحديث الصفحة
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/auth"}>
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (auth.loading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div 
          key="loading"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex justify-center items-center h-[60vh]"
        >
          <div className="text-center">
            <motion.div 
              variants={itemVariants}
              className="mx-auto h-12 w-12 rounded-full border-4 border-t-beauty-purple border-beauty-lightpurple border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p 
              variants={itemVariants}
              className="mt-4 text-muted-foreground"
            >
              {t('auth.verifyingUser')}
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="mt-2 text-xs text-muted-foreground"
            >
              {t('auth.loadingForSeconds', { seconds: loadingTime })}
            </motion.p>
            
            {showRedirectMessage && (
              <motion.div 
                variants={itemVariants}
                className="mt-4 p-3 bg-muted rounded-md max-w-xs mx-auto"
              >
                <p className="text-sm text-muted-foreground">
                  {t('auth.redirectingSoon')}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (!auth.user) {
    console.log("ProfileAuthGuard - Redirecting to auth page");
    toast({
      title: "تسجيل الدخول مطلوب",
      description: "يجب تسجيل الدخول لعرض الملف الشخصي",
    });
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
