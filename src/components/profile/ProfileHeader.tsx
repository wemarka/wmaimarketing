
import React from "react";
import { motion } from "framer-motion";
import { User, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  title?: string;
  subtitle?: string;
  onSecurityTest?: () => void;
}

const ProfileHeader = ({
  title = "الملف الشخصي",
  subtitle = "إدارة حسابك ومعلوماتك الشخصية",
  onSecurityTest
}: ProfileHeaderProps) => {
  return (
    <motion.div 
      className="space-y-3 mb-8 text-center md:text-right flex flex-col md:flex-row items-center md:items-start justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <motion.div className="flex items-center gap-2 justify-center md:justify-start">
          <div className="bg-primary/10 p-2 rounded-full">
            <User className="h-5 w-5 text-primary" />
          </div>
          <motion.h1 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            {title}
          </motion.h1>
        </motion.div>
        <motion.p 
          className="text-muted-foreground max-w-md mx-auto md:mx-0 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      </div>
      
      {onSecurityTest && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 md:mt-0 gap-2 hover:bg-primary/10 transition-colors duration-300"
            onClick={onSecurityTest}
          >
            <Shield className="h-4 w-4" />
            <span>اختبار أمان الحساب</span>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfileHeader;
