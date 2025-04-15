
import { useState, useEffect } from "react";
import { 
  getCampaigns, 
  getSocialAccounts,
} from "../../services/integrationService";
import { UseSchedulePostState, UseSchedulePostStateSetters, UseSchedulePostStateWithSetters } from "./types";

export const useSchedulePostState = (): UseSchedulePostStateWithSetters => {
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
    content,
    suggestedContent,
    platform,
    selectedDate,
    selectedTime,
    isGenerating,
    isSubmitting,
    campaigns,
    selectedCampaign,
    socialAccounts,
    selectedAccounts,
    hashtags,
    mediaFiles,
    mediaUrls,
    previewUrls,
    enableCrossPosting,
    
    // Include all setters
    setTitle,
    setContent,
    setSuggestedContent,
    setPlatform,
    setSelectedDate,
    setSelectedTime,
    setIsGenerating,
    setIsSubmitting,
    setSelectedCampaign,
    setSelectedAccounts,
    setHashtags,
    setMediaFiles,
    setMediaUrls,
    setPreviewUrls,
    setEnableCrossPosting
  };
};
