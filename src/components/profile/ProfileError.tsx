
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
    >
      <Alert variant="destructive" className="mb-6 shadow-lg border-2 border-destructive/30">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-bold">خطأ</AlertTitle>
        <AlertDescription className="mt-2">{error}</AlertDescription>
      </Alert>
    </motion.div>
  );
};

export default ProfileError;
