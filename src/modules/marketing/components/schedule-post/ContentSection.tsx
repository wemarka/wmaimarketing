
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Sparkles, Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export interface ContentSectionProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  suggestedContent: string;
  setSuggestedContent: Dispatch<SetStateAction<string>>;
  isGenerating: boolean;
  onGenerateSuggestion: () => Promise<void>;
  hashtags: string[];
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  setTitle,
  content,
  setContent,
  suggestedContent,
  setSuggestedContent,
  isGenerating,
  onGenerateSuggestion,
  hashtags
}) => {
  const { t } = useTranslation();

  const handleAcceptSuggestion = () => {
    setContent(suggestedContent);
    setSuggestedContent("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="content">{t("scheduler.contentSection.content", "محتوى المنشور")}</Label>
        <Textarea
          id="content"
          placeholder={t("scheduler.contentSection.contentPlaceholder", "أدخل محتوى المنشور هنا")}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-sm">
            #{tag}
          </Badge>
        ))}
      </div>

      {suggestedContent ? (
        <div className="bg-muted p-4 rounded-md border">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm">{t("scheduler.contentSection.suggestedContent", "المحتوى المقترح")}</h4>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 gap-1 text-green-600"
              onClick={handleAcceptSuggestion}
            >
              <Check className="h-4 w-4" />
              <span>{t("scheduler.contentSection.accept", "قبول")}</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{suggestedContent}</p>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full gap-2"
          disabled={isGenerating || !title}
          onClick={onGenerateSuggestion}
        >
          <Sparkles className="h-4 w-4" />
          <span>
            {isGenerating
              ? t("scheduler.contentSection.generating", "جاري التوليد...")
              : t("scheduler.contentSection.generateSuggestion", "اقتراح محتوى باستخدام الذكاء الاصطناعي")}
          </span>
        </Button>
      )}
    </div>
  );
};

export default ContentSection;
