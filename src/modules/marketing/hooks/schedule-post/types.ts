
import { Dispatch, SetStateAction, ChangeEvent } from "react";

// Define the state types
export interface UseSchedulePostState {
  title: string;
  content: string;
  suggestedContent: string;
  platform: string;
  selectedDate: Date;
  selectedTime: string;
  campaigns: any[];
  selectedCampaign: string;
  socialAccounts: any[];
  selectedAccounts: string[];
  hashtags: string[];
  mediaFiles: File[];
  mediaUrls: string[];
  previewUrls: string[];
  enableCrossPosting: boolean;
  isGenerating: boolean;
  isSubmitting: boolean;
}

// Define the state setters
export interface UseSchedulePostStateSetters {
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  setSuggestedContent: Dispatch<SetStateAction<string>>;
  setPlatform: Dispatch<SetStateAction<string>>;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  setSelectedTime: Dispatch<SetStateAction<string>>;
  setCampaigns: Dispatch<SetStateAction<any[]>>;
  setSelectedCampaign: Dispatch<SetStateAction<string>>;
  setSocialAccounts: Dispatch<SetStateAction<any[]>>;
  setSelectedAccounts: Dispatch<SetStateAction<string[]>>;
  setHashtags: Dispatch<SetStateAction<string[]>>;
  setMediaFiles: Dispatch<SetStateAction<File[]>>;
  setMediaUrls: Dispatch<SetStateAction<string[]>>;
  setPreviewUrls: Dispatch<SetStateAction<string[]>>;
  setEnableCrossPosting: Dispatch<SetStateAction<boolean>>;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

// Combine state and setters
export type UseSchedulePostStateWithSetters = UseSchedulePostState & UseSchedulePostStateSetters;

// Define the return type of the useSchedulePost hook
export interface UseSchedulePostReturn extends UseSchedulePostState {
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  setSuggestedContent: Dispatch<SetStateAction<string>>;
  setPlatform: (platform: string) => string;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  setSelectedTime: Dispatch<SetStateAction<string>>;
  setSelectedCampaign: Dispatch<SetStateAction<string>>;
  setSelectedAccounts: Dispatch<SetStateAction<string[]>>;
  setHashtags: Dispatch<SetStateAction<string[]>>;
  setMediaFiles: Dispatch<SetStateAction<File[]>>;
  setMediaUrls: Dispatch<SetStateAction<string[]>>;
  setPreviewUrls: Dispatch<SetStateAction<string[]>>;
  setEnableCrossPosting: Dispatch<SetStateAction<boolean>>;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  
  // Additional methods
  handleAccountToggle: (accountId: string) => void;
  toggleCrossPosting: () => void;
  handleMediaChange: (files: File[]) => void;
  handleFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void; // Add this line
  removeMedia: (index: number) => void;
  handleGenerateSuggestion: () => Promise<void>;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

// Add a simple validation schema
export interface SchedulePostFormSchema {
  title: string;
  content: string;
  platform: string;
  scheduledAt: string;
  campaignId?: string;
}
