
import { supabase } from "@/integrations/supabase/client";

export interface SocialAccount {
  id: string;
  platform: string;
  account_name: string;
  profile_name: string;
  status: "connected" | "pending" | "error";
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
  oauthCode?: string;
}

export interface PlatformStats {
  platform: string;
  posts: number;
  engagement: number;
  followers: number;
  growth: number;
}

export interface SchedulePostParams {
  title: string;
  content: string;
  platform: string;
  scheduledAt: string;
  mediaUrls: string[];
  campaignId?: string;
  crossPostAccountIds?: string[]; // إضافة حقل جديد للحسابات المتعددة
}

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
      status: account.status as "connected" | "pending" | "error",
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
    status: data.status as "connected" | "pending" | "error",
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
 * Get statistics for all platforms
 */
export const getPlatformStats = async (): Promise<PlatformStats[]> => {
  // In a real implementation, this would fetch actual statistics
  // For now, we'll return mock data
  return [
    {
      platform: "instagram",
      posts: 42,
      engagement: 3.2,
      followers: 12500,
      growth: 2.5
    },
    {
      platform: "facebook",
      posts: 38,
      engagement: 1.8,
      followers: 8700,
      growth: -0.3
    },
    {
      platform: "twitter",
      posts: 67,
      engagement: 2.1,
      followers: 5300,
      growth: 1.7
    },
    {
      platform: "tiktok",
      posts: 12,
      engagement: 4.7,
      followers: 3200,
      growth: 8.2
    }
  ];
};

/**
 * Get campaigns for the current user
 */
export const getCampaigns = async (): Promise<any[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', user.user.id);
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
};

/**
 * Get suggested posting times based on platform and historical data
 */
export const getSuggestedPostingTimes = async (platform: string): Promise<{day: string, hour: number, score: number}[]> => {
  // This would typically be calculated based on historical engagement data
  // Returning mock data for demonstration
  const days = ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"];
  
  const result = [];
  for (const day of days) {
    // Generate 2-3 optimal times per day
    const timesCount = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < timesCount; i++) {
      const hour = Math.floor(Math.random() * 12) + 8; // Between 8AM and 8PM
      const score = parseFloat((Math.random() * 10).toFixed(1));
      result.push({ day, hour, score });
    }
  }
  
  // Sort by score descending
  return result.sort((a, b) => b.score - a.score);
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

/**
 * Get insights for a specific post across platforms
 */
export const getPostInsights = async (postId: string): Promise<any> => {
  // This would fetch engagement metrics for a specific post
  // Returning mock data for demonstration
  return {
    engagementRate: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
    impressions: Math.floor(Math.random() * 5000) + 500,
    clicks: Math.floor(Math.random() * 200) + 20,
    shares: Math.floor(Math.random() * 50) + 5,
    comments: Math.floor(Math.random() * 30) + 2,
    likes: Math.floor(Math.random() * 300) + 50,
  };
};

/**
 * Generate content suggestion based on input and platform
 */
export const generateContentSuggestion = async (content: string, platform: string): Promise<string> => {
  // في تطبيق حقيقي، هذا سيستخدم AI أو خدمة أخرى لتحسين المحتوى
  // لأغراض العرض، سنعيد محتوى مُحسن بشكل وهمي
  
  await new Promise(resolve => setTimeout(resolve, 1500)); // محاكاة تأخير الشبكة
  
  // إضافة هاشتاجات وإيموجي بناءً على المنصة
  let enhancedContent = content;
  
  if (platform === 'instagram') {
    enhancedContent += `\n\n✨ شاركونا آراءكم! ✨\n\n#محتوى_مميز #تسويق_رقمي #إبداع`;
  } else if (platform === 'twitter') {
    enhancedContent = enhancedContent.length > 240 
      ? enhancedContent.substring(0, 237) + '...'
      : enhancedContent + ' 🔥 #تسويق';
  } else if (platform === 'facebook') {
    enhancedContent += '\n\nما رأيكم؟ شاركونا في التعليقات! 👇';
  } else if (platform === 'linkedin') {
    enhancedContent = `${enhancedContent}\n\n#تطوير_مهني #فرص_عمل #نصائح_مهنية`;
  }
  
  return enhancedContent;
};

/**
 * Generate hashtags based on content and platform
 */
export const generateHashtags = async (content: string, platform: string): Promise<string[]> => {
  // في تطبيق حقيقي، هذا سيستخدم AI أو خدمة أخرى لتوليد هاشتاجات مناسبة
  // لأغراض العرض، سنعيد هاشتاجات ثابتة
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة تأخير الشبكة
  
  const commonTags = ['تسويق', 'محتوى', 'ديجيتال_ماركتنج'];
  
  const platformTags: Record<string, string[]> = {
    'instagram': ['انستجرام', 'صور', 'فيديو', 'ريلز', 'استوري'],
    'facebook': ['فيسبوك', 'مجتمع', 'تواصل_اجتماعي'],
    'twitter': ['تويتر', 'ترند', 'اخبار_عاجلة'],
    'linkedin': ['لينكدان', 'اعمال', 'وظائف', 'مهني'],
    'tiktok': ['تيك_توك', 'فيديو_قصير', 'ترند'],
    'youtube': ['يوتيوب', 'فيديو', 'شرح', 'تعليمي'],
    'pinterest': ['بنترست', 'تصميم', 'إلهام', 'ديكور']
  };
  
  // إرجاع خليط من الهاشتاجات العامة والخاصة بالمنصة
  return [
    ...commonTags,
    ...(platformTags[platform] || [])
  ];
};
