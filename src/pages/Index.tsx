
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const [loadingTime, setLoadingTime] = useState(0);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    // Debug the loading state
    console.log("Index page - Loading state:", loading);
    console.log("Index page - User state:", user ? "authenticated" : "not authenticated");
  }, [loading, user]);

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
          console.log("Index - Safety timeout reached, forcing redirect");
          clearInterval(timer);
          setLoadingTime(0);
          setShowRedirectMessage(false);
          
          // Show toast notification about timeout
          toast({
            title: "Session verification timeout",
            description: "Please try refreshing the page if this persists",
            variant: "destructive",
            duration: 5000,
          });
          
          // Force redirect based on best guess
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

  // If not loading, redirect based on auth state
  if (!loading) {
    return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />;
  }

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 } 
    }
  };

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // While loading, show spinner with improved animations
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="loading"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen flex flex-col items-center justify-center"
      >
        <motion.div className="text-center" variants={childVariants}>
          <motion.div 
            className="mx-auto h-12 w-12 rounded-full border-4 border-t-beauty-purple border-beauty-lightpurple border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            variants={childVariants}
            className="mt-4 text-muted-foreground"
          >
            {t('auth.loading')}
          </motion.p>
          <motion.p 
            variants={childVariants}
            className="mt-2 text-xs text-muted-foreground"
          >
            {t('auth.loadingForSeconds', { seconds: loadingTime })}
          </motion.p>
          
          {showRedirectMessage && (
            <motion.div 
              variants={childVariants}
              className="mt-4 p-3 bg-muted rounded-md max-w-xs mx-auto"
            >
              <p className="text-sm text-muted-foreground">
                {t('auth.redirectingSoon')}
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
