
import { UseSchedulePostStateWithSetters } from "./types";

export const useFormReset = (state: UseSchedulePostStateWithSetters) => {
  const {
    setTitle,
    setContent,
    setSuggestedContent,
    setPlatform,
    setSelectedDate,
    setSelectedTime,
    setSelectedCampaign,
    setSelectedAccounts,
    setHashtags,
    setMediaFiles,
    setMediaUrls,
    setPreviewUrls,
    setEnableCrossPosting,
    previewUrls
  } = state;

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSuggestedContent("");
    setPlatform("");
    setSelectedDate(new Date());
    setSelectedTime("09:00");
    setSelectedCampaign("");
    setSelectedAccounts([]);
    setHashtags([]);
    setMediaFiles([]);
    setMediaUrls([]);
    
    // Clean up URL objects to prevent memory leaks
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    
    setEnableCrossPosting(false);
  };

  return {
    resetForm
  };
};
