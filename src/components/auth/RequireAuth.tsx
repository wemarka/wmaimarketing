
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const [loadingTime, setLoadingTime] = useState(0);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  
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
            <p className="mt-4 text-muted-foreground">{t('auth.verifyingUser')}</p>
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
  }

  if (!user) {
    console.log("RequireAuth - Redirecting to auth page");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log("RequireAuth - Rendering protected content");
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

export default RequireAuth;
