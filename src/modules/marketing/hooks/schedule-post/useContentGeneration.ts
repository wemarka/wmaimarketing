
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { generateContentSuggestion, generateHashtags } from "../../services/schedulerService";
import { UseSchedulePostStateWithSetters } from "./types";

export const useContentGeneration = (
  state: UseSchedulePostStateWithSetters
) => {
  const { t } = useTranslation();
  const {
    content,
    platform,
    setHashtags,
    setSuggestedContent,
    setIsGenerating
  } = state;

  const handleGenerateSuggestion = async () => {
    if (!content.trim() || !platform) {
      toast.error(t("scheduler.errors.noContentOrPlatform"));
      return;
    }

    setIsGenerating(true);
    try {
      // Generate improved content
      const improvedContent = await generateContentSuggestion(content, platform);
      setSuggestedContent(improvedContent);

      // Generate hashtags
      const generatedHashtags = await generateHashtags(content, platform);
      setHashtags(generatedHashtags);
      
      toast.success(t("scheduler.success.contentGenerated"));
    } catch (error) {
      console.error("Error generating content suggestion:", error);
      toast.error(t("scheduler.errors.contentGenerationFailed"));
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    handleGenerateSuggestion
  };
};
