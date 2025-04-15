
import { SocialAccount } from "../../services/integrationService";
import { Dispatch, SetStateAction } from "react";

export interface UseSchedulePostState {
  title: string;
  content: string;
  suggestedContent: string;
  platform: string;
  selectedDate: Date | undefined;
  selectedTime: string;
  campaigns: any[];
  selectedCampaign: string;
  socialAccounts: SocialAccount[];
  selectedAccounts: string[];
  hashtags: string[];
  mediaFiles: File[];
  mediaUrls: string[];
  previewUrls: string[];
  enableCrossPosting: boolean;
  isGenerating: boolean;
  isSubmitting: boolean;
}

export interface UseSchedulePostStateSetters {
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  setSuggestedContent: Dispatch<SetStateAction<string>>;
  setPlatform: Dispatch<SetStateAction<string>>;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
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
}

export interface UseSchedulePostActions {
  handleAccountToggle: (accountId: string, isChecked: boolean) => void;
  toggleCrossPosting: (enabled: boolean) => void;
  handleMediaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeMedia: (index: number) => void;
  handleGenerateSuggestion: () => Promise<void>;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

export type UseSchedulePostReturn = UseSchedulePostState & UseSchedulePostActions;

export type UseSchedulePostStateWithSetters = UseSchedulePostState & UseSchedulePostStateSetters;
