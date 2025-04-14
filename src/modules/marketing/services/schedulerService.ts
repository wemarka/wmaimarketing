
import { supabase } from "@/integrations/supabase/client";
import { enhanceContent } from "@/lib/supabase/models";
import { Post } from "@/lib/supabase/models";

export interface SchedulePostParams {
  title: string;
  content: string;
  platform: string;
  scheduledAt: string;
  mediaUrls?: string[];
  campaignId?: string;
}

export interface PostWithSuggestions extends Post {
  suggestions?: {
    content?: string;
    hashtags?: string[];
  };
}

export const schedulePost = async (params: SchedulePostParams): Promise<Post> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: params.title,
      content: params.content,
      platform: params.platform,
      scheduled_at: params.scheduledAt,
      media_url: params.mediaUrls || [],
      status: 'scheduled',
      user_id: user.user.id,
      campaign_id: params.campaignId
    })
    .select()
    .single();
  
  if (error) {
    console.error("Error scheduling post:", error);
    throw error;
  }
  
  return data as Post;
};

export const getScheduledPosts = async (): Promise<Post[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.user.id)
    .eq('status', 'scheduled')
    .order('scheduled_at', { ascending: true });
  
  if (error) {
    console.error("Error fetching scheduled posts:", error);
    throw error;
  }
  
  return data as Post[];
};

export const getPendingPosts = async (): Promise<Post[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.user.id)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching pending posts:", error);
    throw error;
  }
  
  return data as Post[];
};

export const updatePostStatus = async (postId: string, status: string): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .update({ status })
    .eq('id', postId)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating post status:", error);
    throw error;
  }
  
  return data as Post;
};

export const deletePost = async (postId: string): Promise<void> => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);
  
  if (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getCampaigns = async (): Promise<any[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', user.user.id)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
  
  return data;
};

export const getSocialAccounts = async (): Promise<any[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from('social_accounts')
    .select('*')
    .eq('user_id', user.user.id)
    .eq('status', 'active');
  
  if (error) {
    console.error("Error fetching social accounts:", error);
    throw error;
  }
  
  return data;
};

export const generateContentSuggestion = async (
  baseContent: string,
  platform: string
): Promise<string> => {
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
};

export const generateHashtags = async (
  content: string,
  platform: string
): Promise<string[]> => {
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
};
