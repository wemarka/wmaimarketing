
import React from "react";
import { Clock, CheckCircle, AlertCircle, XCircle, LoaderCircle } from "lucide-react";
import { PostStatus } from "./types";

// وظائف مساعدة للحصول على الأيقونات والأنماط حسب الحالة
export const getStatusIcon = (status: PostStatus) => {
  switch (status) {
    case "published":
      return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />;
    case "scheduled":
      return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />;
    case "pending":
      return <LoaderCircle className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />;
  }
};

export const getStatusStyle = (status: PostStatus) => {
  switch (status) {
    case "published":
      return {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-900"
      };
    case "scheduled":
      return {
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-yellow-200 dark:border-yellow-900"
      };
    case "pending":
      return {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-900"
      };
    case "rejected":
      return {
        bg: "bg-red-50 dark:bg-red-900/20",
        border: "border-red-200 dark:border-red-900"
      };
  }
};

// وظائف مساعدة للتحويل بين الأولويات
export const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "high": return "destructive";
    case "medium": return "secondary";
    case "low": return "outline";
    default: return "secondary";
  }
};

export const getPriorityText = (priority: string) => {
  switch (priority) {
    case "high": return "أولوية عالية";
    case "medium": return "أولوية متوسطة";
    case "low": return "أولوية منخفضة";
    default: return "";
  }
};

// تنسيق التاريخ بشكل أفضل
export const getFormattedDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('ar-EG', options);
};
