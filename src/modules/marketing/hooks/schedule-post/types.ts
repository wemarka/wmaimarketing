
import { UseFormReturn } from "react-hook-form";
import { SchedulePostFormSchema } from "./validationSchema";

// Define the type for the form
export type SchedulePostForm = SchedulePostFormSchema;

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
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSuggestedContent: (content: string) => void;
  setPlatform: (platform: string) => void;
  setSelectedDate: (date: Date) => void;
  setSelectedTime: (time: string) => void;
  setSelectedCampaign: (campaignId: string) => void;
  setSelectedAccounts: (accounts: string[]) => void;
  setHashtags: (hashtags: string[]) => void;
  setMediaFiles: (files: File[]) => void;
  setMediaUrls: (urls: string[]) => void;
  setPreviewUrls: (urls: string[]) => void;
  setEnableCrossPosting: (enabled: boolean) => void;
  setIsGenerating: (generating: boolean) => void;
  setIsSubmitting: (submitting: boolean) => void;
}

// Combine state and setters
export type UseSchedulePostStateWithSetters = UseSchedulePostState & UseSchedulePostStateSetters;

// Define the return type of the useSchedulePost hook
export interface UseSchedulePostReturn extends UseSchedulePostState, UseSchedulePostStateSetters {
  handleAccountToggle: (accountId: string) => void;
  toggleCrossPosting: () => void;
  handleMediaChange: (files: File[]) => void;
  removeMedia: (index: number) => void;
  handleGenerateSuggestion: () => Promise<void>;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}
