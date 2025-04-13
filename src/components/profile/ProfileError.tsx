
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProfileErrorProps {
  error: string;
  onDismiss?: () => void;
}

const ProfileError = ({ error, onDismiss }: ProfileErrorProps) => {
  if (!error) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Alert variant="destructive" className="shadow-lg border-2 border-destructive/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-destructive/5 rounded-md"></div>
        <AlertCircle className="h-5 w-5 mr-2 animate-pulse" />
        <div className="flex-1">
          <AlertTitle className="text-lg font-bold flex items-center">
            <span className="bg-gradient-to-r from-destructive/90 to-red-400 bg-clip-text text-transparent">خطأ</span>
          </AlertTitle>
          <AlertDescription className="mt-2 text-destructive/80">{error}</AlertDescription>
        </div>
        {onDismiss && (
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onDismiss} 
              className="h-8 w-8 rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors"
            >
              <XCircle className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </Alert>
    </motion.div>
  );
};

export default ProfileError;
