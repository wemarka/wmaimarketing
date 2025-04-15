
import { useState, useEffect } from "react";
import { 
  getCampaigns, 
  getSocialAccounts,
} from "../../services/integrationService";
import { UseSchedulePostState } from "./types";

export const useSchedulePostState = (): UseSchedulePostState => {
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
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [enableCrossPosting, setEnableCrossPosting] = useState(false);

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
    setIsGenerating,
    isSubmitting,
    setIsSubmitting,
    campaigns,
    selectedCampaign,
    setSelectedCampaign,
    socialAccounts,
    selectedAccounts,
    setSelectedAccounts,
    hashtags,
    setHashtags,
    mediaFiles,
    setMediaFiles,
    mediaUrls,
    setMediaUrls,
    previewUrls,
    setPreviewUrls,
    enableCrossPosting,
    setEnableCrossPosting,
  };
};
