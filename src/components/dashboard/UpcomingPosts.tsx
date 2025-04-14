import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Instagram, Facebook, CalendarCheck, Clock, Users, Eye, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateActivity } from "@/hooks/useCreateActivity";

const platforms = {
  instagram: {
    icon: <Instagram className="h-4 w-4" />,
    color: "bg-pink-100 text-pink-600",
    label: "انستجرام"
  },
  facebook: {
    icon: <Facebook className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-600",
    label: "فيسبوك"
  },
  tiktok: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4" style={{ fill: 'currentColor' }}>
      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
    </svg>,
    color: "bg-slate-100 text-slate-600",
    label: "تيك توك"
  }
};

interface Post {
  id: string;
  title: string;
  platform: string;
  scheduled_at: string;
  media_url: string[] | null;
}

const UpcomingPosts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { logActivity } = useCreateActivity();
  const [viewMode, setViewMode] = useState<"list" | "compact">("list");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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
        // Use fallback data if we have an error
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const handleEdit = (id: string) => {
    toast({
      title: "تحرير المنشور",
      description: `جاري فتح المنشور للتحرير`
    });
    
    // Log activity
    logActivity("content_edit", `تم فتح منشور للتحرير`);
    
    navigate(`/scheduler/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("posts")
        .update({ status: "deleted" })
        .eq("id", id);

      if (error) throw error;

      // Remove the post from the state
      setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
      
      // Log activity
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if the date is today
    if (date.toDateString() === now.toDateString()) {
      return `اليوم، ${date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if the date is tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return `غداً، ${date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise, show the date and time
    return date.toLocaleDateString('ar-SA', {
      day: 'numeric',
      month: 'numeric'
    }) + `، ${date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
  };

  // Estimated audience size (would be better from analytics data)
  const getAudienceSize = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return "15.2K";
      case 'facebook': return "8.7K";
      case 'tiktok': return "12.4K";
      default: return "5K";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">المنشورات القادمة</CardTitle>
          <CardDescription>
            {loading ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              `${posts.length} منشور مجدول للأيام القادمة`
            )}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode(viewMode === "list" ? "compact" : "list")}
            className="text-xs"
          >
            {viewMode === "list" ? "عرض مختصر" : "عرض مفصل"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/scheduler')}
            className="text-xs"
          >
            عرض الجدول
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        {loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 text-sm p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors",
                    viewMode === "compact" ? "p-2" : "p-3"
                  )}
                >
                  <div className={cn(
                    "rounded-md bg-muted overflow-hidden shrink-0",
                    viewMode === "compact" ? "h-10 w-10" : "h-12 w-12"
                  )}>
                    {post.media_url && post.media_url.length > 0 ? (
                      <img src={post.media_url[0]} alt={post.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-muted">
                        {platforms[post.platform.toLowerCase() as keyof typeof platforms]?.icon || 
                          platforms.instagram.icon}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={cn(
                        "text-xs py-0 h-5",
                        platforms[post.platform.toLowerCase() as keyof typeof platforms]?.color || 
                          "bg-gray-100 text-gray-600"
                      )}>
                        {platforms[post.platform.toLowerCase() as keyof typeof platforms]?.label || post.platform}
                      </Badge>
                      {viewMode !== "compact" && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(post.scheduled_at)}</span>
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "font-medium",
                      viewMode === "compact" ? "text-sm truncate max-w-[200px]" : ""
                    )}>{post.title}</p>
                    {viewMode !== "compact" && (
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{getAudienceSize(post.platform)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(post.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        تحرير
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-destructive focus:text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg border-dashed">
            <div className="flex flex-col items-center">
              <CalendarCheck className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="mb-2 font-medium">لا توجد منشورات مجدولة</p>
              <p className="text-sm text-muted-foreground mb-4">لم يتم جدولة أي منشورات للأيام القادمة</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/scheduler/new')}
              >
                إنشاء منشور جديد
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;
