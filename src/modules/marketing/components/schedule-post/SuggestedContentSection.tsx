
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SuggestedContentSectionProps {
  content: string;
  suggestedContent: string;
  platform: string;
  onApplySuggestion: () => void;
  onGenerateSuggestion: () => void;
  isGenerating: boolean;
}

const SuggestedContentSection: React.FC<SuggestedContentSectionProps> = ({
  content,
  suggestedContent,
  platform,
  onApplySuggestion,
  onGenerateSuggestion,
  isGenerating,
}) => {
  const { t } = useTranslation();

  if (!content || content.length < 10) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md flex justify-between items-center">
          <span>{t("scheduler.suggestedContent.title", "تحسين المحتوى")}</span>
          {!isGenerating && !suggestedContent && (
            <Button
              variant="outline"
              size="sm"
              onClick={onGenerateSuggestion}
              disabled={!platform || isGenerating || !content}
              className="gap-1"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t("scheduler.suggestedContent.generate", "تحسين")}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              {t("scheduler.suggestedContent.generating", "جاري تحسين المحتوى...")}
            </p>
          </div>
        ) : suggestedContent ? (
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <p className="whitespace-pre-wrap text-sm">{suggestedContent}</p>
            </div>
            <Button onClick={onApplySuggestion} className="w-full">
              <Check className="mr-2 h-4 w-4" />
              {t("scheduler.suggestedContent.apply", "استخدام المحتوى المحسن")}
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">
              {t(
                "scheduler.suggestedContent.info",
                "يمكنك تحسين المحتوى باستخدام الذكاء الاصطناعي"
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuggestedContentSection;
