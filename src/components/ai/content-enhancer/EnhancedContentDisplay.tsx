
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface EnhancedContentDisplayProps {
  enhancedContent: string;
  errorMessage: string | null;
  onSave?: () => void;
}

const EnhancedContentDisplay: React.FC<EnhancedContentDisplayProps> = ({
  enhancedContent,
  errorMessage,
  onSave
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedContent);
    toast({
      title: t("aiStudio.contentEnhancer.copied"),
      description: t("aiStudio.contentEnhancer.copiedDescription"),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{t("aiStudio.contentEnhancer.enhancedContent")}</h3>
        {enhancedContent && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className={`${t("common.textDirection") === "rtl" ? "ml-1" : "mr-1"} h-3 w-3`} />
              {t("aiStudio.common.copy")}
            </Button>
            {onSave && (
              <Button size="sm" onClick={onSave}>
                <Check className={`${t("common.textDirection") === "rtl" ? "ml-1" : "mr-1"} h-3 w-3`} />
                {t("aiStudio.contentEnhancer.use")}
              </Button>
            )}
          </div>
        )}
      </div>
      
      <div className={`border rounded-md p-3 bg-muted/20 h-[200px] overflow-y-auto ${!enhancedContent && !errorMessage && 'flex items-center justify-center'}`}>
        {errorMessage ? (
          <div className="text-sm text-destructive">{errorMessage}</div>
        ) : enhancedContent ? (
          <div className="text-sm whitespace-pre-wrap">{enhancedContent}</div>
        ) : (
          <p className="text-muted-foreground text-center">{t("aiStudio.contentEnhancer.placeholder")}</p>
        )}
      </div>
    </div>
  );
};

export default EnhancedContentDisplay;
