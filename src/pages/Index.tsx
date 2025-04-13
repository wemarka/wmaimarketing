
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

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
        
        // After 1.5 seconds show redirect message
        if (elapsedTime >= 1.5) {
          setShowRedirectMessage(true);
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

  // While loading, show spinner
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
          <p className="mt-4 text-muted-foreground">{t('auth.loading')}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {t('auth.loadingForSeconds', { seconds: loadingTime })}
          </p>
          
          {showRedirectMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
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
};

export default Index;
