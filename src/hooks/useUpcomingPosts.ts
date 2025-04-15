
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useCreateActivity } from "@/hooks/useCreateActivity";

export interface Post {
  id: string;
  title: string;
  platform: string;
  scheduled_at: string;
  media_url: string[] | null;
}

export const useUpcomingPosts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { logActivity } = useCreateActivity();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the upcoming posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const now = new Date().toISOString();

        const { data, error } = await supabase
          .from("posts")
          .select("id, title, platform, scheduled_at, media_url")
          .eq("user_id", user.id)
          .eq("status", "scheduled")
          .gt("scheduled_at", now)
          .order("scheduled_at", { ascending: true })
          .limit(4);

        if (error) throw error;

        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching upcoming posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  // Handle editing a post
  const handleEdit = (id: string) => {
    toast({
      title: "تحرير المنشور",
      description: `جاري فتح المنشور للتحرير`
    });
    
    logActivity("content_edit", `تم فتح منشور للتحرير`);
    
    navigate(`/scheduler/edit/${id}`);
  };

  // Handle deleting a post
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("posts")
        .update({ status: "deleted" })
        .eq("id", id);

      if (error) throw error;

      setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
      
      logActivity("content_delete", `تم حذف منشور مجدول`);

      toast({
        title: "تم الحذف",
        description: `تم حذف المنشور بنجاح`
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المنشور",
        variant: "destructive"
      });
    }
  };

  return {
    posts,
    loading,
    handleEdit,
    handleDelete
  };
};

// Utility functions
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === now.toDateString()) {
    return `اليوم، ${date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  if (date.toDateString() === tomorrow.toDateString()) {
    return `غداً، ${date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  return date.toLocaleDateString('ar-SA', {
    day: 'numeric',
    month: 'numeric'
  }) + `، ${date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
};

export const getAudienceSize = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram': return "15.2K";
    case 'facebook': return "8.7K";
    case 'tiktok': return "12.4K";
    default: return "5K";
  }
};
