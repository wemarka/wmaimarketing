
import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface GuardLoadingProps {
  loadingTime: number;
  showRedirectMessage: boolean;
}

const GuardLoading = ({ loadingTime, showRedirectMessage }: GuardLoadingProps) => {
  const { t } = useTranslation();
  
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
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            {t('auth.verifyingUserRole')}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-xs text-muted-foreground"
          >
            {t('auth.loadingForSeconds', { seconds: loadingTime })}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GuardLoading;
