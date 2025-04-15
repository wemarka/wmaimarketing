
import { URL } from "url";
import { UseSchedulePostState } from "./types";

type ResetState = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setSuggestedContent: React.Dispatch<React.SetStateAction<string>>;
  setPlatform: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCampaign: React.Dispatch<React.SetStateAction<string>>;
  setHashtags: React.Dispatch<React.SetStateAction<string[]>>;
  setMediaFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedAccounts: React.Dispatch<React.SetStateAction<string[]>>;
  setEnableCrossPosting: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useFormReset = (state: UseSchedulePostState & ResetState) => {
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
