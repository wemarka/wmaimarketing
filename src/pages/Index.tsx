
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const [forceNavigate, setForceNavigate] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    // Debug the loading state
    console.log("Index page - Loading state:", loading);
    console.log("Index page - User state:", user ? "authenticated" : "not authenticated");
  }, [loading, user]);

  // Force navigation after 3 seconds to prevent infinite loading
  useEffect(() => {
    if (loading) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setLoadingTime(elapsedTime);
        
        // Force navigation after 5 seconds of loading
        if (elapsedTime >= 5) {
          console.log("Safety timeout reached - forcing navigation");
          setForceNavigate(true);
          clearInterval(timer);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [loading]);

  // If loading times out, navigate based on best guess
  if (forceNavigate) {
    return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />;
  }

  // While loading, show spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-t-beauty-purple border-beauty-lightpurple border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">{t('auth.loading')}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {t('auth.loadingForSeconds', { seconds: loadingTime })}
          </p>
          {loadingTime >= 3 && (
            <p className="mt-2 text-xs text-muted-foreground debug-loading">
              {t('auth.loadingTakingLonger')}
            </p>
          )}
        </div>
      </div>
    );
  }

  // If the user is authenticated, redirect to dashboard, otherwise redirect to auth page
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />;
};

export default Index;
