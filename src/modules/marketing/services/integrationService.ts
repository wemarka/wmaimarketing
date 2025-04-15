
import { supabase } from "@/integrations/supabase/client";

export interface SocialAccount {
  id: string;
  platform: string;
  account_name: string;
  profile_name: string;
  status: "connected" | "pending" | "error";
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
}

/**
 * Retrieve all social accounts for the current user
 */
export const getSocialAccounts = async (): Promise<SocialAccount[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from('social_accounts')
    .select('*')
    .eq('user_id', user.user.id);
  
  if (error) {
    console.error("Error fetching social accounts:", error);
    throw error;
  }
  
  return data as SocialAccount[];
};

/**
 * Connect a new social media account
 */
export const connectAccount = async (params: ConnectAccountParams): Promise<SocialAccount> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  // In a real implementation, this would include OAuth flow with the platform
  const { data, error } = await supabase
    .from('social_accounts')
    .insert({
      platform: params.platform,
      account_name: params.accountName,
      profile_name: params.profileName,
      user_id: user.user.id,
      status: 'connected',
      // Random followers count for demonstration
      insights: {
        followers: Math.floor(Math.random() * 10000) + 1000,
        engagement: parseFloat((Math.random() * 5 + 1).toFixed(2)),
        postCount: Math.floor(Math.random() * 100) + 10
      }
    })
    .select()
    .single();
  
  if (error) {
    console.error("Error connecting account:", error);
    throw error;
  }
  
  return data as SocialAccount;
};

/**
 * Disconnect a social media account
 */
export const disconnectAccount = async (accountId: string): Promise<void> => {
  const { error } = await supabase
    .from('social_accounts')
    .update({ status: 'disconnected' })
    .eq('id', accountId);
  
  if (error) {
    console.error("Error disconnecting account:", error);
    throw error;
  }
};

/**
 * Get statistics for all platforms
 */
export const getPlatformStats = async (): Promise<PlatformStats[]> => {
  // In a real implementation, this would fetch actual statistics
  // For now, we'll return mock data
  return [
    {
      platform: "instagram",
      posts: 42,
      engagement: 3.2,
      followers: 12500,
      growth: 2.5
    },
    {
      platform: "facebook",
      posts: 38,
      engagement: 1.8,
      followers: 8700,
      growth: -0.3
    },
    {
      platform: "twitter",
      posts: 67,
      engagement: 2.1,
      followers: 5300,
      growth: 1.7
    },
    {
      platform: "tiktok",
      posts: 12,
      engagement: 4.7,
      followers: 3200,
      growth: 8.2
    }
  ];
};

/**
 * Get suggested posting times based on platform and historical data
 */
export const getSuggestedPostingTimes = async (platform: string): Promise<{day: string, hour: number, score: number}[]> => {
  // This would typically be calculated based on historical engagement data
  // Returning mock data for demonstration
  const days = ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"];
  
  const result = [];
  for (const day of days) {
    // Generate 2-3 optimal times per day
    const timesCount = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < timesCount; i++) {
      const hour = Math.floor(Math.random() * 12) + 8; // Between 8AM and 8PM
      const score = parseFloat((Math.random() * 10).toFixed(1));
      result.push({ day, hour, score });
    }
  }
  
  // Sort by score descending
  return result.sort((a, b) => b.score - a.score);
};

/**
 * Cross-post content to multiple platforms
 */
export const crossPostContent = async (
  content: string, 
  mediaUrls: string[], 
  platforms: string[]
): Promise<{ platform: string, status: string, postId?: string }[]> => {
  // In a real implementation, this would make API calls to each platform
  // For demonstration, we'll simulate the posting process
  
  const results = [];
  
  for (const platform of platforms) {
    // Simulate API call latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Random success/failure
    const success = Math.random() > 0.2;
    
    results.push({
      platform,
      status: success ? "success" : "error",
      postId: success ? `post-${Math.random().toString(36).substring(2, 9)}` : undefined
    });
  }
  
  return results;
};

/**
 * Get insights for a specific post across platforms
 */
export const getPostInsights = async (postId: string): Promise<any> => {
  // This would fetch engagement metrics for a specific post
  // Returning mock data for demonstration
  return {
    engagementRate: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
    impressions: Math.floor(Math.random() * 5000) + 500,
    clicks: Math.floor(Math.random() * 200) + 20,
    shares: Math.floor(Math.random() * 50) + 5,
    comments: Math.floor(Math.random() * 30) + 2,
    likes: Math.floor(Math.random() * 300) + 50,
  };
};
