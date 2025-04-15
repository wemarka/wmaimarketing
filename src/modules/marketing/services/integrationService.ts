
import { supabase } from "@/integrations/supabase/client";
import { BaseService } from "./BaseService";
import { toast } from "@/hooks/use-toast";

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
}

export interface PlatformStats {
  platform: string;
  followers: number;
  engagement: number;
  posts: number;
  lastUpdated: string;
  growth?: number;
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

// Now we re-export from other service files for backward compatibility
export {
  getSocialAccounts,
  connectAccount,
  disconnectAccount
} from "./accountService";

export {
  getPlatformStats,
  getPostInsights
} from "./analyticsService";

export {
  getCampaigns
} from "./campaignService";

export {
  getSuggestedPostingTimes,
  generateContentSuggestion,
  generateHashtags
} from "./contentService";

export {
  schedulePost,
  crossPostContent
} from "./postService";

// Class-based implementation of social integration service
export class SocialIntegrationService extends BaseService {
  constructor() {
    super('social_accounts');
  }
  
  async getSocialAccounts(): Promise<SocialAccount[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from(this.tableName)
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
        .from(this.tableName)
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
        .from(this.tableName)
        .update({ status: 'disconnected' })
        .eq('id', accountId);
      
      if (error) throw error;
      
      toast({
        title: "Account Disconnected",
        description: "Social media account has been disconnected successfully"
      });
    } catch (error) {
      this.handleError(error, 'disconnecting account');
    }
  }
}

// Create a singleton instance of the service
export const socialIntegrationService = new SocialIntegrationService();
