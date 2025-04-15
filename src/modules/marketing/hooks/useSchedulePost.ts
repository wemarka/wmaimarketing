
import { useSchedulePostState } from "./schedule-post/useSchedulePostState";
import { useMediaHandlers } from "./schedule-post/useMediaHandlers";
import { useCrossPosting } from "./schedule-post/useCrossPosting";
import { useContentGeneration } from "./schedule-post/useContentGeneration";
import { useFormSubmission } from "./schedule-post/useFormSubmission";
import { useFormReset } from "./schedule-post/useFormReset";
import { UseSchedulePostReturn } from "./schedule-post/types";

export const useSchedulePost = (): UseSchedulePostReturn => {
  const state = useSchedulePostState();
  
  const {
    setTitle,
    setContent,
    setSuggestedContent,
    setPlatform,
    setSelectedDate,
    setSelectedTime,
    setSelectedCampaign,
  } = state;

  const { handleMediaChange, removeMedia } = useMediaHandlers(state);
  const { handleAccountToggle, toggleCrossPosting, handlePlatformChange } = useCrossPosting(state);
  const { handleGenerateSuggestion } = useContentGeneration(state);
  const { resetForm } = useFormReset(state);
  const { handleSubmit } = useFormSubmission({...state, resetForm});

  // Wrap setPlatform to add cross-posting logic
  const setPlatformWithCrossPosting = (selectedPlatform: string) => {
    setPlatform(handlePlatformChange(selectedPlatform));
  };

  return {
    ...state,
    setTitle,
    setContent,
    setSuggestedContent,
    setPlatform: setPlatformWithCrossPosting,
    setSelectedDate,
    setSelectedTime,
    setSelectedCampaign,
    handleAccountToggle,
    toggleCrossPosting,
    handleMediaChange,
    removeMedia,
    handleGenerateSuggestion,
    handleSubmit,
    resetForm
  };
};
