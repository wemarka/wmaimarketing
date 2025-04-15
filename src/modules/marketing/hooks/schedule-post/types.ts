
import { SocialAccount } from "../../services/integrationService";

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

export interface UseSchedulePostActions {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSuggestedContent: (content: string) => void;
  setPlatform: (platform: string) => void;
  setSelectedDate: (date: Date | undefined) => void;
  setSelectedTime: (time: string) => void;
  setSelectedCampaign: (campaignId: string) => void;
  handleAccountToggle: (accountId: string, isChecked: boolean) => void;
  toggleCrossPosting: (enabled: boolean) => void;
  handleMediaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeMedia: (index: number) => void;
  handleGenerateSuggestion: () => Promise<void>;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

export type UseSchedulePostReturn = UseSchedulePostState & UseSchedulePostActions;
