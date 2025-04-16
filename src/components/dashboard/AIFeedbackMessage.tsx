
import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { NotificationBox } from "@/components/ui/notification-box";

interface AIFeedbackMessageProps {
  performanceData?: {
    current: number;
    previous: number;
    metric: string;
    sourceChannel?: string;
  };
  className?: string;
}

// Predefined message templates
const messageTemplates = [
  "لقد تجاوزت أداء الأسبوع الماضي بنسبة {percentage}٪ بفضل {channel}!",
  "تحسن الأداء بنسبة {percentage}٪ في {metric} مقارنة بالفترة السابقة.",
  "أحسنت! {metric} تحسن بنسبة {percentage}٪ هذا الأسبوع.",
  "هناك نمو بنسبة {percentage}٪ في {metric} من خلال {channel}.",
  "تهانينا! لقد حققت نموًا بنسبة {percentage}٪ في {metric} مقارنة بالأسبوع الماضي."
];

// Default metrics and channels for fallback
const defaultMetrics = ["المشاركة", "التفاعل", "الوصول", "المبيعات", "الزيارات"];
const defaultChannels = ["انستجرام", "فيسبوك", "تيك توك", "البريد الإلكتروني", "الموقع"];

export const AIFeedbackMessage: React.FC<AIFeedbackMessageProps> = ({ 
  performanceData,
  className
}) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [dismissNotification, setDismissNotification] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "warning" | "info">("info");
  
  useEffect(() => {
    let percentage = 0;
    let metric = "";
    let channel = "";
    
    if (performanceData) {
      // Calculate percentage change
      const difference = performanceData.current - performanceData.previous;
      percentage = performanceData.previous > 0 
        ? Math.round((difference / performanceData.previous) * 100) 
        : 0;
      
      metric = performanceData.metric;
      channel = performanceData.sourceChannel || getRandomItem(defaultChannels);
    } else {
      // Generate mock data when no real data is provided
      percentage = Math.floor(Math.random() * 25) + 5; // 5-30% range
      metric = getRandomItem(defaultMetrics);
      channel = getRandomItem(defaultChannels);
    }
    
    // Select message type based on performance
    if (percentage > 10) {
      setMessageType("success");
    } else if (percentage < 0) {
      setMessageType("warning");
      percentage = Math.abs(percentage);
    } else {
      setMessageType("info");
    }
    
    // Select a random template and fill it with data
    const template = getRandomItem(messageTemplates);
    const message = template
      .replace("{percentage}", percentage.toString())
      .replace("{metric}", metric)
      .replace("{channel}", channel);
      
    setFeedbackMessage(message);
  }, [performanceData]);
  
  // Helper to get a random item from an array
  const getRandomItem = (items: string[]) => {
    return items[Math.floor(Math.random() * items.length)];
  };
  
  if (dismissNotification) return null;
  
  return (
    <NotificationBox
      type={messageType}
      title="تحليل ذكي 🧠"
      message={feedbackMessage}
      className={className}
      showCloseButton={true}
      onClose={() => setDismissNotification(true)}
      showIcon={true}
    />
  );
};
