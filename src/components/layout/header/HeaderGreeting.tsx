
import React from "react";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HeaderGreetingProps {
  currentTime: Date;
  greeting: string;
}

const HeaderGreeting: React.FC<HeaderGreetingProps> = ({
  currentTime,
  greeting
}) => {
  const { profileData } = useProfile();
  const userName = profileData?.first_name || "";
  
  // Get weather data from mock
  const weather = {
    temp: 27,
    condition: "مشمس",
    icon: "☀️"
  };
  
  // Format date in Arabic format - simple version
  const formatDate = () => {
    const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const day = currentTime.getDate();
    const month = months[currentTime.getMonth()];
    
    return `${day} ${month}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 text-white">
              <span className="font-medium">{userName}</span>
              <span className="text-white/60">|</span>
              <span>{formatDate()}</span>
              <span className="text-white/60">|</span>
              <span>
                {weather.icon} {weather.temp}°
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="flex flex-col gap-1.5 p-3">
            <p className="text-sm font-medium">{greeting}{userName && `, ${userName}`}</p>
            <div className="text-xs text-muted-foreground">
              <p>{currentTime.toLocaleDateString('ar-SA', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
              <p className="mt-1">{weather.condition} • {weather.temp}°</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

export default HeaderGreeting;
