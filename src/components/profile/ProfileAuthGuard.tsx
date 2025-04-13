
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface ProfileAuthGuardProps {
  children: React.ReactNode;
}

const ProfileAuthGuard = ({ children }: ProfileAuthGuardProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const [loadingTime, setLoadingTime] = useState(0);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    console.log("ProfileAuthGuard - Loading:", loading);
    console.log("ProfileAuthGuard - User:", user ? "authenticated" : "not authenticated");
  }, [loading, user]);

  // Handle loading state and timing with improved timeout handling
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
          console.log("ProfileAuthGuard - Safety timeout reached, forcing redirect");
          clearInterval(timer);
          setLoadingTime(0);
          setShowRedirectMessage(false);
          
          // Show toast notification about timeout
          toast({
            title: "تجاوز وقت التحقق من الجلسة",
            description: "يرجى تحديث الصفحة إذا استمرت هذه المشكلة",
            variant: "destructive",
            duration: 5000,
          });
          
          // Force redirect to auth page
          window.location.href = '/auth';
        }
      }, 500);
      
      return () => clearInterval(timer);
    } else {
      // Reset when loading is finished
      setLoadingTime(0);
      setShowRedirectMessage(false);
    }
  }, [loading]);

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

  if (loading) {
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
