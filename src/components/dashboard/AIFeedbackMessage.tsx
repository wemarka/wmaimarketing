
import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PerformanceData {
  current: number;
  previous: number;
  metric: string;
  sourceChannel?: string;
  period?: "daily" | "weekly" | "monthly";
}

interface AIFeedbackMessageProps {
  performanceData: PerformanceData;
  className?: string;
}

// Updated type definition to include "error"
type FeedbackType = "success" | "warning" | "error" | "info";

const AIFeedbackMessage: React.FC<AIFeedbackMessageProps> = ({ performanceData, className }) => {
  const { current, previous, metric, sourceChannel, period = "weekly" } = performanceData;
  
  // Calculate percentage change
  const calculateChange = () => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };
  
  const percentageChange = calculateChange();
  const isPositive = percentageChange > 0;
  const isSignificant = Math.abs(percentageChange) > 10;
  
  // Determine the feedback type and message based on performance
  const getFeedbackType = (): FeedbackType => {
    if (isPositive) {
      return isSignificant ? "success" : "info";
    } else {
      return isSignificant ? "warning" : "info";
    }
  };
  
  // Generate a dynamic AI-like message based on data
  const generateMessage = () => {
    const changeText = isPositive ? "ارتفاع" : "انخفاض";
    const absChange = Math.abs(percentageChange).toFixed(1);
    
    let message = "";
    const periodText = 
      period === "daily" ? "اليوم مقارنة بالأمس" : 
      period === "weekly" ? "هذا الأسبوع مقارنة بالأسبوع الماضي" : 
      "هذا الشهر مقارنة بالشهر الماضي";
    
    if (isPositive) {
      if (isSignificant) {
        message = `أداء ممتاز! ${changeText} ${metric} بنسبة ${absChange}% ${periodText}`;
        if (sourceChannel) {
          message += ` على ${sourceChannel}`;
        }
      } else {
        message = `${changeText} ${metric} بنسبة ${absChange}% ${periodText}`;
        if (sourceChannel) {
          message += ` على ${sourceChannel}`;
        }
      }
    } else {
      if (isSignificant) {
        message = `تنبيه! ${changeText} ${metric} بنسبة ${absChange}% ${periodText}`;
        if (sourceChannel) {
          message += ` على ${sourceChannel}`;
        }
        message += `. نوصي بمراجعة استراتيجيتك.`;
      } else {
        message = `${changeText} طفيف في ${metric} بنسبة ${absChange}% ${periodText}`;
        if (sourceChannel) {
          message += ` على ${sourceChannel}`;
        }
      }
    }
    
    return message;
  };
  
  const feedbackType = getFeedbackType();
  const message = generateMessage();
  
  // Styling based on feedback type
  const getTypeStyles = () => {
    switch (feedbackType) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
          bright: <Sparkles className="h-3.5 w-3.5 text-green-500" />
        };
      case "warning":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-800",
          icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
          bright: null
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: <AlertCircle className="h-4 w-4 text-red-500" />,
          bright: null
        };
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: <Sparkles className="h-4 w-4 text-blue-500" />,
          bright: null
        };
    }
  };
  
  const typeStyles = getTypeStyles();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-lg border px-3.5 py-2.5 text-sm flex items-start gap-2",
        typeStyles.bg,
        typeStyles.border,
        typeStyles.text,
        className
      )}
    >
      {typeStyles.icon}
      <div className="flex flex-wrap items-center gap-x-1">
        {message}
        {typeStyles.bright && (
          <span className="inline-flex">{typeStyles.bright}</span>
        )}
      </div>
    </motion.div>
  );
};

export default AIFeedbackMessage;
