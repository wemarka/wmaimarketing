
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PostData } from "./types";
import { getStatusIcon, getStatusStyle, getPriorityVariant, getPriorityText, getFormattedDate } from "./utils";

interface PostItemProps {
  post: PostData;
  index: number;
}

const PostItem: React.FC<PostItemProps> = ({ post, index }) => {
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "flex justify-between items-center p-3 rounded-md border transition-colors",
        getStatusStyle(post.status).bg,
        getStatusStyle(post.status).border
      )}
    >
      <div className="flex items-center gap-3">
        {getStatusIcon(post.status)}
        <div>
          <div className="flex gap-2 items-center">
            <p className="font-medium">{post.title}</p>
            {post.priority && (
              <Badge variant={getPriorityVariant(post.priority)} className="text-xs">
                {getPriorityText(post.priority)}
              </Badge>
            )}
          </div>
          <div className="flex gap-2 items-center text-sm text-muted-foreground">
            <span>{getFormattedDate(post.date)}</span>
            {post.platform && (
              <Badge variant="outline" className="text-xs">
                {post.platform}
              </Badge>
            )}
          </div>
        </div>
      </div>
      <Button variant="ghost" size="sm">التفاصيل</Button>
    </motion.div>
  );
};

export default PostItem;
