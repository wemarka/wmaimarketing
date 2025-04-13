
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ProfileErrorProps {
  error: string;
}

const ProfileError = ({ error }: ProfileErrorProps) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>خطأ</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default ProfileError;
