
import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";

interface NotificationHeaderProps {
  unreadCount: number;
  title: string;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ unreadCount, title }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center gap-3">
      <Bell className="h-6 w-6 text-beauty-purple" />
      <h1 className="text-2xl font-bold">{title}</h1>
      {unreadCount > 0 && (
        <motion.span 
          className="bg-beauty-pink text-white text-sm px-2 py-0.5 rounded-full"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {unreadCount} {t("notificationCenter.unread", "غير مقروء")}
        </motion.span>
      )}
    </div>
  );
};

export default NotificationHeader;
