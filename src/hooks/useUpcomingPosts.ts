
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

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

export interface PostWithMeta extends Post {
  profile?: Profile;
  platform_data?: {
    name: string;
    icon: string;
    color: string;
  };
  social_account?: {
    id: string;
    platform: string;
    account_name: string;
    profile_name: string;
    insights: {
      followers: number;
      engagement: number;
      postCount: number;
    };
  };
}

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
        const profile = post.profile as Profile;
        const socialAccount = post.social_account as any;
        
        // Add platform metadata
        const platform = post.platform?.toLowerCase();
        const platformMeta = platformData[platform as keyof typeof platformData] || {
          name: platform,
          icon: "globe",
          color: "#718096"
        };
        
        // Check if social_account exists and process insights safely
        let processedSocialAccount = null;
        if (socialAccount) {
          let insights = { 
            followers: 0, 
            engagement: 0, 
            postCount: 0 
          };
          
          // Check if insights exist and handle both string (JSON) and object formats
          if (socialAccount.insights) {
            try {
              if (typeof socialAccount.insights === 'string') {
                // Parse JSON string if needed
                const parsedInsights = JSON.parse(socialAccount.insights);
                insights.followers = Number(parsedInsights.followers || 0);
                insights.engagement = Number(parsedInsights.engagement || 0);
                insights.postCount = Number(parsedInsights.postCount || 0);
              } else {
                // Handle as object
                insights.followers = Number(socialAccount.insights.followers || 0);
                insights.engagement = Number(socialAccount.insights.engagement || 0);
                insights.postCount = Number(socialAccount.insights.postCount || 0);
              }
            } catch (e) {
              console.error("Error processing insights:", e);
            }
          }
          
          processedSocialAccount = {
            ...socialAccount,
            insights
          };
        }
        
        return {
          ...post,
          profile,
          platform_data: platformMeta,
          social_account: processedSocialAccount
        };
      });
      
      setPosts(processedPosts as PostWithMeta[]);
      
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

  const refreshPosts = () => {
    fetchPosts();
  };

  return { posts, isLoading, error, refreshPosts };
};
