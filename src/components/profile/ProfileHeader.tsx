
import React from "react";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
  title?: string;
  subtitle?: string;
}

const ProfileHeader = ({
  title = "الملف الشخصي",
  subtitle = "إدارة حسابك ومعلوماتك الشخصية"
}: ProfileHeaderProps) => {
  return (
    <motion.div 
      className="space-y-3 mb-8 text-center md:text-right"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent drop-shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        {title}
      </motion.h1>
      <motion.p 
        className="text-muted-foreground max-w-md mx-auto md:mx-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default ProfileHeader;
