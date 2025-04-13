
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
                         errorMessage.includes("API key") ||
                         errorMessage.includes("insufficient credits");
  
  const isServerError = errorMessage.includes("500") || 
                        errorMessage.includes("server") ||
                        errorMessage.includes("Edge Function");
                        
  if (showOnlyBillingErrors && !isBillingError && !isServerError) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>
        {isBillingError ? "خطأ في مفتاح API" : "خطأ في النظام"}
      </AlertTitle>
      <AlertDescription>
        {isBillingError 
          ? "مفتاح OpenAI API غير صالح أو استنفد الرصيد المتاح. يرجى التحقق من حساب OpenAI الخاص بك وتحديث المفتاح."
          : isServerError
            ? "حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقًا أو التحقق من تكوين النظام."
            : errorMessage}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
