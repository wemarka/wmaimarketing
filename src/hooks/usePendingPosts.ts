
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from 'sonner';

export interface PendingPost {
  id: string;
  title: string;
  content: string;
  platform: string;
  scheduled_at: string;
  media_url: string[];
  status: string;
  user_id: string;
  created_at: string;
  profile?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
}

export const usePendingPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PendingPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingPosts = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select(`
          *,
          profile:profiles(first_name, last_name, avatar_url)
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      
      // Safely handle profile data typing
      const processedPosts = data.map(post => {
        // Check if profile exists and extract safely
        let profileData = null;
        if (post.profile) {
          const profile = post.profile as any;
          profileData = {
            first_name: profile.first_name || null,
            last_name: profile.last_name || null,
            avatar_url: profile.avatar_url || null
          };
        }
        
        return {
          ...post,
          profile: profileData
        };
      });
      
      setPosts(processedPosts);
    } catch (err) {
      console.error("Error fetching pending posts:", err);
      setError("فشل في تحميل المنشورات المعلقة");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPendingPosts();
    
    // Set up a real-time subscription for posts updates
    if (user) {
      const postsSubscription = supabase
        .channel('pending-posts-changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: `status=eq.pending`
        }, () => {
          fetchPendingPosts();
        })
        .subscribe();
      
      return () => {
        supabase.removeChannel(postsSubscription);
      };
    }
  }, [fetchPendingPosts, user]);

  const approvePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ status: 'scheduled' })
        .eq('id', postId);
      
      if (error) throw error;
      
      toast.success("تمت الموافقة على المنشور");
      fetchPendingPosts();
    } catch (err) {
      console.error("Error approving post:", err);
      toast.error("فشل في الموافقة على المنشور");
    }
  };

  const rejectPost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ status: 'rejected' })
        .eq('id', postId);
      
      if (error) throw error;
      
      toast.success("تم رفض المنشور");
      fetchPendingPosts();
    } catch (err) {
      console.error("Error rejecting post:", err);
      toast.error("فشل في رفض المنشور");
    }
  };

  return { 
    posts, 
    isLoading, 
    error, 
    refreshPosts: fetchPendingPosts,
    approvePost,
    rejectPost
  };
};
