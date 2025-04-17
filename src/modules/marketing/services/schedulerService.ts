
import { supabase } from "@/integrations/supabase/client";
import { SchedulePostParams, PostResponse } from "../types/socialTypes";

export { SchedulePostParams };

export const schedulePost = async (params: SchedulePostParams): Promise<PostResponse> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: params.title,
        content: params.content,
        platform: params.platform,
        scheduled_at: params.scheduledAt,
        media_url: params.mediaUrls || [],
        campaign_id: params.campaignId,
        user_id: user.id,
        status: 'scheduled'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // If cross-posting accounts were specified, schedule for those platforms as well
    if (params.crossPostAccountIds && params.crossPostAccountIds.length > 0) {
      // Get social account details
      const { data: socialAccounts, error: accountsError } = await supabase
        .from('social_accounts')
        .select('id, platform')
        .in('id', params.crossPostAccountIds);
      
      if (accountsError) {
        console.error('Error fetching cross-posting accounts:', accountsError);
      } else if (socialAccounts && socialAccounts.length > 0) {
        // Create cross-posts
        const crossPosts = socialAccounts.map(account => ({
          title: params.title,
          content: params.content,
          platform: account.platform,
          scheduled_at: params.scheduledAt,
          media_url: params.mediaUrls || [],
          campaign_id: params.campaignId,
          user_id: user.id,
          status: 'scheduled',
          parent_post_id: data.id,
          social_account_id: account.id
        }));
        
        const { error: crossPostError } = await supabase
          .from('posts')
          .insert(crossPosts);
        
        if (crossPostError) {
          console.error('Error creating cross-posts:', crossPostError);
        }
      }
    }
    
    return {
      status: 'success',
      platform: params.platform,
      postId: data?.id
    };
  } catch (error: any) {
    console.error('Error in schedulePost:', error);
    return {
      status: 'error',
      platform: params.platform,
      error: error.message
    };
  }
};
