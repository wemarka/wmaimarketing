
import { useSchedulePostState } from "./schedule-post/useSchedulePostState";
import { useMediaHandlers } from "./schedule-post/useMediaHandlers";
import { useCrossPosting } from "./schedule-post/useCrossPosting";
import { useContentGeneration } from "./schedule-post/useContentGeneration";
import { useFormReset } from "./schedule-post/useFormReset";
import { useFormSubmission } from "./schedule-post/useFormSubmission";
import { UseSchedulePostReturn } from "./schedule-post/types";

export const useSchedulePost = (): UseSchedulePostReturn => {
  // Get state and setters
  const state = useSchedulePostState();
  
  // Create cross posting state
  const { 
    handleAccountToggle, 
    toggleCrossPosting, 
    handlePlatformChange 
  } = useCrossPosting(state);
  
  // Create media handlers
  const { handleMediaChange, removeMedia } = useMediaHandlers(state);
  
  // Create content generation
  const { handleGenerateSuggestion } = useContentGeneration(state);
  
  // Create form reset
  const { resetForm } = useFormReset(state);
  
  // Create form submission
  const stateWithReset = { ...state, resetForm };
  const { handleSubmit } = useFormSubmission(stateWithReset);

  // Return the combined hook interface
  return {
    // State properties from useSchedulePostState
    title: state.title,
    content: state.content,
    suggestedContent: state.suggestedContent,
    platform: state.platform,
    selectedDate: state.selectedDate,
    selectedTime: state.selectedTime,
    campaigns: state.campaigns,
    selectedCampaign: state.selectedCampaign,
    socialAccounts: state.socialAccounts,
    selectedAccounts: state.selectedAccounts,
    hashtags: state.hashtags,
    mediaFiles: state.mediaFiles,
    mediaUrls: state.mediaUrls,
    previewUrls: state.previewUrls,
    enableCrossPosting: state.enableCrossPosting,
    isGenerating: state.isGenerating,
    isSubmitting: state.isSubmitting,
    
    // Setters
    setTitle: state.setTitle,
    setContent: state.setContent,
    setSuggestedContent: state.setSuggestedContent,
    setPlatform: (platform: string) => handlePlatformChange(platform),
    setSelectedDate: state.setSelectedDate,
    setSelectedTime: state.setSelectedTime,
    setSelectedCampaign: state.setSelectedCampaign,
    setSelectedAccounts: state.setSelectedAccounts,
    setHashtags: state.setHashtags,
    setMediaFiles: state.setMediaFiles,
    setMediaUrls: state.setMediaUrls,
    setPreviewUrls: state.setPreviewUrls,
    setEnableCrossPosting: state.setEnableCrossPosting,
    setIsGenerating: state.setIsGenerating,
    setIsSubmitting: state.setIsSubmitting,
    
    // Actions
    handleAccountToggle,
    toggleCrossPosting,
    handleMediaChange,
    removeMedia,
    handleGenerateSuggestion,
    handleSubmit,
    resetForm
  };
};
