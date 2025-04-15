
import React from 'react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Clock, Eye } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Post, formatDate, getAudienceSize } from "@/hooks/useUpcomingPosts";

// Platform configurations
export const platforms = {
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

interface PostItemProps {
  post: Post;
  index: number;
  viewMode: "list" | "compact";
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

import { Instagram, Facebook } from "lucide-react";

const PostItem = ({ post, index, viewMode, onEdit, onDelete }: PostItemProps) => {
  return (
    <motion.div
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
            <DropdownMenuItem onClick={() => onEdit(post.id)}>
              <Edit className="w-4 h-4 mr-2" />
              تحرير
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(post.id)} className="text-destructive focus:text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};

export default PostItem;
