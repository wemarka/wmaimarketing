
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { 
  schedulePost, 
  getCampaigns, 
  getSocialAccounts, 
  generateContentSuggestion,
  generateHashtags
} from "../services/schedulerService";

export const useSchedulePost = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [suggestedContent, setSuggestedContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [socialAccounts, setSocialAccounts] = useState<any[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    loadCampaigns();
    loadSocialAccounts();
  }, []);

  const loadCampaigns = async () => {
    try {
      const campaignsData = await getCampaigns();
      setCampaigns(campaignsData);
    } catch (error) {
      console.error("Error loading campaigns:", error);
    }
  };

  const loadSocialAccounts = async () => {
    try {
      const accountsData = await getSocialAccounts();
      setSocialAccounts(accountsData);
    } catch (error) {
      console.error("Error loading social accounts:", error);
    }
  };

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const files = Array.from(event.target.files);
    setMediaFiles(prevFiles => [...prevFiles, ...files]);
    
    // Create preview URLs for the new files
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  const handleGenerateSuggestion = async () => {
    if (!content.trim()) {
      toast.error(t("scheduler.errors.emptyContent"));
      return;
    }
    
    setIsGenerating(true);
    try {
      const suggestion = await generateContentSuggestion(content, platform);
      setSuggestedContent(suggestion);
      
      // Generate hashtags
      const tags = await generateHashtags(content, platform);
      setHashtags(tags);
      
      toast.success(t("scheduler.success.suggestionGenerated"));
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast.error(t("scheduler.errors.suggestionFailed"));
    } finally {
      setIsGenerating(false);
    }
  };

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
      
      // Schedule the post
      await schedulePost({
        title,
        content: suggestedContent || content,
        platform,
        scheduledAt: scheduledDate.toISOString(),
        mediaUrls: uploadedUrls,
        campaignId: selectedCampaign || undefined
      });
      
      toast.success(t("scheduler.success.postScheduled"));
      
      // Reset the form
      resetForm();
      
    } catch (error) {
      console.error("Error scheduling post:", error);
      toast.error(t("scheduler.errors.schedulingFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

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
    setPreviewUrls([]);
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    suggestedContent,
    setSuggestedContent,
    platform,
    setPlatform,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    isGenerating,
    isSubmitting,
    campaigns,
    selectedCampaign,
    setSelectedCampaign,
    socialAccounts,
    hashtags,
    mediaFiles,
    previewUrls,
    handleMediaChange,
    removeMedia,
    handleGenerateSuggestion,
    handleSubmit
  };
};
