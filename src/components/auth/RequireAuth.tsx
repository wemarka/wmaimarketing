
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const [loadingTime, setLoadingTime] = useState(0);
  const [forceRedirect, setForceRedirect] = useState(false);
  
  // Debug loading state
  useEffect(() => {
    console.log("RequireAuth - Loading:", loading);
    console.log("RequireAuth - User:", user ? "authenticated" : "not authenticated");
  }, [loading, user]);

  // Safety timeout to prevent infinite loading
  useEffect(() => {
    if (loading) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setLoadingTime(elapsedTime);
        
        // Force redirect after 3 seconds of loading
        if (elapsedTime >= 3) {
          console.log("RequireAuth - Forcing navigation due to timeout");
          setForceRedirect(true);
          clearInterval(timer);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [loading]);

  if (forceRedirect && !user) {
    console.log("RequireAuth - Forcing redirect to auth page due to timeout");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Only show loading for a maximum of 3 seconds
  if (loading && loadingTime < 3) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-t-beauty-purple border-beauty-lightpurple border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">{t('auth.verifyingUser')}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {t('auth.loadingForSeconds', { seconds: loadingTime })}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("RequireAuth - Redirecting to auth page");
    // Redirect to login page but save the current location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log("RequireAuth - Rendering protected content");
  return <>{children}</>;
};

export default RequireAuth;
