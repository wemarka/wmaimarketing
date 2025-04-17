
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X, FileText, Instagram, Facebook } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  platform: "instagram" | "facebook" | "tiktok" | string;
  createdAt: string;
  scheduledFor?: string;
}

interface PostItemProps {
  post: Post;
  index: number;
  viewMode: "list" | "compact";
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const PostItem = ({ post, index, viewMode, onApprove, onReject }: PostItemProps) => {
  const getPlatformIcon = () => {
    switch(post.platform) {
      case "instagram": return <Instagram className="h-4 w-4 text-pink-600" />;
      case "facebook": return <Facebook className="h-4 w-4 text-blue-600" />;
      case "tiktok": return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.321 5.562a5.124 5.124 0 0 1-.2-.042 7.173 7.173 0 0 1-4.139-1.879 7.31 7.31 0 0 1-2.156-4.276c-.008-.056-.014-.111-.02-.167H9.019v12.794a3.247 3.247 0 0 1-.869 2.371 3.276 3.276 0 0 1-4.791-4.462 3.276 3.276 0 0 1 4.27-.691V5.32a7.01 7.01 0 0 0-4.773 1.853A7.044 7.044 0 0 0 1.523 15a7.043 7.043 0 0 0 7.822 7.034 7 7 0 0 0 5.875-4.17 6.951 6.951 0 0 0 .591-2.829V9.45a10.985 10.985 0 0 0 6.189 1.913V7.591a7.013 7.013 0 0 1-2.68-2.029Z"/>
        </svg>
      );
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPp", { locale: ar });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={cn(
        "border rounded-md overflow-hidden",
        viewMode === "compact" ? "p-3" : "p-4"
      )}
    >
      <div className={viewMode === "compact" ? "flex items-center justify-between" : ""}>
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <div className="flex h-full w-full items-center justify-center bg-muted">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} />
              ) : (
                post.author.name.charAt(0).toUpperCase()
              )}
            </div>
          </Avatar>
          
          <div className={cn("flex-grow", viewMode === "compact" ? "max-w-[200px]" : "")}>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{post.title}</h4>
              <Badge variant="outline" className="h-6 flex items-center gap-1">
                {getPlatformIcon()}
                <span className="text-xs">{post.platform}</span>
              </Badge>
            </div>
            
            {viewMode !== "compact" && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {post.content}
              </p>
            )}
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span>{post.author.name}</span>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <div className={cn("flex gap-2", viewMode === "compact" ? "" : "mt-3")}>
          <Button 
            size="sm" 
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
            onClick={() => onApprove(post.id)}
          >
            <Check className="h-4 w-4 mr-1" />
            قبول
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => onReject(post.id)}
          >
            <X className="h-4 w-4 mr-1" />
            رفض
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostItem;
