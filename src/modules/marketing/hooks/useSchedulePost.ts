import { useSchedulePostState } from "./schedule-post/useSchedulePostState";
import { useMediaHandlers } from "./schedule-post/useMediaHandlers";
import { useCrossPosting } from "./schedule-post/useCrossPosting";
import { useContentGeneration } from "./schedule-post/useContentGeneration";
import { useFormSubmission } from "./schedule-post/useFormSubmission";
import { useFormReset } from "./schedule-post/useFormReset";
import { UseSchedulePostReturn } from "./schedule-post/types";

export const useSchedulePost = (): UseSchedulePostReturn => {
  // Get state and setters
  const state = useSchedulePostState();
  
  // Use the state with setters in all the other hooks
  const { handleMediaChange, removeMedia } = useMediaHandlers(state);
  const { handleAccountToggle, toggleCrossPosting, handlePlatformChange } = useCrossPosting(state);
  const { handleGenerateSuggestion } = useContentGeneration(state);
  const { resetForm } = useFormReset(state);
  
  // Add resetForm to state before passing to useFormSubmission
  const stateWithReset = { ...state, resetForm };
  const { handleSubmit } = useFormSubmission(stateWithReset);

  // Wrap setPlatform to add cross-posting logic
  const setPlatformWithCrossPosting = (selectedPlatform: string) => {
    state.setPlatform(handlePlatformChange(selectedPlatform));
  };

  // Return only the properties defined in UseSchedulePostReturn
  return {
    // State properties
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
    
    // Setter actions
    setTitle: state.setTitle,
    setContent: state.setContent,
    setSuggestedContent: state.setSuggestedContent,
    setPlatform: setPlatformWithCrossPosting,
    setSelectedDate: state.setSelectedDate,
    setSelectedTime: state.setSelectedTime,
    setSelectedCampaign: state.setSelectedCampaign,
    
    // Other actions
    handleAccountToggle,
    toggleCrossPosting,
    handleMediaChange,
    removeMedia,
    handleGenerateSuggestion,
    handleSubmit,
    resetForm
  };
};
