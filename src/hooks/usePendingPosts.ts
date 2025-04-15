
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface PendingPost {
  id: string;
  title: string;
  content: string;
  platform: "instagram" | "facebook" | "tiktok";  // Updated to be a union type instead of string
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
        
        // Mocked data - in a real application, this would be fetched from an API
        const mockPosts: PendingPost[] = [
          {
            id: "1",
            title: "أفضل 5 منتجات للعناية بالبشرة",
            content: "تعرفي على أفضل منتجات العناية بالبشرة لفصل الصيف...",
            platform: "instagram",
            createdAt: "2025-04-14T14:30:00",
            author: {
              name: "سارة أحمد",
              avatar: "/avatars/sarah.png"
            }
          },
          {
            id: "2",
            title: "نصائح لاختيار كريم الأساس المناسب",
            content: "إليك بعض النصائح الهامة لاختيار كريم الأساس المناسب لنوع بشرتك...",
            platform: "facebook",
            createdAt: "2025-04-14T10:15:00",
            author: {
              name: "ليلى محمد",
              avatar: "/avatars/layla.png"
            }
          },
          {
            id: "3",
            title: "كيفية استخدام قناع الوجه بشكل صحيح",
            content: "خطوات بسيطة لاستخدام قناع الوجه بالطريقة الصحيحة للحصول على أفضل النتائج...",
            platform: "tiktok",
            createdAt: "2025-04-13T16:45:00",
            author: {
              name: "هدى علي",
              avatar: "/avatars/huda.png"
            }
          }
        ];
        
        setPosts(mockPosts);
      } catch (error) {
        console.error("Error fetching pending posts:", error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "تعذر تحميل المنشورات المعلقة",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  const handleApprove = (id: string) => {
    toast({
      title: "تمت الموافقة",
      description: `تمت الموافقة على المنشور بنجاح.`,
    });
    
    // In a real app, this would call an API
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const handleReject = (id: string) => {
    toast({
      title: "تم الرفض",
      description: `تم رفض المنشور.`,
    });
    
    // In a real app, this would call an API
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return { posts, loading, handleApprove, handleReject };
};
