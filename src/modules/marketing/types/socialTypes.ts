
// Social media related types

export interface SocialAccount {
  id: string;
  platform: string;
  account_name: string;
  profile_name: string;
  status: "connected" | "pending" | "error" | "disconnected";
  user_id: string;
  insights?: {
    followers: number;
    engagement: number;
    postCount: number;
  };
}

export interface ConnectAccountParams {
  platform: string;
  accountName: string;
  profileName: string;
  oauthCode?: string;
}

export interface PlatformStats {
  platform: string;
  posts: number;
  engagement: number;
  followers: number;
  growth: number;
  accountName: string;
  lastUpdated?: string;
}

export interface SchedulePostParams {
  title: string;
  content: string;
  platform: string;
  scheduledAt: string;
  mediaUrls?: string[];
  campaignId?: string;
  crossPostAccountIds?: string[];
}

export interface PostResponse {
  status: "success" | "error";
  platform: string;
  postId?: string;
  error?: string;
}
