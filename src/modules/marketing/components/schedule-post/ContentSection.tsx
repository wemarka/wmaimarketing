
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import SuggestedContentSection from "./SuggestedContentSection";
import { Badge } from "@/components/ui/badge";

export interface ContentSectionProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  suggestedContent: string;
  setSuggestedContent: React.Dispatch<React.SetStateAction<string>>;
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
  hashtags,
}) => {
  const { t } = useTranslation();

  const handleApplySuggestion = () => {
    setContent(suggestedContent);
    setSuggestedContent("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="content">{t("scheduler.contentSection.content", "محتوى المنشور")}</Label>
          {content && content.length > 10 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onGenerateSuggestion}
              disabled={isGenerating}
              className="gap-1"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t("scheduler.contentSection.enhance", "تحسين المحتوى")}
            </Button>
          )}
        </div>
        <Textarea
          id="content"
          placeholder={t("scheduler.contentSection.placeholder", "اكتب محتوى المنشور هنا...")}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      {hashtags.length > 0 && (
        <div className="space-y-2">
          <Label>{t("scheduler.contentSection.hashtags", "الهاشتاغات المقترحة")}</Label>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-muted hover:bg-muted cursor-pointer" onClick={() => setContent(content + ` #${tag}`)}>
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {(content && content.length > 10) && (
        <SuggestedContentSection
          content={content}
          suggestedContent={suggestedContent}
          platform=""
          onApplySuggestion={handleApplySuggestion}
          onGenerateSuggestion={onGenerateSuggestion}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
};

export default ContentSection;
