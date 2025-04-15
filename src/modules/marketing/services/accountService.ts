
import { supabase } from "@/integrations/supabase/client";
import { SocialAccount, ConnectAccountParams } from "../types/socialTypes";

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
  
  return data.map(account => {
    const insights = account.insights as Record<string, any>;
    return {
      id: account.id,
      platform: account.platform,
      account_name: account.account_name,
      profile_name: account.profile_name,
      status: account.status as "connected" | "pending" | "error" | "disconnected",
      user_id: account.user_id,
      insights: insights ? {
        followers: Number(insights.followers || 0),
        engagement: Number(insights.engagement || 0),
        postCount: Number(insights.postCount || 0),
      } : undefined
    };
  });
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
  
  const insights = data.insights as Record<string, any>;
  return {
    id: data.id,
    platform: data.platform,
    account_name: data.account_name,
    profile_name: data.profile_name,
    status: data.status as "connected" | "pending" | "error" | "disconnected",
    user_id: data.user_id,
    insights: insights ? {
      followers: Number(insights.followers || 0),
      engagement: Number(insights.engagement || 0),
      postCount: Number(insights.postCount || 0),
    } : undefined
  };
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
