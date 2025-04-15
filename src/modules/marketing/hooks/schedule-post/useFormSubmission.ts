
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { schedulePost } from "../../services/integrationService";
import { UseSchedulePostStateWithSetters } from "./types";

export const useFormSubmission = (
  state: UseSchedulePostStateWithSetters & {
    resetForm: () => void;
  }
) => {
  const { t } = useTranslation();
  const {
    title,
    content,
    suggestedContent,
    platform,
    selectedDate,
    selectedTime,
    selectedCampaign,
    previewUrls,
    enableCrossPosting,
    selectedAccounts,
    setIsSubmitting,
    resetForm
  } = state;

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !platform || !selectedDate) {
      toast.error(t("scheduler.errors.missingFields"));
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Combine date and time
      const scheduledDate = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':').map(Number);
      scheduledDate.setHours(hours, minutes, 0, 0);
      
      // Upload media files and get URLs
      // For now, just use the preview URLs as placeholders
      const uploadedUrls = previewUrls.length ? previewUrls : [];

      // تحضير قائمة الحسابات للنشر
      const accountsToPost = enableCrossPosting && selectedAccounts.length 
        ? selectedAccounts 
        : [];
      
      // Schedule the post
      await schedulePost({
        title,
        content: suggestedContent || content,
        platform,
        scheduledAt: scheduledDate.toISOString(),
        mediaUrls: uploadedUrls,
        campaignId: selectedCampaign || undefined,
        crossPostAccountIds: accountsToPost,
      });
      
      toast.success(
        enableCrossPosting && selectedAccounts.length > 1
          ? t("scheduler.success.postScheduledMultiple", {count: selectedAccounts.length})
          : t("scheduler.success.postScheduled")
      );
      
      // Reset the form
      resetForm();
      
    } catch (error) {
      console.error("Error scheduling post:", error);
      toast.error(t("scheduler.errors.schedulingFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit
  };
};
