
import { useSchedulePostState } from "./schedule-post/useSchedulePostState";
import { useState } from "react";
import { toast } from "sonner";
import { UseSchedulePostReturn } from "./schedule-post/types";

// Mock implementation of the sub-hooks
const useMediaHandlers = (state: ReturnType<typeof useSchedulePostState>) => {
  const handleMediaChange = (files: File[]) => {
    // Create preview URLs for the files
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    state.setTitle(state.title); // Just to use one of the state methods to satisfy TS
    
    // In a full implementation, we would:
    // 1. Update mediaFiles state
    // 2. Process and upload files
    // 3. Update mediaUrls with the uploaded URLs
    
    console.log("Media files changed:", files);
    console.log("Preview URLs:", newPreviewUrls);
  };
  
  const removeMedia = (index: number) => {
    console.log("Remove media at index:", index);
    // In a full implementation, we would:
    // 1. Remove the file from mediaFiles
    // 2. Remove the URL from mediaUrls
    // 3. Revoke the object URL to prevent memory leaks
  };
  
  return { handleMediaChange, removeMedia };
};

const useCrossPosting = (state: ReturnType<typeof useSchedulePostState>) => {
  const [enableCrossPosting, setEnableCrossPosting] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  
  const toggleCrossPosting = () => {
    setEnableCrossPosting(!enableCrossPosting);
  };
  
  const handleAccountToggle = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };
  
  const handlePlatformChange = (selectedPlatform: string) => {
    // Update the platform
    state.setPlatform(selectedPlatform);
    
    // Reset cross-posting when platform changes
    setSelectedAccounts([]);
    
    return selectedPlatform;
  };
  
  return { 
    handleAccountToggle, 
    toggleCrossPosting, 
    handlePlatformChange,
    enableCrossPosting,
    selectedAccounts
  };
};

const useContentGeneration = (state: ReturnType<typeof useSchedulePostState>) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateSuggestion = async () => {
    setIsGenerating(true);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example generated content
      const generated = `${state.title} - ${state.platform}\n\n` +
        "هذا محتوى مقترح تم إنشاؤه تلقائيًا لمنشورك. يمكنك تعديله حسب الحاجة." +
        "\n\n#تسويق #جمال #منتجات" +
        "\n@beautycompany";
      
      state.setSuggestedContent(generated);
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("فشل في إنشاء محتوى مقترح");
    } finally {
      setIsGenerating(false);
    }
  };
  
  return { handleGenerateSuggestion, isGenerating };
};

const useFormSubmission = (state: ReturnType<typeof useSchedulePostState> & { resetForm: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Form validation
      if (!state.title || !state.content || !state.platform) {
        toast.error("يرجى ملء جميع الحقول المطلوبة");
        return;
      }
      
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form submitted:", {
        title: state.title,
        content: state.content,
        platform: state.platform,
        scheduledDate: state.selectedDate,
        scheduledTime: state.selectedTime,
        campaignId: state.selectedCampaign,
      });
      
      toast.success("تم جدولة المنشور بنجاح");
      state.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("فشل في جدولة المنشور");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return { handleSubmit, isSubmitting };
};

const useFormReset = (state: ReturnType<typeof useSchedulePostState>) => {
  const resetForm = () => {
    state.setTitle("");
    state.setContent("");
    state.setSuggestedContent("");
    state.setPlatform("");
    state.setSelectedDate(new Date());
    state.setSelectedTime("12:00");
    state.setSelectedCampaign("");
  };
  
  return { resetForm };
};

export const useSchedulePost = (): UseSchedulePostReturn => {
  // Get state and setters
  const state = useSchedulePostState();
  
  // Create cross posting state
  const { 
    handleAccountToggle, 
    toggleCrossPosting, 
    handlePlatformChange,
    enableCrossPosting,
    selectedAccounts 
  } = useCrossPosting(state);
  
  // Create media handlers
  const { handleMediaChange, removeMedia } = useMediaHandlers(state);
  
  // Create content generation
  const { handleGenerateSuggestion, isGenerating } = useContentGeneration(state);
  
  // Create form reset
  const { resetForm } = useFormReset(state);
  
  // Create form submission
  const stateWithReset = { ...state, resetForm };
  const { handleSubmit, isSubmitting } = useFormSubmission(stateWithReset);

  // Wrap setPlatform to add cross-posting logic
  const setPlatformWithCrossPosting = (selectedPlatform: string) => {
    return handlePlatformChange(selectedPlatform);
  };

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
    hashtags: state.hashtags,
    mediaFiles: state.mediaFiles,
    mediaUrls: state.mediaUrls,
    previewUrls: state.previewUrls,
    
    // State from cross-posting
    enableCrossPosting,
    selectedAccounts,
    
    // State from content generation
    isGenerating,
    
    // State from form submission
    isSubmitting,
    
    // Setters
    setTitle: state.setTitle,
    setContent: state.setContent,
    setSuggestedContent: state.setSuggestedContent,
    setPlatform: setPlatformWithCrossPosting,
    setSelectedDate: state.setSelectedDate,
    setSelectedTime: state.setSelectedTime,
    setSelectedCampaign: state.setSelectedCampaign,
    
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
