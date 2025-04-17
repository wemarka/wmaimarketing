
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { BaseService } from "./BaseService";
import type { SchedulePostParams } from "../types/socialTypes";
import { Post } from "@/lib/supabase/models";

export class PostService extends BaseService {
  constructor() {
    super('posts');
  }
  
  /**
   * Schedule a post for future publication
   */
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
      
      toast({
        title: "تم جدولة المنشور",
        description: `تم جدولة المنشور في ${new Date(params.scheduledAt).toLocaleString('ar')}`,
      });
      
      // Handle cross-posting if needed
      if (params.crossPostAccountIds?.length) {
        await this.createCrossPosts(params, data.id, userId);
      }
      
      return data as Post;
    } catch (error) {
      return this.handleError(error, 'scheduling post');
    }
  }
  
  /**
   * Create cross-posts for different platforms
   */
  private async createCrossPosts(
    params: SchedulePostParams, 
    parentPostId: string, 
    userId: string
  ): Promise<void> {
    try {
      const { data: accountsData, error: accountsError } = await supabase
        .from('social_accounts')
        .select('id, platform')
        .in('id', params.crossPostAccountIds || []);
      
      if (accountsError) throw accountsError;
      
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
            title: "خطأ في النشر المتعدد",
            description: "حدث خطأ أثناء إنشاء المنشورات المتعددة",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("Error handling cross posts:", error);
    }
  }
  
  /**
   * Get a user's scheduled posts
   */
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
  
  /**
   * Get a user's published posts
   */
  async getPublishedPosts(): Promise<Post[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      
      return data as Post[];
    } catch (error) {
      return this.handleError(error, 'fetching published posts');
    }
  }
  
  /**
   * Update a post's status
   */
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
  
  /**
   * Delete a post
   */
  async deletePost(postId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      
      toast({
        title: "تم الحذف",
        description: "تم حذف المنشور بنجاح"
      });
    } catch (error) {
      this.handleError(error, 'deleting post');
    }
  }
}

export const postService = new PostService();

/**
 * Schedule a post for future publication
 */
export const schedulePost = async (params: SchedulePostParams): Promise<Post> => {
  return postService.schedulePost(params);
};

/**
 * Cross-post content to multiple platforms
 */
export const crossPostContent = async (
  content: string,
  mediaUrls: string[],
  platforms: string[]
): Promise<{ platform: string, status: "success" | "error", postId?: string, error?: string }[]> => {
  // This would use the API based on platforms later
  // For now we'll implement this with direct database operations
  try {
    const userId = await postService['getCurrentUserId']();
    const results = [];
    
    for (const platform of platforms) {
      try {
        // Create a post for each platform
        const { data, error } = await supabase
          .from('posts')
          .insert({
            title: "Cross-posted content",
            content,
            platform,
            scheduled_at: new Date().toISOString(), // post immediately
            media_url: mediaUrls,
            status: 'published',
            published_at: new Date().toISOString(),
            user_id: userId
          })
          .select()
          .single();
        
        if (error) throw error;
        
        results.push({
          platform,
          status: "success",
          postId: data.id
        });
      } catch (error) {
        results.push({
          platform,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error("Error in cross posting:", error);
    return platforms.map(platform => ({
      platform,
      status: "error" as const,
      error: "Failed to authenticate user"
    }));
  }
};
