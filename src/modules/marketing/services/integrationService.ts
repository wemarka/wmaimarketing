
import { SocialAccount, ConnectAccountParams, PlatformStats, SchedulePostParams } from "../types/socialTypes";
import { getSocialAccounts, connectAccount, disconnectAccount } from "./accountService";
import { getPlatformStats, getPostInsights } from "./analyticsService";
import { getCampaigns } from "./campaignService";
import { getSuggestedPostingTimes, generateContentSuggestion, generateHashtags } from "./contentService";
import { schedulePost, crossPostContent } from "./postService";

// Re-export everything for backwards compatibility
export type {
  SocialAccount,
  ConnectAccountParams,
  PlatformStats,
  SchedulePostParams
};

export {
  getSocialAccounts,
  connectAccount,
  disconnectAccount,
  getPlatformStats,
  getPostInsights,
  getCampaigns,
  getSuggestedPostingTimes,
  generateContentSuggestion,
  generateHashtags,
  schedulePost,
  crossPostContent
};
