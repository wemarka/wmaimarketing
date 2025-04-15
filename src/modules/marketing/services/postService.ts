
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { SchedulePostParams } from "../types/socialTypes";

/**
 * Schedule a post for future publication
 */
export const schedulePost = async (params: SchedulePostParams) => {
  try {
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
    
    if (error) throw error;
    
    toast({
      title: "Post Scheduled",
      description: `Your post has been scheduled for ${new Date(params.scheduledAt).toLocaleString()}`,
    });
    
    return data;
  } catch (error) {
    console.error("Error scheduling post:", error);
    toast({
      title: "Schedule Failed",
      description: "Failed to schedule post. Please try again.",
      variant: "destructive"
    });
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
): Promise<{ platform: string, status: "success" | "error", postId?: string, error?: string }[]> => {
  // In a real implementation, this would use platform-specific APIs to post content
  // Here we'll simulate success/failure with mock results
  
  const results = [];
  
  for (const platform of platforms) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 80% chance of success for each post
      const success = Math.random() > 0.2;
      
      if (success) {
        results.push({
          platform,
          status: "success",
          postId: `mock-${platform}-${Date.now()}`
        });
      } else {
        throw new Error("API error");
      }
    } catch (error) {
      results.push({
        platform,
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
  
  return results;
};
