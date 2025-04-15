
import { supabase } from "@/integrations/supabase/client";
import { SchedulePostParams } from "../types/socialTypes";

/**
 * جدولة منشور على منصة واحدة أو أكثر
 */
export const schedulePost = async (params: SchedulePostParams): Promise<{id: string}> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  try {
    // إضافة المنشور الأساسي
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: params.title,
        content: params.content,
        platform: params.platform,
        scheduled_at: params.scheduledAt,
        media_url: params.mediaUrls,
        status: 'scheduled',
        campaign_id: params.campaignId,
        user_id: user.user.id
      })
      .select('id')
      .single();
    
    if (error) throw error;
    
    // إذا كانت هناك حسابات للمشاركة المتعددة، أضف منشورات إضافية
    if (params.crossPostAccountIds && params.crossPostAccountIds.length > 0) {
      // الحصول على معلومات الحسابات
      const { data: accountsData } = await supabase
        .from('social_accounts')
        .select('id, platform')
        .in('id', params.crossPostAccountIds);
        
      if (accountsData) {
        // إنشاء منشورات متعددة لكل حساب
        const crossPosts = accountsData.map(account => ({
          title: params.title,
          content: params.content,
          platform: account.platform,
          scheduled_at: params.scheduledAt,
          media_url: params.mediaUrls,
          status: 'scheduled',
          campaign_id: params.campaignId,
          user_id: user.user.id,
          parent_post_id: data.id // ربط المنشور بالمنشور الأساسي
        }));
        
        // إضافة المنشورات المتعددة
        const { error: crossPostError } = await supabase
          .from('posts')
          .insert(crossPosts);
          
        if (crossPostError) {
          console.error("Error scheduling cross posts:", crossPostError);
        }
      }
    }
    
    return { id: data.id };
  } catch (error) {
    console.error("Error scheduling post:", error);
    throw error;
  }
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
