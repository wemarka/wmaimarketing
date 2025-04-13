
import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import i18n from "@/i18n/config";
import { useToast } from "@/components/ui/use-toast";

const LanguageToggle: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const currentLanguage = i18n.language;
  
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLanguage);
    
    toast({
      title: newLanguage === "ar" ? "تم تغيير اللغة" : "Language Changed",
      description: newLanguage === "ar" ? "تم التغيير إلى العربية" : "Changed to English",
    });

    // Update document direction for RTL/LTR support
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
  };

  return (
    <Toggle 
      pressed={currentLanguage === "ar"} 
      onPressedChange={toggleLanguage}
      aria-label={t("language.toggle")}
      className="flex items-center gap-1"
    >
      <Globe className="h-4 w-4" />
      <span>{currentLanguage === "ar" ? "AR" : "EN"}</span>
    </Toggle>
  );
};

export default LanguageToggle;
