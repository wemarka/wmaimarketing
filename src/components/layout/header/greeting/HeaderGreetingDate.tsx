
import React from "react";
import { Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeaderGreetingDateProps {
  currentTime: Date;
  currentLanguage: string;
}

const HeaderGreetingDate: React.FC<HeaderGreetingDateProps> = ({ 
  currentTime,
  currentLanguage
}) => {
  const getCurrentDate = () => {
    return currentTime.toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mt-2">
      <div className="flex items-center gap-2 bg-beauty-cream/30 dark:bg-beauty-purple/10 rounded-full px-3 py-1 shadow-sm backdrop-blur-sm">
        <Calendar className="h-3.5 w-3.5 text-beauty-purple" />
        <span className="font-medium">{getCurrentDate()}</span>
      </div>
      <div className="flex items-center gap-2 bg-beauty-cream/30 dark:bg-beauty-purple/10 rounded-full px-3 py-1 shadow-sm backdrop-blur-sm">
        <Clock className="h-3.5 w-3.5 text-beauty-purple" />
        <span className="font-medium">{getCurrentTime()}</span>
      </div>
    </div>
  );
};

export default HeaderGreetingDate;
