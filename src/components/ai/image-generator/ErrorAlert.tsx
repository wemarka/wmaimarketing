
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
  errorMessage: string | null;
  showOnlyBillingErrors?: boolean;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorMessage, showOnlyBillingErrors = true }) => {
  if (!errorMessage) return null;
  
  const isBillingError = errorMessage.includes("billing") || 
                         errorMessage.includes("quota") || 
                         errorMessage.includes("API key");
  
  if (showOnlyBillingErrors && !isBillingError) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>خطأ في مفتاح API</AlertTitle>
      <AlertDescription>
        {isBillingError 
          ? "مفتاح OpenAI API غير صالح أو استنفد الرصيد المتاح. يرجى التحقق من حساب OpenAI الخاص بك وتحديث المفتاح."
          : errorMessage}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
