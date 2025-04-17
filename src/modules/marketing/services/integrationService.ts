
import { supabase } from "@/integrations/supabase/client";
import { BaseService } from "./BaseService";
import { toast } from "@/components/ui/use-toast";
import { SocialAccount, ConnectAccountParams, schedulePost } from "../types/socialTypes";

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
