
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useProfile } from "@/hooks/useProfile";
import HeaderGreetingTitle from "./greeting/HeaderGreetingTitle";
import HeaderGreetingDate from "./greeting/HeaderGreetingDate";
import HeaderPriorities from "./greeting/HeaderPriorities";
import HeaderWeather from "./HeaderWeather";

interface HeaderGreetingProps {
  currentTime: Date;
  greeting: string;
}

const HeaderGreeting: React.FC<HeaderGreetingProps> = ({
  currentTime,
  greeting
}) => {
  const { t, i18n } = useTranslation();
  const { profileData } = useProfile();
  const currentLanguage = i18n.language;
  const userName = profileData?.first_name || "";
  
  const priorities = [
    t("dashboard.priorities.schedule", "جدولة 3 منشورات لمنتجات مكياج جديدة"), 
    t("dashboard.priorities.review", "استعراض أداء الحملة الإعلانية الأسبوعية")
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
      <motion.div 
        className="flex items-center gap-3 w-full" 
        initial={{ x: -20, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div>
          <HeaderGreetingTitle greeting={greeting} userName={userName} />
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <HeaderGreetingDate currentTime={currentTime} currentLanguage={currentLanguage} />
            <HeaderWeather />
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-4 md:mt-0 flex flex-wrap items-center justify-between gap-4 w-full" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <HeaderPriorities priorities={priorities} />
      </motion.div>
    </div>
  );
};

export default HeaderGreeting;
