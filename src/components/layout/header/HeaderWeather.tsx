
import React, { useState, useEffect } from "react";
import { Cloud, CloudSun, Sun, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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
            <CloudSun className="h-3 w-3 text-white/70" />
          </motion.div>
        );
      }
      return (
        <motion.div 
          animate={{ x: [0, 2, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud className="h-3 w-3 text-white/70" />
        </motion.div>
      );
    }
    return (
      <motion.div 
        animate={{ rotate: [0, 5, 0, -5, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sun className="h-3 w-3 text-white/70" />
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
      <div className="flex items-center gap-1 text-xs text-white/80">
        <Loader2 className="h-3 w-3 text-white/70 animate-spin" />
        <span>{t("common.loading", "جاري التحميل...")}</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="flex items-center gap-1 text-xs text-white/80">
      {getWeatherIcon(weather.condition)}
      <span>{`${weather.temp}° ${weather.condition}`}</span>
    </div>
  );
};

export default HeaderWeather;
