
import React, { useState, useEffect } from "react";
import { Cloud, CloudSun, Sun, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WeatherData {
  temp: number;
  condition: string;
  city: string;
}

const HeaderWeather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  
  // Get weather icon based on condition with animation
  const getWeatherIcon = (condition: string) => {
    if (condition.includes("cloud") || condition.includes("غائم")) {
      if (condition.includes("sun") || condition.includes("شمس")) {
        return (
          <motion.div 
            animate={{ y: [0, -2, 0] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <CloudSun className="h-3.5 w-3.5 text-white/80" />
          </motion.div>
        );
      }
      return (
        <motion.div 
          animate={{ x: [0, 2, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud className="h-3.5 w-3.5 text-white/80" />
        </motion.div>
      );
    }
    return (
      <motion.div 
        animate={{ rotate: [0, 5, 0, -5, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sun className="h-3.5 w-3.5 text-white/80" />
      </motion.div>
    );
  };
  
  // Mock weather data - in a real app, this would fetch from an API
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // This is mock data; in a real app, you would fetch from a weather API
        setTimeout(() => {
          setWeather({
            temp: 27,
            condition: "مشمس جزئياً",
            city: "عمّان"
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-1 text-xs text-white/80"
      >
        <Loader2 className="h-3.5 w-3.5 text-white/80 animate-spin" />
        <span>{t("common.loading", "جاري التحميل...")}</span>
      </motion.div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="flex items-center gap-1.5 text-xs text-white/80"
    >
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              {getWeatherIcon(weather.condition)}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs">{weather.city}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span>{`${weather.temp}° ${weather.condition}`}</span>
    </motion.div>
  );
};

export default HeaderWeather;
