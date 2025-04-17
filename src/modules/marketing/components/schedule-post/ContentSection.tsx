
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ContentSectionProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  suggestedContent: string;
  setSuggestedContent: (content: string) => void;
  hashtags: string[];
  isGenerating: boolean;
  onGenerateSuggestion: () => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  setTitle,
  content,
  setContent,
  suggestedContent,
  setSuggestedContent,
  hashtags,
  isGenerating,
  onGenerateSuggestion,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="title">{t("scheduler.contentSection.title", "العنوان")}</Label>
        <Input
          id="title"
          placeholder={t("scheduler.contentSection.titlePlaceholder", "أدخل عنوان المنشور هنا")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="content">{t("scheduler.contentSection.content", "المحتوى")}</Label>
        <Textarea
          id="content"
          placeholder={t("scheduler.contentSection.contentPlaceholder", "اكتب محتوى المنشور هنا")}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={onGenerateSuggestion}
          disabled={isGenerating || !content.trim()}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 animate-spin" />
              {t("common.generating", "جاري التوليد...")}
            </>
          ) : (
            <>
              <Sparkles className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
              {t("scheduler.contentSection.generateSuggestion", "توليد اقتراحات")}
            </>
          )}
        </Button>
      </div>

      {suggestedContent && (
        <div className="space-y-3 bg-secondary/30 p-4 rounded-md">
          <Label htmlFor="suggestedContent">
            {t("scheduler.contentSection.suggestedContent", "المحتوى المقترح")}
          </Label>
          <Textarea
            id="suggestedContent"
            value={suggestedContent}
            onChange={(e) => setSuggestedContent(e.target.value)}
            rows={4}
            className="resize-none"
          />

          {hashtags.length > 0 && (
            <div>
              <Label>{t("scheduler.contentSection.suggestedHashtags", "الهاشتاغات المقترحة")}</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {hashtags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Add the missing Input component import
import { Input } from "@/components/ui/input";

export default ContentSection;
