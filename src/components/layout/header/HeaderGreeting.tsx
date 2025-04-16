
import React from "react";
import { useTranslation } from "react-i18next";
import { useProfile } from "@/hooks/useProfile";
import { Separator } from "@/components/ui/separator";
import HeaderGreetingTitle from "./greeting/HeaderGreetingTitle";
import HeaderGreetingDate from "./greeting/HeaderGreetingDate";
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
  
  return (
    <div className="hidden md:flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-lg">
      <HeaderGreetingTitle greeting={greeting} userName={userName} />
      
      <div className="hidden lg:flex items-center gap-3">
        <Separator orientation="vertical" className="h-4 bg-white/20" />
        <HeaderGreetingDate currentTime={currentTime} currentLanguage={currentLanguage} />
        <Separator orientation="vertical" className="h-4 bg-white/20" />
        <HeaderWeather />
      </div>
    </div>
  );
};

export default HeaderGreeting;
