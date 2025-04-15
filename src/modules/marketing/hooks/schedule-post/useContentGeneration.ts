
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { generateContentSuggestion, generateHashtags } from "../../services/integrationService";
import { UseSchedulePostStateWithSetters } from "./types";

export const useContentGeneration = (state: UseSchedulePostStateWithSetters) => {
  const { t } = useTranslation();
  const { 
    content, 
    platform,
    setIsGenerating,
    setSuggestedContent,
    setHashtags
  } = state;

  const handleGenerateSuggestion = async () => {
    if (!content.trim()) {
      toast.error(t("scheduler.errors.emptyContent"));
      return;
    }
    
    setIsGenerating(true);
    try {
      const suggestion = await generateContentSuggestion(content, platform);
      setSuggestedContent(suggestion);
      
      // Generate hashtags
      const tags = await generateHashtags(content, platform);
      setHashtags(tags);
      
      toast.success(t("scheduler.success.suggestionGenerated"));
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast.error(t("scheduler.errors.suggestionFailed"));
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    handleGenerateSuggestion
  };
};
