import { supabase } from "@/integrations/supabase/client";
import { BaseService } from "./BaseService";
import { toast } from "@/components/ui/use-toast";
import { SocialAccount, ConnectAccountParams, SchedulePostParams, PlatformStats } from "../types/socialTypes";

// Class-based implementation of social integration service
export class SocialIntegrationService extends BaseService {
  constructor() {
    super('social_accounts');
  }
  
  async getSocialAccounts(): Promise<SocialAccount[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      
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
    } catch (error) {
      return this.handleError(error, 'fetching social accounts');
    }
  }
  
  async connectAccount(params: ConnectAccountParams): Promise<SocialAccount> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('social_accounts')
        .insert({
          platform: params.platform,
          account_name: params.accountName,
          profile_name: params.profileName,
          user_id: userId,
          status: 'connected',
          insights: {
            followers: Math.floor(Math.random() * 10000) + 1000,
            engagement: parseFloat((Math.random() * 5 + 1).toFixed(2)),
            postCount: Math.floor(Math.random() * 100) + 10
          }
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const insights = data.insights as Record<string, any>;
      
      toast({
        title: "تم ربط الحساب",
        description: `تم ربط حساب ${data.platform} بنجاح`
      });
      
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
    } catch (error) {
      return this.handleError(error, 'connecting account');
    }
  }
  
  async disconnectAccount(accountId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('social_accounts')
        .update({ status: 'disconnected' })
        .eq('id', accountId);
      
      if (error) throw error;
      
      toast({
        title: "تم فصل الحساب",
        description: "تم فصل حساب التواصل الاجتماعي بنجاح"
      });
    } catch (error) {
      this.handleError(error, 'disconnecting account');
    }
  }

  async getPlatformStats(): Promise<PlatformStats[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data: accounts, error: accountsError } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', userId);
        
      if (accountsError) throw accountsError;
      
      // Transform account data into platform stats
      const stats = accounts.map(account => {
        const insights = account.insights as Record<string, any> || {};
        return {
          platform: account.platform,
          posts: Number(insights.postCount || 0),
          engagement: Number(insights.engagement || 0),
          followers: Number(insights.followers || 0),
          growth: Math.random() * 10 - 5, // Random growth between -5% and 5%
          lastUpdated: account.updated_at
        };
      });
      
      return stats;
    } catch (error) {
      return this.handleError(error, 'fetching platform stats');
    }
  }

  async getSuggestedPostingTimes(platform: string): Promise<any[]> {
    try {
      // This would normally call an AI service or analytics API
      // For now, return mock data
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const times = [];
      
      for (let i = 0; i < 5; i++) {
        times.push({
          day: days[Math.floor(Math.random() * days.length)],
          hour: Math.floor(Math.random() * 24),
          score: Math.random() * 100
        });
      }
      
      return times.sort((a, b) => b.score - a.score);
    } catch (error) {
      return this.handleError(error, 'fetching suggested posting times');
    }
  }

  async schedulePost(params: SchedulePostParams): Promise<any> {
    try {
      const userId = await this.getCurrentUserId();
      
      const postData = {
        title: params.title,
        content: params.content,
        platform: params.platform,
        scheduled_at: params.scheduledAt,
        media_url: params.mediaUrls || [],
        status: 'scheduled',
        user_id: userId,
        campaign_id: params.campaignId
      };
      
      const { data, error } = await supabase
        .from('posts')
        .insert(postData)
        .select()
        .single();
        
      if (error) throw error;
      
      // Handle cross-posting
      if (params.crossPostAccountIds && params.crossPostAccountIds.length > 0) {
        await this.createCrossPosts(params, data.id, userId);
      }
      
      return data;
    } catch (error) {
      return this.handleError(error, 'scheduling post');
    }
  }

  private async createCrossPosts(params: SchedulePostParams, originalPostId: string, userId: string) {
    try {
      const { data: accounts } = await supabase
        .from('social_accounts')
        .select('id, platform')
        .in('id', params.crossPostAccountIds || []);
        
      if (accounts && accounts.length > 0) {
        const crossPosts = accounts.map(account => ({
          title: params.title,
          content: params.content,
          platform: account.platform,
          scheduled_at: params.scheduledAt,
          media_url: params.mediaUrls || [],
          status: 'scheduled',
          campaign_id: params.campaignId,
          user_id: userId,
          parent_post_id: originalPostId
        }));
        
        await supabase.from('posts').insert(crossPosts);
      }
    } catch (error) {
      console.error("Error creating cross posts:", error);
    }
  }

  async crossPostContent(content: string, mediaUrls: string[], platforms: string[]): Promise<any[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data: accounts } = await supabase
        .from('social_accounts')
        .select('id, platform')
        .in('platform', platforms)
        .eq('user_id', userId)
        .eq('status', 'connected');
        
      if (!accounts || accounts.length === 0) {
        return [];
      }
      
      // For each account, create a post
      const now = new Date().toISOString();
      const posts = accounts.map(account => ({
        title: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
        content: content,
        platform: account.platform,
        scheduled_at: now,
        media_url: mediaUrls,
        status: 'published',
        published_at: now,
        user_id: userId
      }));
      
      const { data, error } = await supabase
        .from('posts')
        .insert(posts)
        .select();
        
      if (error) throw error;
      
      return accounts.map((account, index) => ({
        status: "success",
        platform: account.platform,
        postId: data && data[index] ? data[index].id : undefined
      }));
    } catch (error) {
      console.error("Error cross-posting content:", error);
      return [];
    }
  }
}

// Create a singleton instance of the service
export const socialIntegrationService = new SocialIntegrationService();

// Re-export functions for backward compatibility
export const getSocialAccounts = async (): Promise<SocialAccount[]> => {
  return socialIntegrationService.getSocialAccounts();
};

export const connectAccount = async (params: ConnectAccountParams): Promise<SocialAccount> => {
  return socialIntegrationService.connectAccount(params);
};

export const disconnectAccount = async (accountId: string): Promise<void> => {
  return socialIntegrationService.disconnectAccount(accountId);
};

export const getPlatformStats = async (): Promise<PlatformStats[]> => {
  return socialIntegrationService.getPlatformStats();
};

export const getSuggestedPostingTimes = async (platform: string): Promise<any[]> => {
  return socialIntegrationService.getSuggestedPostingTimes(platform);
};

export const schedulePost = async (params: SchedulePostParams): Promise<any> => {
  return socialIntegrationService.schedulePost(params);
};

export const crossPostContent = async (content: string, mediaUrls: string[], platforms: string[]): Promise<any[]> => {
  return socialIntegrationService.crossPostContent(content, mediaUrls, platforms);
};

// Import and re-export getCampaigns from campaignService
import { getCampaigns } from "./campaignService";
export { getCampaigns };

// Export types
export type { SocialAccount, ConnectAccountParams, PlatformStats, SchedulePostParams };
