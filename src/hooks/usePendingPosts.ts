
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface PendingPost {
  id: string;
  title: string;
  content: string;
  platform: "instagram" | "facebook" | "tiktok";
  createdAt: string;
  scheduledFor?: string;
  author: {
    name: string;
    avatar?: string;
  };
}

export const usePendingPosts = () => {
  const [posts, setPosts] = useState<PendingPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // Get the current user
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError || !userData.user) {
          throw new Error("Authentication error");
        }
        
        // Fetch pending posts from the database
        const { data, error } = await supabase
          .from('posts')
          .select(`
            id, 
            title, 
            content, 
            platform, 
            created_at,
            scheduled_at,
            profiles:user_id (
              first_name,
              last_name,
              avatar_url
            )
          `)
          .eq('status', 'pending')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Map the data to the expected format
        const pendingPosts: PendingPost[] = data.map(post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          platform: post.platform as "instagram" | "facebook" | "tiktok",
          createdAt: post.created_at,
          scheduledFor: post.scheduled_at,
          author: {
            name: post.profiles 
              ? `${post.profiles.first_name || ''} ${post.profiles.last_name || ''}`.trim() || 'مستخدم'
              : 'مستخدم',
            avatar: post.profiles?.avatar_url
          }
        }));
        
        setPosts(pendingPosts);
      } catch (error) {
        console.error("Error fetching pending posts:", error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "تعذر تحميل المنشورات المعلقة",
          variant: "destructive",
        });
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ 
          status: 'scheduled',
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);
        
      if (error) throw error;
      
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      
      toast({
        title: "تمت الموافقة",
        description: `تمت الموافقة على المنشور بنجاح.`,
      });
    } catch (error) {
      console.error("Error approving post:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الموافقة على المنشور",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ 
          status: 'rejected',
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);
        
      if (error) throw error;
      
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      
      toast({
        title: "تم الرفض",
        description: `تم رفض المنشور.`,
      });
    } catch (error) {
      console.error("Error rejecting post:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء رفض المنشور",
        variant: "destructive",
      });
    }
  };

  return { posts, loading, handleApprove, handleReject };
};
