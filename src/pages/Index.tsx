
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    // Debug the loading state
    console.log("Index page - Loading state:", loading);
    console.log("Index page - User state:", user ? "authenticated" : "not authenticated");
  }, [loading, user]);

  // Force loading to complete after 3 seconds as a safety measure
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        console.log("Safety timeout reached - forcing navigation");
        // Don't navigate directly, just log that we hit the timeout
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-t-beauty-purple border-beauty-lightpurple border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">{t('auth.loading')}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Loading for {loading ? 'true' : 'false'} seconds...
          </p>
        </div>
      </div>
    );
  }

  // If the user is authenticated, redirect to dashboard, otherwise redirect to auth page
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />;
};

export default Index;
