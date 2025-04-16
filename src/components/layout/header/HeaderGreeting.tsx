
import React from "react";
import { useTranslation } from "react-i18next";
import { useProfile } from "@/hooks/useProfile";
import { Separator } from "@/components/ui/separator";
import HeaderGreetingTitle from "./greeting/HeaderGreetingTitle";
import HeaderGreetingDate from "./greeting/HeaderGreetingDate";
import HeaderWeather from "./HeaderWeather";
import { motion } from "framer-motion";

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
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm"
    >
      <HeaderGreetingTitle greeting={greeting} userName={userName} />
      
      <div className="hidden lg:flex items-center gap-3">
        <Separator orientation="vertical" className="h-4 bg-white/20" />
        <HeaderGreetingDate currentTime={currentTime} currentLanguage={currentLanguage} />
        <Separator orientation="vertical" className="h-4 bg-white/20" />
        <HeaderWeather />
      </div>
    </motion.div>
  );
};

export default HeaderGreeting;
