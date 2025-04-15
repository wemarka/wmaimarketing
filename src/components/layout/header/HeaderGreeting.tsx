import React from "react";
import { Calendar, Clock, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/useProfile";
interface HeaderGreetingProps {
  currentTime: Date;
  greeting: string;
}
const HeaderGreeting: React.FC<HeaderGreetingProps> = ({
  currentTime,
  greeting
}) => {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    profileData
  } = useProfile();
  const currentLanguage = i18n.language;
  const userName = profileData?.first_name || "";
  const priorities = [t("dashboard.priorities.schedule", "جدولة 3 منشورات لمنتجات مكياج جديدة"), t("dashboard.priorities.review", "استعراض أداء الحملة الإعلانية الأسبوعية")];
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
  return <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
      <motion.div className="flex items-center gap-3 w-full" initial={{
      x: -20,
      opacity: 0
    }} animate={{
      x: 0,
      opacity: 1
    }} transition={{
      duration: 0.4,
      delay: 0.1
    }}>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-beauty-purple to-beauty-purple/70 inline-block text-transparent bg-clip-text">
            {greeting}{userName && `, ${userName}`}
            
          </h1>
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
        </div>
      </motion.div>
      
      <motion.div className="mt-4 md:mt-0 flex flex-wrap items-center justify-between gap-4 w-full" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.2,
      duration: 0.4
    }}>
        <div className="hidden md:flex bg-white/80 dark:bg-slate-800/70 py-2 px-4 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-700/40 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 mr-2">
              <Shield className="h-4 w-4 text-beauty-purple" />
              <p className="text-sm font-medium">{t("dashboard.todayPriorities", "أولويات اليوم")}</p>
              <Badge variant="outline" className="text-xs bg-beauty-purple/10 text-beauty-purple border-beauty-purple/20">{priorities.length}</Badge>
            </div>
          </div>
          <ul className="ml-4 text-sm hidden lg:block">
            {priorities.slice(0, 1).map((priority, index) => <span key={index} className="flex items-center gap-1.5 text-muted-foreground">
                <Star className="h-3 w-3 text-beauty-gold fill-beauty-gold" /> {priority}
              </span>)}
          </ul>
        </div>
      </motion.div>
    </div>;
};
export default HeaderGreeting;