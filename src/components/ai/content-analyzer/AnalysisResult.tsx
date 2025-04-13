
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface AnalysisResultProps {
  analysisResult: string | null;
  errorMessage: string | null;
  isLoading: boolean;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({
  analysisResult,
  errorMessage,
  isLoading
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleCopy = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(analysisResult);
      toast({
        title: t("aiStudio.contentAnalyzer.copied"),
        description: t("aiStudio.contentAnalyzer.copiedDescription"),
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{t("aiStudio.contentAnalyzer.analysisResult")}</h3>
        {analysisResult && (
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className={`${t("common.textDirection") === "rtl" ? "ml-1" : "mr-1"} h-3 w-3`} />
            {t("aiStudio.common.copy")}
          </Button>
        )}
      </div>
      
      <div className={`border rounded-md p-3 bg-muted/20 h-[350px] overflow-y-auto ${!analysisResult && !errorMessage && !isLoading && 'flex items-center justify-center'}`}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">{t("aiStudio.contentAnalyzer.analyzing")}</p>
          </div>
        ) : errorMessage ? (
          <div className="text-sm text-destructive">{errorMessage}</div>
        ) : analysisResult ? (
          <div className="text-sm whitespace-pre-wrap">{analysisResult}</div>
        ) : (
          <p className="text-muted-foreground text-center">{t("aiStudio.contentAnalyzer.placeholder")}</p>
        )}
      </div>
    </div>
  );
};

export default AnalysisResult;
