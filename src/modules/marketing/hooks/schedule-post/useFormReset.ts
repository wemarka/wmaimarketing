
import { UseSchedulePostStateWithSetters } from "./types";

export const useFormReset = (state: UseSchedulePostStateWithSetters) => {
  const {
    previewUrls,
    setTitle,
    setContent,
    setSuggestedContent,
    setPlatform,
    setSelectedDate,
    setSelectedTime,
    setSelectedCampaign,
    setHashtags,
    setMediaFiles,
    setPreviewUrls,
    setSelectedAccounts,
    setEnableCrossPosting
  } = state;

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSuggestedContent("");
    setPlatform("");
    setSelectedDate(new Date());
    setSelectedTime("09:00");
    setSelectedCampaign("");
    setHashtags([]);
    setMediaFiles([]);
    
    // Clean up preview URLs to prevent memory leaks
    previewUrls.forEach(url => {
      try {
        // Use the global URL.revokeObjectURL instead of importing from 'url'
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error revoking URL:", error);
      }
    });
    
    setPreviewUrls([]);
    setSelectedAccounts([]);
    setEnableCrossPosting(false);
  };

  return {
    resetForm
  };
};
