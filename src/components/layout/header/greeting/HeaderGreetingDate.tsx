
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
  const formatDateInArabic = () => {
    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    
    const day = days[currentTime.getDay()];
    const date = currentTime.getDate();
    const month = months[currentTime.getMonth()];
    const year = currentTime.getFullYear();
    
    return `${day} | ${date} ${month} ${year}`;
  };

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex items-center gap-2 bg-beauty-cream/30 dark:bg-beauty-purple/10 rounded-full px-3 py-1 shadow-sm backdrop-blur-sm">
      <Calendar className="h-3.5 w-3.5 text-beauty-purple" />
      <span className="font-medium">{formatDateInArabic()}</span>
    </div>
  );
};

export default HeaderGreetingDate;
