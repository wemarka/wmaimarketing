
import React from "react";
import { useTranslation } from "react-i18next";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const DashboardGreeting = () => {
  const { t } = useTranslation();
  const { profileData, loading } = useProfile();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dashboard.greeting.morning");
    if (hour < 18) return t("dashboard.greeting.afternoon");
    return t("dashboard.greeting.evening");
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const greeting = getGreeting();
  const userName = profileData?.first_name || "";

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-beauty-purple/10 to-transparent p-6 rounded-xl"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              {greeting}{userName && `, ${userName}`}
              <span className="text-2xl">👋</span>
            </h1>
            <p className="text-muted-foreground text-lg flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{getCurrentDate()}</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white dark:bg-slate-800 py-2 px-4 rounded-lg shadow-sm">
            <p className="text-sm text-muted-foreground">{t("dashboard.greeting.lastLogin")}</p>
            <p className="font-medium">
              {new Date().toLocaleDateString('ar-SA', { 
                weekday: 'short',
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardGreeting;
