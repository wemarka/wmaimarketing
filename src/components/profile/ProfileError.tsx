
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileErrorProps {
  error: string;
}

const ProfileError = ({ error }: ProfileErrorProps) => {
  if (!error) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Alert variant="destructive" className="shadow-lg border-2 border-destructive/30 backdrop-blur-sm">
        <AlertCircle className="h-5 w-5 mr-2" />
        <div>
          <AlertTitle className="text-lg font-bold flex items-center">
            <span className="bg-gradient-to-r from-destructive/90 to-red-400 bg-clip-text text-transparent">خطأ</span>
          </AlertTitle>
          <AlertDescription className="mt-2">{error}</AlertDescription>
        </div>
      </Alert>
    </motion.div>
  );
};

export default ProfileError;
