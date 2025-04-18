
import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import i18n from "@/i18n/config";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Toggle 
        pressed={currentLanguage === "ar"} 
        onPressedChange={toggleLanguage}
        aria-label={t("language.toggle", "Toggle language")}
        className={cn(
          "flex items-center gap-1 text-sm rounded-full px-2.5 py-1.5", 
          currentLanguage === "ar" ? "bg-primary/20 text-white" : "bg-white/10"
        )}
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="font-medium">{currentLanguage === "ar" ? "AR" : "EN"}</span>
      </Toggle>
    </motion.div>
  );
};

export default LanguageToggle;
