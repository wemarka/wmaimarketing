
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ErrorAlertProps {
  errorMessage: string | null;
  showOnlyBillingErrors?: boolean;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorMessage, showOnlyBillingErrors = true }) => {
  const { t } = useTranslation();
  
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
        {isBillingError ? t("aiStudio.errors.apiKeyError") : t("aiStudio.errors.systemError")}
      </AlertTitle>
      <AlertDescription>
        {isBillingError 
          ? t("aiStudio.errors.apiKeyErrorDescription")
          : isServerError
            ? t("aiStudio.errors.serverErrorDescription")
            : errorMessage}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
