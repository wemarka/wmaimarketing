
import React from "react";
import { useTranslation } from "react-i18next";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";

const DashboardGreeting = () => {
  const { t } = useTranslation();
  const { profileData, loading } = useProfile();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dashboard.greeting.morning");
    if (hour < 18) return t("dashboard.greeting.afternoon");
    return t("dashboard.greeting.evening");
  };

  const greeting = getGreeting();
  const userName = profileData?.first_name || "";

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          {greeting}{userName && `, ${userName}`}
          <span className="text-2xl">👋</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("dashboard.greeting.welcome")}
        </p>
      </motion.div>
    </div>
  );
};

export default DashboardGreeting;
