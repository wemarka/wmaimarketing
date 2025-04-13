
import { ReactNode, useEffect } from 'react';
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
  
  useEffect(() => {
    console.log("RequireAuth - Loading:", loading);
    console.log("RequireAuth - User:", user ? "authenticated" : "not authenticated");
  }, [loading, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-t-beauty-purple border-beauty-lightpurple border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">{t('auth.verifyingUser')}</p>
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
