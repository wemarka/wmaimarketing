
import { useState } from "react";
import { toast } from "sonner";
import { UseSchedulePostState, UseSchedulePostStateSetters } from "./types";
import { schedulePost, SchedulePostParams } from "../../services/schedulerService";

interface UseFormSubmissionProps {
  state: UseSchedulePostState & UseSchedulePostStateSetters;
  resetForm: () => void;
}

export const useFormSubmission = ({ state, resetForm }: UseFormSubmissionProps) => {
  const {
    title,
    content,
    platform,
    selectedDate,
    selectedTime,
    selectedCampaign,
    mediaUrls,
    selectedAccounts,
    enableCrossPosting,
    setIsSubmitting
  } = state;
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Form validation
      if (!title || !content || !platform) {
        toast.error("يرجى ملء جميع الحقول المطلوبة");
        setIsSubmitting(false);
        return;
      }
      
      // Construct the scheduled datetime
      const scheduledTime = selectedTime.split(':');
      const scheduledDate = new Date(selectedDate);
      
      scheduledDate.setHours(
        parseInt(scheduledTime[0], 10),
        parseInt(scheduledTime[1], 10),
        0
      );
      
      // Prepare the post parameters
      const postParams: SchedulePostParams = {
        title,
        content,
        platform,
        scheduledAt: scheduledDate.toISOString(),
        mediaUrls: mediaUrls,
        campaignId: selectedCampaign || undefined,
        crossPostAccountIds: enableCrossPosting ? selectedAccounts : undefined
      };
      
      // Schedule the post
      try {
        const response = await schedulePost(postParams);
        console.log("Post scheduled:", response);
        toast.success("تم جدولة المنشور بنجاح");
        resetForm();
      } catch (error) {
        console.error("Error scheduling post:", error);
        toast.error("فشل في جدولة المنشور");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("فشل في جدولة المنشور");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return { handleSubmit };
};
