
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export interface Post {
  id: string;
  title: string;
  content: string;
  platform: string;
  scheduled_at: string;
  published_at: string | null;
  media_url: string[];
  status: string;
  user_id: string;
  created_at: string;
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

// Define social account insights type
export interface SocialAccountInsights {
  followers: number;
  engagement: number;
  postCount: number;
}

// Define social account type
export interface SocialAccountType {
  id: string;
  platform: string;
  account_name: string;
  profile_name: string;
  insights: SocialAccountInsights;
}

export interface PostWithMeta extends Post {
  profile?: Profile | null;
  platform_data?: {
    name: string;
    icon: string;
    color: string;
  };
  social_account?: SocialAccountType | null;
}

// Utility functions that need to be exported
export const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), "PPp", { locale: ar });
  } catch (error) {
    return dateString;
  }
};

export const getAudienceSize = (platform: string): string => {
  // Sample audience sizes based on platform
  const audiences: Record<string, string> = {
    instagram: "24.5K",
    facebook: "18.2K",
    twitter: "12.3K",
    linkedin: "8.7K",
    youtube: "45.1K",
    tiktok: "67.2K",
    pinterest: "9.8K"
  };
  
  return audiences[platform.toLowerCase()] || "0";
};

export const useUpcomingPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostWithMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const platformData = {
    instagram: {
      name: "Instagram",
      icon: "instagram",
      color: "#E1306C"
    },
    facebook: {
      name: "Facebook",
      icon: "facebook",
      color: "#1877F2"
    },
    twitter: {
      name: "Twitter",
      icon: "twitter",
      color: "#1DA1F2"
    },
    linkedin: {
      name: "LinkedIn",
      icon: "linkedin",
      color: "#0A66C2"
    },
    youtube: {
      name: "YouTube",
      icon: "youtube",
      color: "#FF0000"
    },
    tiktok: {
      name: "TikTok",
      icon: "tiktok",
      color: "#000000"
    },
    pinterest: {
      name: "Pinterest",
      icon: "pinterest",
      color: "#E60023"
    }
  };

  const fetchPosts = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch posts scheduled for the future
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          profile:profiles(id, first_name, last_name, avatar_url),
          social_account:social_accounts(id, platform, account_name, profile_name, insights)
        `)
        .eq('user_id', user.id)
        .eq('status', 'scheduled')
        .gt('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true })
        .limit(10);
      
      if (postsError) throw postsError;
      
      // Process and transform data
      const processedPosts = postsData.map(post => {
        // Safe handling of profile data - check if it's an object first
        let profileData: Profile | null = null;
        
        if (post.profile && typeof post.profile === 'object') {
          // Make sure it's not an array and not an error object
          if (!Array.isArray(post.profile) && !('error' in post.profile)) {
            // Type assertion to help TypeScript understand this is a valid profile
            const profileObj = post.profile as any;
            profileData = {
              id: profileObj.id || '',
              first_name: profileObj.first_name || null,
              last_name: profileObj.last_name || null,
              avatar_url: profileObj.avatar_url || null
            };
          }
        }
        
        // Add platform metadata
        const platform = post.platform?.toLowerCase();
        const platformMeta = platform && platform in platformData 
          ? platformData[platform as keyof typeof platformData] 
          : {
              name: platform || 'Unknown',
              icon: "globe",
              color: "#718096"
          };
        
        // Check if social_account exists and process insights safely
        let processedSocialAccount: SocialAccountType | null = null;
        
        if (post.social_account && typeof post.social_account === 'object') {
          // Make sure it's not an array and not an error object
          if (!Array.isArray(post.social_account) && !('error' in post.social_account)) {
            const socialAccountObj = post.social_account as any;
            
            // Default insights object
            let insights: SocialAccountInsights = { 
              followers: 0, 
              engagement: 0, 
              postCount: 0 
            };
            
            // Check if insights exist and handle both string (JSON) and object formats
            if (socialAccountObj.insights) {
              try {
                if (typeof socialAccountObj.insights === 'string') {
                  // Parse JSON string if needed
                  const parsedInsights = JSON.parse(socialAccountObj.insights);
                  insights = {
                    followers: Number(parsedInsights.followers || 0),
                    engagement: Number(parsedInsights.engagement || 0),
                    postCount: Number(parsedInsights.postCount || 0)
                  };
                } else if (typeof socialAccountObj.insights === 'object') {
                  // Handle as object
                  const insightsObj = socialAccountObj.insights;
                  insights = {
                    followers: Number(insightsObj.followers || 0),
                    engagement: Number(insightsObj.engagement || 0),
                    postCount: Number(insightsObj.postCount || 0)
                  };
                }
              } catch (e) {
                console.error("Error processing insights:", e);
              }
            }
            
            // Create the processed social account object
            processedSocialAccount = {
              id: socialAccountObj.id || '',
              platform: socialAccountObj.platform || '',
              account_name: socialAccountObj.account_name || '',
              profile_name: socialAccountObj.profile_name || '',
              insights
            };
          }
        }
        
        // Create a new post object as the base
        const basePost: Post = {
          id: post.id,
          title: post.title,
          content: post.content,
          platform: post.platform,
          scheduled_at: post.scheduled_at,
          published_at: post.published_at,
          media_url: post.media_url || [],
          status: post.status,
          user_id: post.user_id,
          created_at: post.created_at
        };
        
        // Construct the final post object with metadata
        return {
          ...basePost,
          profile: profileData,
          platform_data: platformMeta,
          social_account: processedSocialAccount
        };
      });
      
      setPosts(processedPosts);
      
    } catch (err) {
      console.error("Error fetching upcoming posts:", err);
      setError("فشل في تحميل المنشورات القادمة");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
    
    // Set up a real-time subscription for posts updates
    if (user) {
      const postsSubscription = supabase
        .channel('table-db-changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: `user_id=eq.${user.id}`
        }, () => {
          fetchPosts();
        })
        .subscribe();
      
      return () => {
        supabase.removeChannel(postsSubscription);
      };
    }
  }, [fetchPosts, user]);
  
  // Add handlers for the component to use
  const handleEdit = (id: string) => {
    console.log("Edit post:", id);
    // Implement edit functionality
  };
  
  const handleDelete = (id: string) => {
    console.log("Delete post:", id);
    // Implement delete functionality
  };

  return { 
    posts, 
    isLoading, 
    error,
    refreshPosts: fetchPosts,
    handleEdit,
    handleDelete 
  };
};
