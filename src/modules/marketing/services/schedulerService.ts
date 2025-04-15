import { supabase } from "@/integrations/supabase/client";
import { BaseService } from "./BaseService";
import { toast } from "@/hooks/use-toast";
import { enhanceContent } from "@/lib/supabase/models";
import { Post } from "@/lib/supabase/models";

export interface SchedulePostParams {
  title: string;
  content: string;
  platform: string;
  scheduledAt: string;
  mediaUrls?: string[];
  campaignId?: string;
  crossPostAccountIds?: string[];
}

export interface PostWithSuggestions extends Post {
  suggestions?: {
    content?: string;
    hashtags?: string[];
  };
}

export class SchedulerService extends BaseService {
  constructor() {
    super('posts');
  }

  async schedulePost(params: SchedulePostParams): Promise<Post> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('posts')
        .insert({
          title: params.title,
          content: params.content,
          platform: params.platform,
          scheduled_at: params.scheduledAt,
          media_url: params.mediaUrls || [],
          status: 'scheduled',
          user_id: userId,
          campaign_id: params.campaignId
        })
        .select()
        .single();
      
      if (error) throw error;
      
      if (params.crossPostAccountIds?.length) {
        await this.handleCrossPosts(params, data.id, userId);
      }
      
      return data as Post;
    } catch (error) {
      return this.handleError(error, 'scheduling post');
    }
  }
  
  private async handleCrossPosts(
    params: SchedulePostParams, 
    parentPostId: string, 
    userId: string
  ): Promise<void> {
    try {
      const { data: accountsData } = await supabase
        .from('social_accounts')
        .select('id, platform')
        .in('id', params.crossPostAccountIds || []);
        
      if (accountsData?.length) {
        const crossPosts = accountsData.map(account => ({
          title: params.title,
          content: params.content,
          platform: account.platform,
          scheduled_at: params.scheduledAt,
          media_url: params.mediaUrls || [],
          status: 'scheduled',
          campaign_id: params.campaignId,
          user_id: userId,
          parent_post_id: parentPostId
        }));
        
        const { error } = await supabase
          .from('posts')
          .insert(crossPosts);
          
        if (error) {
          console.error("Error scheduling cross posts:", error);
          toast({
            title: "Cross Post Error",
            description: "An error occurred while creating cross posts",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("Error handling cross posts:", error);
    }
  }

  async getScheduledPosts(): Promise<Post[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'scheduled')
        .order('scheduled_at', { ascending: true });
      
      if (error) throw error;
      
      return data as Post[];
    } catch (error) {
      return this.handleError(error, 'fetching scheduled posts');
    }
  }

  async getPendingPosts(): Promise<Post[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data as Post[];
    } catch (error) {
      return this.handleError(error, 'fetching pending posts');
    }
  }

  async updatePostStatus(postId: string, status: string): Promise<Post> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ status })
        .eq('id', postId)
        .select()
        .single();
      
      if (error) throw error;
      
      return data as Post;
    } catch (error) {
      return this.handleError(error, 'updating post status');
    }
  }

  async deletePost(postId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
    } catch (error) {
      this.handleError(error, 'deleting post');
    }
  }

  async getCampaigns(): Promise<any[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      return this.handleError(error, 'fetching campaigns');
    }
  }

  async getSocialAccounts(): Promise<any[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active');
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      return this.handleError(error, 'fetching social accounts');
    }
  }

  async generateContentSuggestion(baseContent: string, platform: string): Promise<string> {
    try {
      const enhancementResult = await enhanceContent({
        content: baseContent,
        action: 'improve'
      });
      
      return enhancementResult.result || baseContent;
    } catch (error) {
      console.error("Error generating content suggestion:", error);
      return baseContent;
    }
  }

  async generateHashtags(content: string, platform: string): Promise<string[]> {
    try {
      const hashtagsResult = await enhanceContent({
        content,
        action: 'hashtags'
      });
      
      if (hashtagsResult.result) {
        return hashtagsResult.result
          .split(/\s+/)
          .filter(tag => tag.startsWith('#'))
          .map(tag => tag.replace('#', ''));
      }
      
      return [];
    } catch (error) {
      console.error("Error generating hashtags:", error);
      return [];
    }
  }
}

export const schedulerService = new SchedulerService();

export const schedulePost = async (params: SchedulePostParams): Promise<Post> => {
  return schedulerService.schedulePost(params);
};

export const getScheduledPosts = async (): Promise<Post[]> => {
  return schedulerService.getScheduledPosts();
};

export const getPendingPosts = async (): Promise<Post[]> => {
  return schedulerService.getPendingPosts();
};

export const updatePostStatus = async (postId: string, status: string): Promise<Post> => {
  return schedulerService.updatePostStatus(postId, status);
};

export const deletePost = async (postId: string): Promise<void> => {
  return schedulerService.deletePost(postId);
};

export const getCampaigns = async (): Promise<any[]> => {
  return schedulerService.getCampaigns();
};

export const getSocialAccounts = async (): Promise<any[]> => {
  return schedulerService.getSocialAccounts();
};

export const generateContentSuggestion = async (
  baseContent: string,
  platform: string
): Promise<string> => {
  return schedulerService.generateContentSuggestion(baseContent, platform);
};

export const generateHashtags = async (
  content: string,
  platform: string
): Promise<string[]> => {
  return schedulerService.generateHashtags(content, platform);
};
