
import { supabase } from "@/integrations/supabase/client";
import { Campaign } from "@/hooks/useCampaigns";
import { 
  SocialAccount, 
  ConnectAccountParams, 
  PlatformStats, 
  SchedulePostParams,
  PostResponse 
} from "../types/socialTypes";

// Get campaigns
export const getCampaigns = async (): Promise<Campaign[]> => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error fetching campaigns: ${error.message}`);
    }
    
    // Transform to Campaign type
    return data.map(campaign => ({
      ...campaign,
      status: campaign.status as 'active' | 'draft' | 'completed' | 'cancelled',
      target_audience: campaign.target_audience || []
    }));
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    return [];
  }
};

// Get platform statistics
export const getPlatformStats = async (): Promise<PlatformStats[]> => {
  try {
    // This would normally fetch from the API
    // For now, return mock data
    return [
      {
        platform: 'instagram',
        followers: 24500,
        engagement: 3.2,
        posts: 156,
        growth: 2.3,
        accountName: '@beautycompany'
      },
      {
        platform: 'facebook',
        followers: 18200,
        engagement: 1.8,
        posts: 98,
        growth: 1.1,
        accountName: 'Beauty Company'
      },
      {
        platform: 'twitter',
        followers: 12300,
        engagement: 2.5,
        posts: 215,
        growth: 4.2,
        accountName: '@beautyco'
      }
    ];
  } catch (error) {
    console.error('Failed to fetch platform stats:', error);
    return [];
  }
};

// Get social accounts
export const getSocialAccounts = async (): Promise<SocialAccount[]> => {
  try {
    // This would normally fetch from the API
    // For now, return mock data
    return [
      {
        id: "1",
        platform: "instagram",
        account_name: "@beautycompany",
        profile_name: "Beauty Company",
        status: "connected",
        user_id: "user123",
        insights: {
          followers: 24500,
          engagement: 3.2,
          postCount: 156
        }
      },
      {
        id: "2",
        platform: "facebook",
        account_name: "Beauty Company",
        profile_name: "Beauty Brand",
        status: "connected",
        user_id: "user123",
        insights: {
          followers: 18200,
          engagement: 1.8,
          postCount: 98
        }
      },
      {
        id: "3",
        platform: "twitter",
        account_name: "@beautyco",
        profile_name: "Beauty Co.",
        status: "connected",
        user_id: "user123",
        insights: {
          followers: 12300,
          engagement: 2.5,
          postCount: 215
        }
      }
    ];
  } catch (error) {
    console.error('Failed to fetch social accounts:', error);
    return [];
  }
};

// Connect a social account
export const connectAccount = async (params: ConnectAccountParams): Promise<SocialAccount> => {
  // Mock implementation
  console.log('Connecting account with params:', params);
  
  // Return mock data
  return {
    id: Math.random().toString(36).substr(2, 9),
    platform: params.platform,
    account_name: params.accountName,
    profile_name: params.profileName,
    status: "connected",
    user_id: "user123",
    insights: {
      followers: 0,
      engagement: 0,
      postCount: 0
    }
  };
};

// Disconnect a social account
export const disconnectAccount = async (accountId: string): Promise<void> => {
  // Mock implementation
  console.log('Disconnecting account with ID:', accountId);
};

// Schedule a post
export const schedulePost = async (params: SchedulePostParams): Promise<string> => {
  try {
    // Mock implementation
    console.log('Scheduling post with params:', params);
    
    // Return mock post ID
    return Math.random().toString(36).substr(2, 9);
  } catch (error) {
    console.error('Failed to schedule post:', error);
    throw error;
  }
};

// Generate content suggestion
export const generateContentSuggestion = async (content: string, platform: string): Promise<string> => {
  // Mock implementation
  console.log(`Generating content suggestion for ${platform} with content:`, content);
  
  // Return mock suggestion
  return `${content}\n\nOptimized for ${platform} with better engagement!\n#trending #${platform}Marketing`;
};

// Generate hashtags
export const generateHashtags = async (content: string, platform: string): Promise<string[]> => {
  // Mock implementation
  console.log(`Generating hashtags for ${platform} with content:`, content);
  
  // Return mock hashtags
  return ['marketing', platform.toLowerCase(), 'trending', 'engagement', 'social'];
};

// Get suggested posting times
export const getSuggestedPostingTimes = async (platform: string): Promise<{ day: string, hour: number, score: number }[]> => {
  // Mock implementation
  console.log(`Getting suggested posting times for ${platform}`);
  
  // Return mock data
  return [
    { day: 'Monday', hour: 12, score: 0.85 },
    { day: 'Wednesday', hour: 15, score: 0.92 },
    { day: 'Friday', hour: 18, score: 0.88 },
    { day: 'Sunday', hour: 10, score: 0.78 }
  ];
};

// Cross post content to multiple platforms
export const crossPostContent = async (
  content: string, 
  mediaUrls: string[], 
  platforms: string[]
): Promise<PostResponse[]> => {
  // Mock implementation
  console.log(`Cross-posting content to ${platforms.join(', ')}`, content, mediaUrls);
  
  // Return mock response
  return platforms.map(platform => ({
    status: Math.random() > 0.2 ? "success" : "error",
    platform,
    postId: Math.random() > 0.2 ? Math.random().toString(36).substr(2, 9) : undefined,
    error: Math.random() > 0.8 ? "API rate limit exceeded" : undefined
  }));
};
