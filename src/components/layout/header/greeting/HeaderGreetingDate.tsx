
import React from "react";
import { Calendar } from "lucide-react";
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

  return (
    <div className="flex items-center gap-1 text-xs text-white/80">
      <Calendar className="h-3 w-3 text-white/70" />
      <span>{formatDateInArabic()}</span>
    </div>
  );
};

export default HeaderGreetingDate;
