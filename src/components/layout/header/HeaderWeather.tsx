
import React, { useState, useEffect } from "react";
import { Cloud, CloudSun, Sun, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WeatherData {
  temp: number;
  condition: string;
  city: string;
}

const HeaderWeather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  
  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    if (condition.includes("cloud") || condition.includes("غائم")) {
      if (condition.includes("sun") || condition.includes("شمس")) {
        return <CloudSun className="h-4 w-4 text-beauty-purple" />;
      }
      return <Cloud className="h-4 w-4 text-beauty-purple" />;
    }
    return <Sun className="h-4 w-4 text-beauty-purple" />;
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
      <div className="flex items-center gap-2 bg-beauty-cream/30 dark:bg-beauty-purple/10 rounded-full px-3 py-1 shadow-sm backdrop-blur-sm">
        <Loader2 className="h-3.5 w-3.5 text-beauty-purple animate-spin" />
        <span className="font-medium">{t("common.loading", "جاري التحميل...")}</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="flex items-center gap-2 bg-beauty-cream/30 dark:bg-beauty-purple/10 rounded-full px-3 py-1 shadow-sm backdrop-blur-sm">
      {getWeatherIcon(weather.condition)}
      <span className="font-medium">{`${weather.temp}° ${weather.condition}`}</span>
    </div>
  );
};

export default HeaderWeather;
