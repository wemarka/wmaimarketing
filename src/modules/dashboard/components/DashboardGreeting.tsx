
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { Clock, Calendar, Bell, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DashboardGreeting = () => {
  const { t } = useTranslation();
  const { profileData, loading } = useProfile();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t("dashboard.greeting.morning");
    if (hour < 18) return t("dashboard.greeting.afternoon");
    return t("dashboard.greeting.evening");
  };

  const getCurrentDate = () => {
    return currentTime.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const greeting = getGreeting();
  const userName = profileData?.first_name || "";
  
  // Daily priorities - can be connected to a real API later
  const priorities = [
    "جدولة 3 منشورات لمنتجات مكياج جديدة",
    "استعراض أداء الحملة الإعلانية الأسبوعية"
  ];

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
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{getCurrentDate()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{getCurrentTime()}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
            <div className="bg-white dark:bg-slate-800 py-2 px-4 rounded-lg shadow-sm w-full md:w-auto">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">أولويات اليوم</p>
                <Badge variant="outline" className="text-xs">{priorities.length}</Badge>
              </div>
              <ul className="mt-1 text-sm">
                {priorities.map((priority, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-1 mb-1 text-muted-foreground"
                  >
                    <Star className="h-3 w-3 text-beauty-gold" /> {priority}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Bell className="h-3.5 w-3.5 mr-1" />
                الإشعارات
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                تقرير اليوم
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardGreeting;
