
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PostData } from "./types";
import { getStatusIcon, getStatusStyle, getPriorityVariant, getPriorityText, getFormattedDate } from "./utils";
import { useTranslation } from "react-i18next";

interface PostItemProps {
  post: PostData;
  index: number;
}

const PostItem: React.FC<PostItemProps> = ({ post, index }) => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08, type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "flex justify-between items-center p-3 rounded-md border transition-colors",
        getStatusStyle(post.status).bg,
        getStatusStyle(post.status).border
      )}
      dir={isRTL ? "rtl" : "ltr"}
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
      <Button variant="ghost" size="sm">{t('common.details', 'التفاصيل')}</Button>
    </motion.div>
  );
};

export default PostItem;
