
import { useState, Dispatch, SetStateAction } from "react";
import { UseSchedulePostState, UseSchedulePostStateSetters } from "./types";

export const useSchedulePostState = () => {
  // Basic post details
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [suggestedContent, setSuggestedContent] = useState<string>("");
  
  // Platform and scheduling
  const [platform, setPlatform] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  
  // Campaign and accounts
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [socialAccounts, setSocialAccounts] = useState<any[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  
  // Media and hashtags
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  // UI state
  const [enableCrossPosting, setEnableCrossPosting] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Combine state and setters
  const state: UseSchedulePostState & UseSchedulePostStateSetters = {
    // State
    title,
    content,
    suggestedContent,
    platform,
    selectedDate,
    selectedTime,
    campaigns,
    selectedCampaign,
    socialAccounts,
    selectedAccounts,
    hashtags,
    mediaFiles,
    mediaUrls,
    previewUrls,
    enableCrossPosting,
    isGenerating,
    isSubmitting,
    
    // Setters
    setTitle,
    setContent,
    setSuggestedContent,
    setPlatform,
    setSelectedDate,
    setSelectedTime,
    setCampaigns,
    setSelectedCampaign,
    setSocialAccounts,
    setSelectedAccounts,
    setHashtags,
    setMediaFiles,
    setMediaUrls,
    setPreviewUrls,
    setEnableCrossPosting,
    setIsGenerating,
    setIsSubmitting
  };
  
  return state;
};
